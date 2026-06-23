import tw from "@styled-cva/react";
import { StatCard } from "components/portfolio/stat-card";
import { STATIC_STATS } from "resume";

const StatsGrid = tw.div`
  grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6
  animate-fade-up [animation-delay:80ms]
`;

export function StatsSection() {
  return (
    <section aria-label="GitHub footprint statistics">
      <StatsGrid>
        <StatCard value={STATIC_STATS.prsMerged} label="PRs merged" />
        <StatCard value={STATIC_STATS.reviewsSubmitted} label="Reviews given" />
        <StatCard
          value={STATIC_STATS.reposContributedTo}
          label="Partner repos"
        />
        <StatCard value={STATIC_STATS.yearsOnGitHub} label="Years on GitHub" />
        <StatCard value={STATIC_STATS.ownOssStars} label="OSS stars" />
        <StatCard
          value={STATIC_STATS.topOrg.login}
          label={`Top org · ${STATIC_STATS.topOrg.prContributions} PRs`}
          compact
        />
      </StatsGrid>
    </section>
  );
}
