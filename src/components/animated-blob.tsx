import { type FC, useEffect, useMemo, useState } from "react";

import { cn } from "components/lib/utils";

type Props = {
  paths?: string[];
  size: number | string;
  className?: string;
  shapeTime?: number;
  prngSeed?: number;
};

const getPRNGSeed = () => {
  const now = new Date();
  return Math.floor(now.getSeconds() / 10);
};

function useBlobPrngSeed(providedSeed?: number) {
  const [seed, setSeed] = useState<number>(providedSeed ?? 0);

  useEffect(() => {
    if (providedSeed === undefined) {
      queueMicrotask(() => setSeed(getPRNGSeed()));
    }
  }, [providedSeed]);

  return seed;
}

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

type BlobPathProps = {
  paths: string[];
  shapeTime: number;
  reducedMotion: boolean;
};

const BlobPath: FC<BlobPathProps> = ({ paths, shapeTime, reducedMotion }) => (
  <path
    d={reducedMotion ? paths[0] : undefined}
    fill="currentColor"
    id="blob"
    transform="translate(100 100)"
  >
    {!reducedMotion && (
      <animate
        attributeName="d"
        dur={shapeTime * paths.length}
        repeatCount="indefinite"
        values={[...paths, paths[0]].join(";")}
      />
    )}
  </path>
);

type BlobSvgLayerProps = {
  paths: string[];
  shapeTime: number;
  reducedMotion: boolean;
  blurred?: boolean;
};

const BlobSvgLayer: FC<BlobSvgLayerProps> = ({
  paths,
  shapeTime,
  reducedMotion,
  blurred,
}) => (
  <div
    className={blurred ? "absolute blur-[2px]" : "absolute"}
    style={{ height: "100%", width: "100%" }}
  >
    <svg
      aria-hidden="true"
      fill={blurred ? undefined : "none"}
      focusable="false"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <BlobPath
        paths={paths}
        reducedMotion={reducedMotion}
        shapeTime={shapeTime}
      />
    </svg>
  </div>
);

export default function AnimatedBlob({
  paths,
  size,
  className,
  shapeTime = 2,
  prngSeed: providedSeed,
}: Props) {
  const prngSeed = useBlobPrngSeed(providedSeed);
  const reducedMotion = usePrefersReducedMotion();
  const prng = useMemo(() => mulberry32(prngSeed), [prngSeed]);
  const generatedPaths = useMemo(() => createPaths(4, prng), [prng]);
  const usedPaths = paths ?? generatedPaths;

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      style={{ height: size, width: size }}
    >
      <BlobSvgLayer
        paths={usedPaths}
        reducedMotion={reducedMotion}
        shapeTime={shapeTime}
      />
      <BlobSvgLayer
        blurred
        paths={usedPaths}
        reducedMotion={reducedMotion}
        shapeTime={shapeTime}
      />
    </div>
  );
}

export const mulberry32 = (seed: number) => () => {
  seed += 0x6d2b79f5;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export function createPaths(length: number, prng?: () => number): string[] {
  const numPoints = 12;
  const baseRadius = 75;
  const variance = 10;

  function createBlobPath(): string {
    const points: { x: number; y: number }[] = [];

    for (let i = 0; i < numPoints; i += 1) {
      const angle = (Math.PI * 2 * i) / numPoints;
      const rand = prng ? prng() : Math.random();
      const r = baseRadius + (rand - 0.5) * 2 * variance;
      points.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
      });
    }

    let d = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;

    for (let i = 0; i < numPoints; i += 1) {
      const p0 = points[(i - 1 + numPoints) % numPoints];
      const p1 = points[i];
      const p2 = points[(i + 1) % numPoints];
      const p3 = points[(i + 2) % numPoints];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += `C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }

    d += "Z";
    return d;
  }

  return Array.from({ length }, () => createBlobPath());
}
