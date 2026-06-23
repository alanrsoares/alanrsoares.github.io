export interface GhRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  fork: boolean;
  pushed_at: string;
  updated_at: string;
}

export type RankedGhRepo = GhRepo & { recentCommitCount: number };

export type DeployedPageRepo = GhRepo & { pagesUrl: string };

export const GITHUB_PAGES_ORIGIN = "https://alanrsoares.github.io";
export const GITHUB_PAGES_USER_SITE_REPO = "alanrsoares.github.io";

const RECENT_COMMIT_WINDOW_DAYS = 180;
const COMMIT_CANDIDATE_POOL = 15;
const PAGE_SWEEP_CONCURRENCY = 6;

function recentCommitSince(): string {
  const since = new Date();
  since.setDate(since.getDate() - RECENT_COMMIT_WINDOW_DAYS);
  return since.toISOString();
}

export async function fetchOwnerRepos(
  owner: string,
  signal: AbortSignal
): Promise<GhRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${owner}/repos?per_page=100&sort=pushed&direction=desc&type=owner`,
    { signal }
  );

  if (!response.ok) {
    return [];
  }

  const data: GhRepo[] = await response.json();
  return data.filter((repo) => !repo.fork);
}

async function fetchRecentCommitCount(
  owner: string,
  repo: string,
  since: string,
  signal: AbortSignal
): Promise<number> {
  let count = 0;

  for (let page = 1; page <= 2; page += 1) {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?since=${since}&per_page=100&page=${page}`,
      { signal }
    );

    if (!response.ok) {
      return count;
    }

    const commits: unknown = await response.json();
    if (!Array.isArray(commits) || commits.length === 0) {
      break;
    }

    count += commits.length;

    if (commits.length < 100) {
      break;
    }
  }

  return count;
}

function compareByRecency(a: GhRepo, b: GhRepo): number {
  return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
}

function activityScore(repo: RankedGhRepo): number {
  const ageDays =
    (Date.now() - new Date(repo.pushed_at).getTime()) / 86_400_000;
  const recency = 1 / (1 + ageDays / 30);
  const commits = Math.log1p(repo.recentCommitCount);

  return recency * 0.55 + commits * 0.45;
}

export async function rankReposByActivity(
  repos: GhRepo[],
  owner: string,
  signal: AbortSignal
): Promise<GhRepo[]> {
  const since = recentCommitSince();
  const candidates = [...repos].sort(compareByRecency).slice(0, COMMIT_CANDIDATE_POOL);

  const ranked = await Promise.all(
    candidates.map(async (repo) => {
      const recentCommitCount = await fetchRecentCommitCount(
        owner,
        repo.name,
        since,
        signal
      );

      return { ...repo, recentCommitCount };
    })
  );

  return ranked
    .sort((a, b) => activityScore(b) - activityScore(a))
    .slice(0, 6);
}

export function projectPagesUrl(repoName: string): string {
  return `${GITHUB_PAGES_ORIGIN}/${repoName}/`;
}

export async function repoHasProjectPage(
  repoName: string,
  signal: AbortSignal
): Promise<boolean> {
  if (repoName === GITHUB_PAGES_USER_SITE_REPO) {
    return false;
  }

  const url = projectPagesUrl(repoName);

  try {
    const response = await fetch(url, {
      method: "HEAD",
      signal,
      redirect: "follow",
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function sweepProjectPages(
  repos: GhRepo[],
  signal: AbortSignal
): Promise<DeployedPageRepo[]> {
  const candidates = repos.filter(
    (repo) => repo.name !== GITHUB_PAGES_USER_SITE_REPO
  );
  const deployed: DeployedPageRepo[] = [];

  for (let i = 0; i < candidates.length; i += PAGE_SWEEP_CONCURRENCY) {
    if (signal.aborted) {
      break;
    }

    const batch = candidates.slice(i, i + PAGE_SWEEP_CONCURRENCY);
    const results = await Promise.all(
      batch.map(async (repo) => {
        const live = await repoHasProjectPage(repo.name, signal);
        if (!live) {
          return null;
        }

        return {
          ...repo,
          pagesUrl: projectPagesUrl(repo.name),
        };
      })
    );

    deployed.push(
      ...results.filter((repo): repo is DeployedPageRepo => repo !== null)
    );
  }

  return deployed.sort(compareByRecency);
}
