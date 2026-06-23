import { Separator } from "components/ui/separator";
import { DeployedPagesSection } from "components/portfolio/deployed-pages-section";
import { ExperimentsSection } from "components/portfolio/experiments-section";
import { FeaturedOpenSourceSection } from "components/portfolio/featured-open-source-section";
import { HeroSection } from "components/portfolio/hero-section";
import { LiveGithubSection } from "components/portfolio/live-github-section";
import { SiteFooter } from "components/portfolio/site-footer";
import { StatsSection } from "components/portfolio/stats-section";
import { useGitHubData } from "src/hooks/use-github-data";
import { PortfolioPage } from "src/layouts/portfolio-page";

export default function App() {
  const { repos, deployedPages, loading, pagesLoading } = useGitHubData();

  return (
    <PortfolioPage>
      <HeroSection />
      <StatsSection />
      <FeaturedOpenSourceSection />
      <LiveGithubSection repos={repos} loading={loading} />
      <ExperimentsSection />
      <DeployedPagesSection deployedPages={deployedPages} loading={pagesLoading} />
      <Separator />
      <SiteFooter />
    </PortfolioPage>
  );
}
