import { useEffect, useState } from "react";
import { SITE } from "site";
import {
  type DeployedPageRepo,
  type GhRepo,
  fetchActiveReposManifest,
  fetchDeployedPagesManifest,
  fetchOwnerRepos,
  filterDeployedPages,
  rankReposByActivity,
} from "src/github";

export function useGitHubData() {
  const [repos, setRepos] = useState<GhRepo[]>([]);
  const [deployedPages, setDeployedPages] = useState<DeployedPageRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagesLoading, setPagesLoading] = useState(true);
  const [reposFromManifest, setReposFromManifest] = useState(true);
  const [pagesFromManifest, setPagesFromManifest] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGitHubData() {
      const owner = SITE.handle;

      try {
        const [activeManifest, deployedManifest] = await Promise.all([
          fetchActiveReposManifest(controller.signal),
          fetchDeployedPagesManifest(controller.signal),
        ]);

        if (activeManifest) {
          setRepos(activeManifest);
          setReposFromManifest(true);
        }

        if (deployedManifest) {
          setDeployedPages(deployedManifest);
          setPagesFromManifest(true);
        }

        const needsLiveRepos = !activeManifest || !deployedManifest;
        const active = needsLiveRepos
          ? await fetchOwnerRepos(owner, controller.signal)
          : [];

        if (!activeManifest) {
          const ranked = await rankReposByActivity(active, owner, controller.signal);
          setRepos(ranked);
          setReposFromManifest(false);
        }

        if (!deployedManifest) {
          const deployed = await filterDeployedPages(active, controller.signal);
          setDeployedPages(deployed);
          setPagesFromManifest(false);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        console.error("Failed to fetch live GitHub repos:", err);
      } finally {
        setLoading(false);
        setPagesLoading(false);
      }
    }

    fetchGitHubData();

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
