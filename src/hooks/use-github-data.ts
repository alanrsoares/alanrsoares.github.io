import { useEffect, useState } from "react";
import { BASICS } from "resume";
import {
  type DeployedPageRepo,
  type GhRepo,
  fetchOwnerRepos,
  rankReposByActivity,
  sweepProjectPages,
} from "src/github";

export function useGitHubData() {
  const [repos, setRepos] = useState<GhRepo[]>([]);
  const [deployedPages, setDeployedPages] = useState<DeployedPageRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagesLoading, setPagesLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGitHubData() {
      const owner = BASICS.profiles[0].username;

      try {
        const active = await fetchOwnerRepos(owner, controller.signal);
        const [ranked, deployed] = await Promise.all([
          rankReposByActivity(active, owner, controller.signal),
          sweepProjectPages(active, controller.signal),
        ]);
        setRepos(ranked);
        setDeployedPages(deployed);
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

  return { repos, deployedPages, loading, pagesLoading };
}
