import React, { useEffect, useState } from "react";
import tw from "@styled-cva/react";
import { BASICS, OPEN_SOURCE, EXPERIMENTS, STATIC_STATS } from "./resume";
import {
  Github,
  Linkedin,
  ExternalLink,
  Star,
  GitFork,
  Mail,
} from "lucide-react";

interface GhRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  fork: boolean;
  updated_at: string;
}

// ---------------------------------------------------------
// Styled Components using styled-cva (tw)
// ---------------------------------------------------------

const BackgroundWash = tw.div`
  pointer-events-none fixed inset-0 z-0
  bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,77,109,0.06),transparent_60%)]
  dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,77,109,0.03),transparent_60%)]
`;

const AppContainer = tw.div`
  relative z-10 mx-auto w-full max-w-5xl px-6 py-16 md:py-24 
  flex flex-col gap-16 md:gap-24
`;

const HeaderSection = tw.header`
  flex flex-col gap-6 max-w-2xl
`;

const Title = tw.h1`
  text-4xl md:text-5xl font-bold tracking-tight text-foreground
  font-heading
`;

const Subtitle = tw.p`
  text-lg md:text-xl font-medium text-muted-foreground
  font-mono
`;

const Bio = tw.p`
  text-muted-foreground text-base leading-relaxed max-w-[65ch]
`;

const LinkGroup = tw.div`
  flex flex-wrap gap-3 mt-2
`;

const SocialLink = tw.a`
  inline-flex items-center gap-2 rounded-lg bg-card px-4 py-2 
  text-sm font-medium border border-border/70 transition-all duration-300
  hover:border-accent/40 hover:bg-muted/40 hover:-translate-y-0.5
`;

const StatsGrid = tw.div`
  grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-3 md:grid-cols-6 
  border-y border-border/40 py-8
`;

const StatCell = tw.div`
  flex flex-col gap-1
`;

const StatValue = tw.div`
  font-mono text-2xl font-semibold tracking-tight text-foreground
`;

const StatLabel = tw.div`
  font-mono text-[10px] uppercase tracking-wider text-muted-foreground
`;

const PageSection = tw.section`
  flex flex-col gap-6
`;

const SectionHeader = tw.div`
  flex items-baseline justify-between border-b border-border/30 pb-2
`;

const SectionTitle = tw.h2`
  text-xs font-semibold tracking-wider uppercase text-foreground 
  flex items-center gap-2 
  before:content-[''] before:block before:w-4 before:h-px before:bg-accent
`;

const SectionCount = tw.span`
  font-mono text-xs text-muted-foreground
`;

const CardGrid = tw.div`
  grid grid-cols-1 gap-6 sm:grid-cols-2
`;

// Base card design with custom shadows and hover spotlight background
const Card = tw.div`
  group relative flex flex-col justify-between overflow-hidden rounded-xl 
  border border-border/60 bg-card text-sm text-card-foreground shadow-sm
  transition-all duration-300 ease-out 
  hover:border-accent/40 hover:-translate-y-1 hover:shadow-lg
  hover:shadow-accent/5
  before:absolute before:inset-0 before:z-0 before:bg-[linear-gradient(135deg,rgba(255,77,109,0.04),transparent_60%)]
  before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100
`;

const CardHeader = tw.div`
  relative z-10 flex flex-row items-start justify-between p-6 pb-2
`;

const CardTitle = tw.h3`
  font-heading text-lg font-semibold tracking-tight text-foreground
`;

const CardDescription = tw.p`
  text-sm text-muted-foreground leading-relaxed
`;

const CardContent = tw.div`
  relative z-10 px-6 pb-4
`;

const CardFooter = tw.div`
  relative z-10 flex items-center px-6 pb-6 pt-0 mt-auto
`;

const CustomBadge = tw.span("inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium border transition-colors", {
  variants: {
    $variant: {
      default: "border-transparent bg-primary text-primary-foreground",
      secondary: "border-transparent bg-secondary text-secondary-foreground",
      outline: "border-border text-foreground bg-muted/20",
    }
  },
  defaultVariants: {
    $variant: "default"
  }
});

const Skeleton = tw.div`
  animate-pulse rounded bg-muted
`;

const RepoMeta = tw.div`
  flex items-center gap-4 text-xs font-mono text-muted-foreground 
  mt-4 pt-3 border-t border-border/30
`;

const RepoMetaItem = tw.span`
  inline-flex items-center gap-1
`;

