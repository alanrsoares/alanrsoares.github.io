import { CardGrid, PortfolioSection } from "components/portfolio/section";
import { ProjectCard } from "components/portfolio/project-card";
import { OPEN_SOURCE } from "resume";

export function FeaturedOpenSourceSection() {
  return (
    <PortfolioSection
      id="featured-oss"
      title="Featured open source"
      count={`${OPEN_SOURCE.length.toString().padStart(2, "0")} projects`}
    >
      <CardGrid>
        {OPEN_SOURCE.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            href={project.url}
            ariaLabel={`Open ${project.title} on GitHub`}
            language={project.language}
            tags={project.tags}
          />
        ))}
      </CardGrid>
    </PortfolioSection>
  );
}
