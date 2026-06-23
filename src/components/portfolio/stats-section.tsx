import tw from "@styled-cva/react";
import { StatCard } from "components/portfolio/stat-card";
import { STATIC_STATS } from "site";

const StatsGrid = tw.div`
  grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6
  animate-fade-up [animation-delay:80ms]
`;

export function StatsSection() {
  return (
    <section aria-label="GitHub footprint statistics">
      <StatsGrid>
        <StatCard label="PRs merged" value={STATIC_STATS.prsMerged} />
        <StatCard label="Reviews given" value={STATIC_STATS.reviewsSubmitted} />
        <StatCard
          label="Partner repos"
          value={STATIC_STATS.reposContributedTo}
        />
        <StatCard label="Years on GitHub" value={STATIC_STATS.yearsOnGitHub} />
        <StatCard label="OSS stars" value={STATIC_STATS.ownOssStars} />
        <StatCard
          compact
          label={`Top org · ${STATIC_STATS.topOrg.prContributions} PRs`}
          value={STATIC_STATS.topOrg.login}
        />
      </StatsGrid>
    </section>
  );
}
