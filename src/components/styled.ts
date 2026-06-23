import styled from "styled-components";

export const AppContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 4.5rem;

  @media (max-width: 640px) {
    padding: 2.5rem 1rem;
    gap: 3.5rem;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 700px;
`;

export const Title = styled.h1`
  font-size: 2.75rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: var(--foreground);

  @media (max-width: 640px) {
    font-size: 2.25rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: var(--muted);
  font-weight: 500;
  letter-spacing: -0.01em;
`;

export const Bio = styled.p`
  font-size: 1rem;
  color: var(--muted);
  line-height: 1.6;
  max-width: 65ch;
`;

export const LinkGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
`;

export const SocialLink = styled.a`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--foreground);
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  background-color: var(--card);
  border: 1px solid var(--border);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: var(--accent);
    background-color: var(--card-hover);
    transform: translateY(-1px);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const StatsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.25rem;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 1.75rem 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

export const StatCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StatValue = styled.div`
  font-family: var(--font-mono);
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--foreground);
  display: flex;
  align-items: baseline;
  gap: 0.125rem;
`;

export const StatLabel = styled.div`
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--muted);
  font-weight: 500;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: 1px solid rgba(39, 41, 45, 0.4);
  padding-bottom: 0.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 1px;
    background-color: var(--accent);
  }
`;

export const SectionCount = styled.span`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--muted);
  letter-spacing: 0.05em;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: var(--accent);
    background-color: var(--card-hover);
    transform: translateY(-2px);
    box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.5);
  }
`;

export const CardHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--foreground);
`;

export const CardDescription = styled.p`
  font-size: 0.875rem;
  color: var(--muted);
  line-height: 1.5;
  flex-grow: 1;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  background-color: rgba(39, 41, 45, 0.5);
  border: 1px solid var(--border);
  color: var(--muted);
`;

export const LangTag = styled(Tag)<{ $lang: string }>`
  color: var(--foreground);
  border-color: transparent;
  background-color: ${props => {
    switch (props.$lang?.toLowerCase()) {
      case "typescript":
        return "rgba(49, 120, 198, 0.15)";
      case "javascript":
        return "rgba(241, 224, 90, 0.15)";
      case "svelte":
        return "rgba(255, 62, 0, 0.15)";
      case "go":
        return "rgba(0, 173, 216, 0.15)";
      case "html":
        return "rgba(227, 76, 38, 0.15)";
      default:
        return "rgba(139, 143, 152, 0.15)";
    }
  }};
`;

export const RepoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--muted);
  font-family: var(--font-mono);
  margin-top: auto;
  border-top: 1px solid rgba(39, 41, 45, 0.4);
  padding-top: 0.75rem;
`;

export const RepoMetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const CardLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

export const ExternalLinkIcon = styled.span`
  color: var(--muted);
  display: inline-flex;
  transition: color 0.2s;

  ${Card}:hover & {
    color: var(--accent);
  }
`;

export const SkeletonText = styled.div<{ $width?: string }>`
  height: 1rem;
  width: ${props => props.$width || "100%"};
  background-color: var(--border);
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.05) 20%,
      rgba(255, 255, 255, 0.1) 60%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;
