import { ProjectCard } from "components/portfolio/project-card";
import { CardGrid, PortfolioSection } from "components/portfolio/section";
import { SkeletonCard } from "components/portfolio/skeleton-card";
import { Card, CardContent } from "components/ui/card";
import { GitFork, Star } from "lucide-react";
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
      count={
        loading
          ? "Loading…"
          : `${repos.length.toString().padStart(2, "0")} active`
      }
      id="live-github"
      title="Active repositories"
    >
      <CardGrid>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={`loading-${i}`} />
          ))
        ) : repos.length > 0 ? (
          repos.map((repo) => (
            <ProjectCard
              ariaLabel={`Open ${repo.name} on GitHub`}
              description={repo.description || "No description provided."}
              href={repo.html_url}
              key={repo.id}
              language={repo.language}
              meta={
                <div className="flex w-full items-center gap-4 border-t border-border/40 pt-3 font-mono text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="fill-current" data-icon="inline-start" />
                    {repo.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <GitFork data-icon="inline-start" />
                    {repo.forks_count}
                  </span>
                </div>
              }
              tags={[]}
              title={repo.name}
            />
          ))
        ) : (
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
