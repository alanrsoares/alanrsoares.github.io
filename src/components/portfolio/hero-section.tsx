import tw from "@styled-cva/react";
import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import Avatar from "components/avatar";
import { Button } from "components/ui/button";
import { SITE } from "site";

const Hero = tw.header`
  relative grid gap-10 overflow-visible
  lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12
  animate-fade-up
`;

const HeroCopy = tw.div`flex flex-col gap-5 max-w-2xl`;

const Eyebrow = tw.p`
  font-mono text-xs uppercase tracking-[0.2em] text-accent
`;

const Title = tw.h1`
  font-heading text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight
  text-foreground leading-[1.05]
`;

const Subtitle = tw.p`
  text-lg sm:text-xl font-medium text-muted-foreground
`;

const Bio = tw.p`
  text-base sm:text-[1.05rem] text-muted-foreground leading-relaxed max-w-[58ch]
`;

const LinkGroup = tw.div`flex flex-wrap gap-2.5 pt-1`;

const AvatarWrap = tw.div`
  relative z-0 mx-auto overflow-visible
  flex justify-center
  lg:mx-0 lg:justify-self-end lg:justify-end
`;

export function HeroSection() {
  return (
    <Hero>
      <HeroCopy>
        <Eyebrow>Open source</Eyebrow>
        <Title>{SITE.name}</Title>
        <Subtitle>{SITE.tagline}</Subtitle>
        <Bio>{SITE.summary}</Bio>
        <LinkGroup>
          <Button
            variant="outline"
            size="sm"
            render={
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" />
            }
          >
            <Github data-icon="inline-start" aria-hidden="true" />@{SITE.handle}
          </Button>
          <Button
            variant="outline"
            size="sm"
            render={
              <a
                href={SITE.website}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <ExternalLink data-icon="inline-start" aria-hidden="true" />
            alanrsoares.me
          </Button>
          <Button
            variant="outline"
            size="sm"
            render={
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <Linkedin data-icon="inline-start" aria-hidden="true" />
            LinkedIn
          </Button>
          <Button
            variant="outline"
            size="sm"
            render={<a href={`mailto:${SITE.email}`} />}
          >
            <Mail data-icon="inline-start" aria-hidden="true" />
            {SITE.email}
          </Button>
        </LinkGroup>
      </HeroCopy>
      <AvatarWrap>
        <Avatar size={256} src="/avatar-alanrsoares.png" />
      </AvatarWrap>
    </Hero>
  );
}
