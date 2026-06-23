import { useEffect, useState } from "react";

import { SITE } from "site";
import {
  type DeployedPageRepo,
  fetchActiveReposManifest,
  fetchDeployedPagesManifest,
  fetchOwnerRepos,
  filterDeployedPages,
  type GhRepo,
  rankReposByActivity,
} from "src/github";

async function loadGitHubData(signal: AbortSignal) {
  const owner = SITE.handle;
  const [activeManifest, deployedManifest] = await Promise.all([
    fetchActiveReposManifest(signal),
    fetchDeployedPagesManifest(signal),
  ]);

  let repos: GhRepo[] = activeManifest ?? [];
  let deployedPages: DeployedPageRepo[] = deployedManifest ?? [];
  let reposFromManifest = Boolean(activeManifest);
  let pagesFromManifest = Boolean(deployedManifest);

  const needsLiveRepos = !activeManifest || !deployedManifest;
  const active = needsLiveRepos ? await fetchOwnerRepos(owner, signal) : [];

  if (!activeManifest) {
    repos = await rankReposByActivity(active, owner, signal);
    reposFromManifest = false;
  }

  if (!deployedManifest) {
    deployedPages = await filterDeployedPages(active, signal);
    pagesFromManifest = false;
  }

  return { repos, deployedPages, reposFromManifest, pagesFromManifest };
}

export function useGitHubData() {
  const [repos, setRepos] = useState<GhRepo[]>([]);
  const [deployedPages, setDeployedPages] = useState<DeployedPageRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagesLoading, setPagesLoading] = useState(true);
  const [reposFromManifest, setReposFromManifest] = useState(true);
  const [pagesFromManifest, setPagesFromManifest] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    loadGitHubData(controller.signal)
      .then((data) => {
        setRepos(data.repos);
        setDeployedPages(data.deployedPages);
        setReposFromManifest(data.reposFromManifest);
        setPagesFromManifest(data.pagesFromManifest);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        console.error("Failed to fetch live GitHub repos:", err);
      })
      .finally(() => {
        setLoading(false);
        setPagesLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return {
    repos,
    deployedPages,
    loading,
    pagesLoading,
    reposFromManifest,
    pagesFromManifest,
  };
}
