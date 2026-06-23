import type { ReactNode } from "react";
import { Card, CardContent } from "components/ui/card";
import { cn } from "components/lib/utils";

type StatCardProps = {
  value: ReactNode;
  label: string;
  compact?: boolean;
};

export function StatCard({ value, label, compact = false }: StatCardProps) {
  return (
    <Card
      size="sm"
      className="transition-colors hover:border-accent/30 hover:bg-card-hover"
    >
      <CardContent className="flex flex-col gap-1.5">
        <div
          className={cn(
            "font-mono font-semibold tracking-tight text-foreground leading-none",
            compact ? "text-lg sm:text-xl" : "text-2xl sm:text-[1.75rem]",
          )}
        >
          {value}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px]">
          {label}
        </div>
      </CardContent>
    </Card>
  );
}
