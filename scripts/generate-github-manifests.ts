/**
 * Build-time GitHub indexes for the portfolio.
 * Uses GITHUB_TOKEN when available (CI) for reliable, authenticated API access.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const OWNER = "alanrsoares";
const USER_SITE_REPO = "alanrsoares.github.io";
const ORIGIN = "https://alanrsoares.github.io";
const PUBLIC_DIR = join(import.meta.dir, "../public");
const DEPLOYED_PAGES_OUT = join(PUBLIC_DIR, "deployed-pages.json");
const ACTIVE_REPOS_OUT = join(PUBLIC_DIR, "active-repos.json");

const RECENT_COMMIT_WINDOW_DAYS = 180;
const COMMIT_CANDIDATE_POOL = 15;
const ACTIVE_REPO_LIMIT = 6;

type ApiRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  updated_at: string;
  has_pages: boolean;
  homepage: string | null;
};

type GhRepo = {
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
};

type DeployedPage = GhRepo & { pagesUrl: string };

type RankedRepo = GhRepo & { recentCommitCount: number };

function toGhRepo(repo: ApiRepo): GhRepo {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description ?? "",
    html_url: repo.html_url,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    language: repo.language ?? "",
    fork: repo.fork,
    pushed_at: repo.pushed_at,
    updated_at: repo.updated_at,
  };
}

function projectPagesUrl(repoName: string): string {
  return `${ORIGIN}/${repoName}/`;
}

function resolvePagesUrl(repo: ApiRepo): string {
  const homepage = repo.homepage?.trim();
  if (
    homepage &&
    homepage.includes("alanrsoares.github.io/") &&
    homepage !== ORIGIN &&
    homepage !== `${ORIGIN}/`
  ) {
    return homepage.endsWith("/") ? homepage : `${homepage}/`;
  }

  return projectPagesUrl(repo.name);
}

function recentCommitSince(): string {
  const since = new Date();
  since.setDate(since.getDate() - RECENT_COMMIT_WINDOW_DAYS);
  return since.toISOString();
}

function compareByRecency(a: GhRepo, b: GhRepo): number {
  return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
}

function activityScore(repo: RankedRepo): number {
  const ageDays =
    (Date.now() - new Date(repo.pushed_at).getTime()) / 86_400_000;
  const recency = 1 / (1 + ageDays / 30);
  const commits = Math.log1p(repo.recentCommitCount);

  return recency * 0.55 + commits * 0.45;
}

async function fetchAllRepos(token?: string): Promise<ApiRepo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const repos: ApiRepo[] = [];

  for (let page = 1; page <= 10; page += 1) {
    const response = await fetch(
      `https://api.github.com/users/${OWNER}/repos?per_page=100&page=${page}&sort=pushed&direction=desc&type=owner`,
      { headers },
    );

    if (!response.ok) {
      throw new Error(`GitHub API ${response.status}: ${await response.text()}`);
    }

    const batch: ApiRepo[] = await response.json();
    if (batch.length === 0) {
      break;
    }

    repos.push(...batch);

    if (batch.length < 100) {
      break;
    }
  }

  return repos;
}

async function fetchRecentCommitCount(
  repo: string,
  since: string,
  token?: string,
): Promise<number> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let count = 0;

  for (let page = 1; page <= 2; page += 1) {
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${repo}/commits?since=${since}&per_page=100&page=${page}`,
      { headers },
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

async function rankActiveRepos(
  repos: GhRepo[],
  token?: string,
): Promise<GhRepo[]> {
  const since = recentCommitSince();
  const candidates = [...repos].sort(compareByRecency).slice(0, COMMIT_CANDIDATE_POOL);

  const ranked = await Promise.all(
    candidates.map(async (repo) => {
      const recentCommitCount = await fetchRecentCommitCount(
        repo.name,
        since,
        token,
      );

      return { ...repo, recentCommitCount };
    }),
  );

  return ranked
    .sort((a, b) => activityScore(b) - activityScore(a))
    .slice(0, ACTIVE_REPO_LIMIT)
    .map(({ recentCommitCount: _, ...repo }) => repo);
}

async function repoPageIsLive(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD", redirect: "follow" });
    return response.ok;
  } catch {
    return false;
  }
}

async function main() {
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  const repos = await fetchAllRepos(token);
  const active = repos
    .filter((repo) => !repo.fork && !repo.archived && repo.name !== USER_SITE_REPO)
    .map(toGhRepo);

  const ranked = await rankActiveRepos(active, token);
  writeFileSync(ACTIVE_REPOS_OUT, `${JSON.stringify(ranked, null, 2)}\n`);
  console.log(`Wrote ${ranked.length} active repos to ${ACTIVE_REPOS_OUT}`);

  const pageCandidates = repos.filter(
    (repo) =>
      !repo.fork && !repo.archived && repo.name !== USER_SITE_REPO && repo.has_pages,
  );

  const verified: DeployedPage[] = [];

  for (const repo of pageCandidates) {
    const pagesUrl = resolvePagesUrl(repo);
    const live = await repoPageIsLive(pagesUrl);
    if (!live) {
      continue;
    }

    verified.push({ ...toGhRepo(repo), pagesUrl });
  }

  verified.sort(compareByRecency);

  writeFileSync(DEPLOYED_PAGES_OUT, `${JSON.stringify(verified, null, 2)}\n`);
  console.log(`Wrote ${verified.length} deployed pages to ${DEPLOYED_PAGES_OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
