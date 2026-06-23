import tw from "@styled-cva/react";
import { ExternalLink, FileText, Github, Linkedin, Mail } from "lucide-react";
import Avatar from "components/avatar";
import { Button } from "components/ui/button";
import { BASICS } from "resume";

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

function profileIcon(network: string) {
  switch (network) {
    case "GitHub":
      return <Github data-icon="inline-start" aria-hidden="true" />;
    case "LinkedIn":
      return <Linkedin data-icon="inline-start" aria-hidden="true" />;
    default:
      return <ExternalLink data-icon="inline-start" aria-hidden="true" />;
  }
}

export function HeroSection() {
  return (
    <Hero>
      <HeroCopy>
        <Eyebrow>Portfolio</Eyebrow>
        <Title>{BASICS.name}</Title>
        <Subtitle>{BASICS.label}</Subtitle>
        <Bio>{BASICS.summary}</Bio>
        <LinkGroup>
          <Button
            variant="outline"
            size="sm"
            render={
              <a
                href={`mailto:${BASICS.email}`}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <Mail data-icon="inline-start" aria-hidden="true" />
            Email
          </Button>
          {BASICS.profiles.map((profile) => (
            <Button
              key={profile.network}
              variant="outline"
              size="sm"
              render={
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              {profileIcon(profile.network)}
              {profile.network}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            render={
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" />
            }
          >
            <FileText data-icon="inline-start" aria-hidden="true" />
            Resume
          </Button>
        </LinkGroup>
      </HeroCopy>
      <AvatarWrap>
        <Avatar size={256} src="/avatar-alanrsoares.png" />
      </AvatarWrap>
    </Hero>
  );
}
