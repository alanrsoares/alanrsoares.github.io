import type { ReactNode } from "react";

import tw from "@styled-cva/react";

export const Page = tw.div`relative min-h-screen overflow-x-hidden`;

export const Background = tw.div`
  theme-ambient-wash pointer-events-none fixed inset-0 z-0
  after:absolute after:inset-0
  after:bg-[url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")]
  after:opacity-60
`;

export const Shell = tw.div`
  relative z-10 mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20
  flex flex-col gap-14 sm:gap-20
`;

type PortfolioPageProps = {
  children: ReactNode;
};

export function PortfolioPage({ children }: PortfolioPageProps) {
  return (
    <Page>
      <Background />
      <Shell>{children}</Shell>
    </Page>
  );
}
