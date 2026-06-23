import React, { useEffect, useState } from "react";
import {
  AppContainer,
  Header,
  Title,
  Subtitle,
  Bio,
  LinkGroup,
  SocialLink,
  StatsSection,
  StatsGrid,
  StatCell,
  StatValue,
  StatLabel,
  Section,
  SectionHeader,
  SectionTitle,
  SectionCount,
  CardGrid,
  Card,
  CardHeaderRow,
  CardTitle,
  CardDescription,
  TagList,
  Tag,
  LangTag,
  RepoMeta,
  RepoMetaItem,
  CardLink,
  ExternalLinkIcon,
  SkeletonText,
} from "components/styled";
import { BASICS, OPEN_SOURCE, EXPERIMENTS, STATIC_STATS } from "./resume";
import {
  Github,
  Linkedin,
  ExternalLink,
  Star,
  GitFork,
  BookOpen,
  Mail,
  Workflow,
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

export default function App() {
  const [repos, setRepos] = useState<GhRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalStats, setGlobalStats] = useState(STATIC_STATS);

  useEffect(() => {
    // Live fetch GitHub repositories
    const controller = new AbortController();
    
    async function fetchGitHubData() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${BASICS.profiles[0].username}/repos?per_page=100`,
          { signal: controller.signal }
        );
        
        if (response.ok) {
          const data: GhRepo[] = await response.json();
          // Filter out forks and sort by stars desc
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
    <AppContainer>
      {/* Profile Header */}
      <Header>
        <Title>{BASICS.name}</Title>
        <Subtitle>{BASICS.label}</Subtitle>
        <Bio>{BASICS.summary}</Bio>
        <LinkGroup>
          <SocialLink
            href={`mailto:${BASICS.email}`}
            title="Email"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail />
            <span>Email</span>
          </SocialLink>
          {BASICS.profiles.map((profile) => (
            <SocialLink
              key={profile.network}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.network === "GitHub" && <Github />}
              {profile.network === "LinkedIn" && <Linkedin />}
              <span>{profile.network}</span>
            </SocialLink>
          ))}
        </LinkGroup>
      </Header>

      {/* GitHub Global Stats */}
      <StatsSection>
        <StatsGrid aria-label="GitHub footprint statistics">
          <StatCell>
            <StatValue>
              {globalStats.prsMerged}
            </StatValue>
            <StatLabel>PRs Merged</StatLabel>
          </StatCell>
          <StatCell>
            <StatValue>
              {globalStats.reviewsSubmitted}
            </StatValue>
            <StatLabel>Reviews Given</StatLabel>
          </StatCell>
          <StatCell>
            <StatValue>
              {globalStats.reposContributedTo}
            </StatValue>
            <StatLabel>Partner Repos</StatLabel>
          </StatCell>
          <StatCell>
            <StatValue>
              {globalStats.yearsOnGitHub}
            </StatValue>
            <StatLabel>Years on GitHub</StatLabel>
          </StatCell>
          <StatCell>
            <StatValue>
              {globalStats.ownOssStars}
            </StatValue>
            <StatLabel>OSS Stars</StatLabel>
          </StatCell>
          <StatCell>
            <StatValue style={{ fontSize: "1.25rem" }}>
              {globalStats.topOrg.login}
            </StatValue>
            <StatLabel>
              Top Org ({globalStats.topOrg.prContributions} PRs)
            </StatLabel>
          </StatCell>
        </StatsGrid>
      </StatsSection>

      {/* Curated Open Source Projects */}
      <Section>
        <SectionHeader>
          <SectionTitle>Featured Open Source</SectionTitle>
          <SectionCount>
            {OPEN_SOURCE.length.toString().padStart(2, "0")} projects
          </SectionCount>
        </SectionHeader>
        <CardGrid>
          {OPEN_SOURCE.map((project) => (
            <Card key={project.title}>
              <CardLink
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              />
              <CardHeaderRow>
                <CardTitle>{project.title}</CardTitle>
                <ExternalLinkIcon>
                  <ExternalLink size={16} />
                </ExternalLinkIcon>
              </CardHeaderRow>
              <CardDescription>{project.description}</CardDescription>
              <TagList>
                <LangTag $lang={project.language}>{project.language}</LangTag>
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagList>
            </Card>
          ))}
        </CardGrid>
      </Section>

      {/* Live GitHub Repositories */}
      <Section>
        <SectionHeader>
          <SectionTitle>Live GitHub Projects</SectionTitle>
          <SectionCount>
            {loading ? "Loading..." : `${repos.length.toString().padStart(2, "0")} active`}
          </SectionCount>
        </SectionHeader>
        <CardGrid>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card key={`loading-${i}`}>
                  <CardHeaderRow>
                    <SkeletonText $width="40%" />
                    <SkeletonText $width="16px" />
                  </CardHeaderRow>
                  <SkeletonText $width="90%" />
                  <SkeletonText $width="75%" />
                  <TagList style={{ marginTop: "auto" }}>
                    <SkeletonText $width="50px" />
                    <SkeletonText $width="60px" />
                  </TagList>
                </Card>
              ))
            : repos.map((repo) => (
                <Card key={repo.id}>
                  <CardLink
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                  <CardHeaderRow>
                    <CardTitle>{repo.name}</CardTitle>
                    <ExternalLinkIcon>
                      <ExternalLink size={16} />
                    </ExternalLinkIcon>
                  </CardHeaderRow>
                  <CardDescription>
                    {repo.description || "No description provided."}
                  </CardDescription>
                  <TagList>
                    {repo.language && (
                      <LangTag $lang={repo.language}>{repo.language}</LangTag>
                    )}
                  </TagList>
                  <RepoMeta>
                    <RepoMetaItem>
                      <Star />
                      <span>{repo.stargazers_count}</span>
                    </RepoMetaItem>
                    <RepoMetaItem>
                      <GitFork />
                      <span>{repo.forks_count}</span>
                    </RepoMetaItem>
                  </RepoMeta>
                </Card>
              ))}
        </CardGrid>
      </Section>

      {/* Curated Experiments */}
      <Section>
        <SectionHeader>
          <SectionTitle>Experiments</SectionTitle>
          <SectionCount>
            {EXPERIMENTS.length.toString().padStart(2, "0")} entries
          </SectionCount>
        </SectionHeader>
        <CardGrid>
          {EXPERIMENTS.map((exp) => (
            <Card key={exp.title}>
              <CardLink
                href={exp.url}
                target="_blank"
                rel="noopener noreferrer"
              />
              <CardHeaderRow>
                <CardTitle>{exp.title}</CardTitle>
                <ExternalLinkIcon>
                  <ExternalLink size={16} />
                </ExternalLinkIcon>
              </CardHeaderRow>
              <CardDescription>{exp.description}</CardDescription>
              <TagList>
                {exp.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagList>
            </Card>
          ))}
        </CardGrid>
      </Section>
    </AppContainer>
  );
}