// Helper to get custom language badge colors
const getLanguageColorClass = (lang: string) => {
  switch (lang?.toLowerCase()) {
    case "typescript":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "javascript":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    case "svelte":
      return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    case "go":
      return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    case "html":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
};

const SkeletonCard = () => (
  <Card className="p-6 gap-4">
    <div className="flex items-center justify-between z-10">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="size-4" />
    </div>
    <CardContent className="px-0 pb-0">
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </CardContent>
    <div className="flex gap-2 z-10 mt-auto">
      <Skeleton className="h-5 w-12 rounded" />
      <Skeleton className="h-5 w-16 rounded" />
    </div>
  </Card>
);

// ---------------------------------------------------------
// Main App Component
// ---------------------------------------------------------

export default function App() {
  const [repos, setRepos] = useState<GhRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGitHubData() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${BASICS.profiles[0].username}/repos?per_page=100`,
          { signal: controller.signal }
        );

        if (response.ok) {
          const data: GhRepo[] = await response.json();
          const filtered = data
            .filter((repo) => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);
          setRepos(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch live GitHub repos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <BackgroundWash />
      <AppContainer>
        {/* Profile Header */}
        <HeaderSection>
          <Title>{BASICS.name}</Title>
          <Subtitle>{BASICS.label}</Subtitle>
          <Bio>{BASICS.summary}</Bio>
          <LinkGroup>
            <SocialLink
              href={`mailto:${BASICS.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="size-4" />
              <span>Email</span>
            </SocialLink>
            {BASICS.profiles.map((profile) => (
              <SocialLink
                key={profile.network}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.network === "GitHub" && <Github className="size-4" />}
                {profile.network === "LinkedIn" && <Linkedin className="size-4" />}
                <span>{profile.network}</span>
              </SocialLink>
            ))}
          </LinkGroup>
        </HeaderSection>

        {/* GitHub Global Stats */}
        <section aria-label="GitHub footprint statistics">
          <StatsGrid>
            <StatCell>
              <StatValue>{STATIC_STATS.prsMerged}</StatValue>
              <StatLabel>PRs Merged</StatLabel>
            </StatCell>
            <StatCell>
              <StatValue>{STATIC_STATS.reviewsSubmitted}</StatValue>
              <StatLabel>Reviews Given</StatLabel>
            </StatCell>
            <StatCell>
              <StatValue>{STATIC_STATS.reposContributedTo}</StatValue>
              <StatLabel>Partner Repos</StatLabel>
            </StatCell>
            <StatCell>
              <StatValue>{STATIC_STATS.yearsOnGitHub}</StatValue>
              <StatLabel>Years on GitHub</StatLabel>
            </StatCell>
            <StatCell>
              <StatValue>{STATIC_STATS.ownOssStars}</StatValue>
              <StatLabel>OSS Stars</StatLabel>
            </StatCell>
            <StatCell>
              <StatValue className="text-lg md:text-xl">
                {STATIC_STATS.topOrg.login}
              </StatValue>
              <StatLabel>Top Org ({STATIC_STATS.topOrg.prContributions} PRs)</StatLabel>
            </StatCell>
          </StatsGrid>
        </section>

        {/* Curated Open Source Projects */}
        <PageSection>
          <SectionHeader>
            <SectionTitle>Featured Open Source</SectionTitle>
            <SectionCount>
              {OPEN_SOURCE.length.toString().padStart(2, "0")} projects
            </SectionCount>
          </SectionHeader>
          <CardGrid>
            {OPEN_SOURCE.map((project) => (
              <Card key={project.title}>
                <div className="flex-1">
                  <CardHeader>
                    <CardTitle>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors focus:outline-none"
                      >
                        {project.title}
                      </a>
                    </CardTitle>
                    <ExternalLink className="size-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {project.description}
                    </CardDescription>
                  </CardContent>
                </div>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    <CustomBadge
                      className={getLanguageColorClass(project.language)}
                      $variant="outline"
                    >
                      {project.language}
                    </CustomBadge>
                    {project.tags.map((tag) => (
                      <CustomBadge key={tag} $variant="secondary">
                        {tag}
                      </CustomBadge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </CardGrid>
        </PageSection>

        {/* Live GitHub Repositories */}
        <PageSection>
          <SectionHeader>
            <SectionTitle>Live GitHub Projects</SectionTitle>
            <SectionCount>
              {loading ? "Loading..." : `${repos.length.toString().padStart(2, "0")} active`}
            </SectionCount>
          </SectionHeader>
          <CardGrid>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={`loading-${i}`} />
                ))
              : repos.map((repo) => (
                  <Card key={repo.id}>
                    <div className="flex-1">
                      <CardHeader>
                        <CardTitle>
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors focus:outline-none"
                          >
                            {repo.name}
                          </a>
                        </CardTitle>
                        <ExternalLink className="size-4 text-muted-foreground group-hover:text-accent transition-colors" />
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          {repo.description || "No description provided."}
                        </CardDescription>
                      </CardContent>
                    </div>
                    <CardContent className="pt-0 flex flex-col mt-auto pb-6">
                      <div className="flex flex-wrap gap-2">
                        {repo.language && (
                          <CustomBadge
                            className={getLanguageColorClass(repo.language)}
                            $variant="outline"
                          >
                            {repo.language}
                          </CustomBadge>
                        )}
                      </div>
                      <RepoMeta>
                        <RepoMetaItem aria-label={`${repo.stargazers_count} stars`}>
                          <Star className="size-3.5 fill-current text-yellow-500/80" />
                          <span>{repo.stargazers_count}</span>
                        </RepoMetaItem>
                        <RepoMetaItem aria-label={`${repo.forks_count} forks`}>
                          <GitFork className="size-3.5" />
                          <span>{repo.forks_count}</span>
                        </RepoMetaItem>
                      </RepoMeta>
                    </CardContent>
                  </Card>
                ))}
          </CardGrid>
        </PageSection>

        {/* Curated Experiments */}
        <PageSection>
          <SectionHeader>
            <SectionTitle>Experiments</SectionTitle>
            <SectionCount>
              {EXPERIMENTS.length.toString().padStart(2, "0")} entries
            </SectionCount>
          </SectionHeader>
          <CardGrid>
            {EXPERIMENTS.map((exp) => (
              <Card key={exp.title}>
                <div className="flex-1">
                  <CardHeader>
                    <CardTitle>
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors focus:outline-none"
                      >
                        {exp.title}
                      </a>
                    </CardTitle>
                    <ExternalLink className="size-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {exp.description}
                    </CardDescription>
                  </CardContent>
                </div>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <CustomBadge key={tag} $variant="secondary">
                        {tag}
                      </CustomBadge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </CardGrid>
        </PageSection>
      </AppContainer>
    </>
  );
}
