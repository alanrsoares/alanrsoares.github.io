import type { ReactNode } from "react";

import { Badge } from "components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { ExternalLink } from "lucide-react";

const projectCardClass =
  "group relative min-h-[180px] transition-all hover:border-accent/45 hover:bg-card-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30";

export type ProjectCardProps = {
  title: string;
  description: string;
  href: string;
  ariaLabel: string;
  language?: string;
  tags: string[];
  meta?: ReactNode;
};

export function ProjectCard({
  title,
  description,
  href,
  ariaLabel,
  language,
  tags,
  meta,
}: ProjectCardProps) {
  return (
    <Card className={projectCardClass}>
      <a
        className="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="sr-only">{ariaLabel}</span>
      </a>
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
          {title}
        </CardTitle>
        <CardAction>
          <ExternalLink
            aria-hidden="true"
            className="text-muted-foreground transition-colors group-hover:text-accent"
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <CardDescription className="line-clamp-3 leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex-col items-start gap-3">
        {(language || tags.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {language && <Badge variant="outline">{language}</Badge>}
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {meta}
      </CardFooter>
    </Card>
  );
}
