import { Card, CardContent } from "components/ui/card";
import { CardGrid, PortfolioSection } from "components/portfolio/section";
import { ProjectCard } from "components/portfolio/project-card";
import { SkeletonCard } from "components/portfolio/skeleton-card";
import type { DeployedPageRepo } from "src/github";

type DeployedPagesSectionProps = {
  deployedPages: DeployedPageRepo[];
  loading: boolean;
  fromManifest?: boolean;
};

export function DeployedPagesSection({
  deployedPages,
  loading,
  fromManifest = true,
}: DeployedPagesSectionProps) {
  return (
    <PortfolioSection
      id="deployed-pages"
      title="Live demos"
      count={
        loading
          ? "Scanning…"
          : `${deployedPages.length.toString().padStart(2, "0")} live`
      }
    >
      <CardGrid>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={`pages-loading-${i}`} />
            ))
          : deployedPages.length > 0
            ? deployedPages.map((repo) => (
                <ProjectCard
                  key={repo.id}
                  title={repo.name}
                  description={
                    repo.description || "Deployed project site on GitHub Pages."
                  }
                  href={repo.pagesUrl}
                  ariaLabel={`Open ${repo.name} on GitHub Pages`}
                  language={repo.language}
                  tags={["GitHub Pages"]}
                  meta={
                    <div className="flex w-full items-center gap-4 border-t border-border/40 pt-3 font-mono text-xs text-muted-foreground">
                      <span className="truncate">
                        {repo.pagesUrl.replace(/^https?:\/\//, "")}
                      </span>
                    </div>
                  }
                />
              ))
            : (
                <Card className="md:col-span-2">
                  <CardContent className="py-6 text-sm text-muted-foreground">
                    {fromManifest
                      ? "No live project sites in the index yet."
                      : "Couldn't load GitHub data to scan for project sites — run build to refresh the index."}
                  </CardContent>
                </Card>
              )}
      </CardGrid>
    </PortfolioSection>
  );
}
