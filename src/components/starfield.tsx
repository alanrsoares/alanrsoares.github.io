import { useMemo } from "react";

import { mulberry32 } from "components/animated-blob";
import { cn } from "components/lib/utils";

type StarfieldProps = {
  count?: number;
  seed?: number;
  className?: string;
};

type Star = {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
};

const useStars = (count: number, seed: number): Star[] =>
  useMemo(() => {
    const prng = mulberry32(seed);
    return Array.from({ length: count }, () => ({
      left: `${(prng() * 100).toFixed(1)}%`,
      top: `${(prng() * 100).toFixed(1)}%`,
      size: prng() > 0.85 ? 2 : 1,
      delay: `${(prng() * 3).toFixed(2)}s`,
      duration: `${(2 + prng() * 3).toFixed(2)}s`,
    }));
  }, [count, seed]);

export default function Starfield({
  count = 36,
  seed = 404,
  className,
}: StarfieldProps) {
  const stars = useStars(count, seed);

  return (
    <div aria-hidden className={cn("absolute -inset-12", className)}>
      {stars.map((star, i) => (
        <span
          className="absolute rounded-full bg-foreground/60 animate-pulse"
          key={`star-${i.toString()}`}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}
