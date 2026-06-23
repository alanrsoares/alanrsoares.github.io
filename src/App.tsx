import { Separator } from "components/ui/separator";
import { DeployedPagesSection } from "components/portfolio/deployed-pages-section";
import { HeroSection } from "components/portfolio/hero-section";
import { LiveGithubSection } from "components/portfolio/live-github-section";
import { SiteFooter } from "components/portfolio/site-footer";
import { StatsSection } from "components/portfolio/stats-section";
import { useGitHubData } from "src/hooks/use-github-data";
import { PortfolioPage } from "src/layouts/portfolio-page";

export default function App() {
  const {
    repos,
    deployedPages,
    loading,
    pagesLoading,
    reposFromManifest,
    pagesFromManifest,
  } = useGitHubData();

  return (
    <PortfolioPage>
      <HeroSection />
      <StatsSection />
      <LiveGithubSection
        repos={repos}
        loading={loading}
        fromManifest={reposFromManifest}
      />
      <DeployedPagesSection
        deployedPages={deployedPages}
        loading={pagesLoading}
        fromManifest={pagesFromManifest}
      />
      <Separator />
      <SiteFooter />
    </PortfolioPage>
  );
}
