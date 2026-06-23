import { CardGrid, PortfolioSection } from "components/portfolio/section";
import { ProjectCard } from "components/portfolio/project-card";
import { EXPERIMENTS } from "resume";

export function ExperimentsSection() {
  return (
    <PortfolioSection
      id="experiments"
      title="Experiments"
      count={`${EXPERIMENTS.length.toString().padStart(2, "0")} entries`}
    >
      <CardGrid>
        {EXPERIMENTS.map((exp) => (
          <ProjectCard
            key={exp.title}
            title={exp.title}
            description={exp.description}
            href={exp.url}
            ariaLabel={`Open ${exp.title}`}
            tags={exp.tags}
          />
        ))}
      </CardGrid>
    </PortfolioSection>
  );
}
