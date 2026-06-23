import { GitFork, Star } from "lucide-react";
import { CardGrid, PortfolioSection } from "components/portfolio/section";
import { ProjectCard } from "components/portfolio/project-card";
import { SkeletonCard } from "components/portfolio/skeleton-card";
import type { GhRepo } from "src/github";

type LiveGithubSectionProps = {
  repos: GhRepo[];
  loading: boolean;
};

export function LiveGithubSection({ repos, loading }: LiveGithubSectionProps) {
  return (
    <PortfolioSection
      id="live-github"
      title="Live GitHub projects"
      count={
        loading ? "Loading…" : `${repos.length.toString().padStart(2, "0")} active`
      }
    >
      <CardGrid>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={`loading-${i}`} />
            ))
          : repos.map((repo) => (
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
            ))}
      </CardGrid>
    </PortfolioSection>
  );
}
