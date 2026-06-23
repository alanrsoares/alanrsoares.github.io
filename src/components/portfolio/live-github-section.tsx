import { GitFork, Star } from "lucide-react";
import { Card, CardContent } from "components/ui/card";
import { CardGrid, PortfolioSection } from "components/portfolio/section";
import { ProjectCard } from "components/portfolio/project-card";
import { SkeletonCard } from "components/portfolio/skeleton-card";
import type { GhRepo } from "src/github";

type LiveGithubSectionProps = {
  repos: GhRepo[];
  loading: boolean;
  fromManifest?: boolean;
};

export function LiveGithubSection({
  repos,
  loading,
  fromManifest = true,
}: LiveGithubSectionProps) {
  return (
    <PortfolioSection
      id="live-github"
      title="Active repositories"
      count={
        loading ? "Loading…" : `${repos.length.toString().padStart(2, "0")} active`
      }
    >
      <CardGrid>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={`loading-${i}`} />
            ))
          : repos.length > 0
            ? repos.map((repo) => (
              <ProjectCard
                key={repo.id}
                title={repo.name}
                description={repo.description || "No description provided."}
                href={repo.html_url}
                ariaLabel={`Open ${repo.name} on GitHub`}
                language={repo.language}
                tags={[]}
                meta={
                  <div className="flex w-full items-center gap-4 border-t border-border/40 pt-3 font-mono text-xs text-muted-foreground">
                    <span
                      className="inline-flex items-center gap-1.5"
                      aria-label={`${repo.stargazers_count} stars`}
                    >
                      <Star data-icon="inline-start" className="fill-current" />
                      {repo.stargazers_count}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5"
                      aria-label={`${repo.forks_count} forks`}
                    >
                      <GitFork data-icon="inline-start" />
                      {repo.forks_count}
                    </span>
                  </div>
                }
              />
            ))
            : (
              <Card className="md:col-span-2">
                <CardContent className="py-6 text-sm text-muted-foreground">
                  {fromManifest
                    ? "No active repos in the index yet."
                    : "Couldn't load GitHub data — run build to refresh the index."}
                </CardContent>
              </Card>
            )}
      </CardGrid>
    </PortfolioSection>
  );
}
