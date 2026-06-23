import type { ReactNode } from "react";

import tw from "@styled-cva/react";
import { Separator } from "components/ui/separator";

export const PageSection = tw.section`
  flex flex-col gap-5 sm:gap-6 animate-fade-up [animation-delay:120ms]
`;

export const SectionHeader = tw.div`
  flex flex-wrap items-end justify-between gap-3
`;

export const SectionTitle = tw.h2`
  text-xl sm:text-2xl font-semibold tracking-tight text-foreground
  flex items-center gap-3
  before:block before:h-px before:w-8 before:bg-accent before:shrink-0
`;

export const SectionCount = tw.span`
  font-mono text-xs sm:text-sm text-muted-foreground
`;

export const CardGrid = tw.div`
  grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5
`;

type PortfolioSectionProps = {
  id: string;
  title: string;
  count: ReactNode;
  children: ReactNode;
};

export function PortfolioSection({
  id,
  title,
  count,
  children,
}: PortfolioSectionProps) {
  return (
    <PageSection aria-labelledby={id}>
      <SectionHeader>
        <SectionTitle id={id}>{title}</SectionTitle>
        <SectionCount>{count}</SectionCount>
      </SectionHeader>
      <Separator />
      {children}
    </PageSection>
  );
}
