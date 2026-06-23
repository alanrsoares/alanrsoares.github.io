import { useId, useMemo } from "react";

import AnimatedBlob, {
  createPaths,
  mulberry32,
} from "components/animated-blob";
import { cn } from "components/lib/utils";
import Starfield from "components/starfield";
import { useAvatarMotion } from "components/use-avatar-motion";
import { motion } from "motion/react";

const BLOB_SHAPE_TIME = 10;
const BLOB_PATH_COUNT = 5;
const BLOB_SEED = 11;
const BLOB_RADIUS = 1.05;
const BLOB_CLIP_SCALE = BLOB_RADIUS / 170;
const PORTAL_RATIO = 1.5;
const PORTAL_SPIN_SECONDS = 120;

interface AvatarProps {
  size?: number;
  src?: string;
  alt?: string;
  className?: string;
}

function useAvatarBlobPaths() {
  const rawId = useId();
  const clipId = `blob-clip-${rawId.replace(/:/g, "")}`;
  const blobPaths = useMemo(
    () => createPaths(BLOB_PATH_COUNT, mulberry32(BLOB_SEED)),
    [],
  );
  const animateDur = `${BLOB_SHAPE_TIME * blobPaths.length}s`;
  const animateValues = [...blobPaths, blobPaths[0]].join(";");

  return { clipId, blobPaths, animateDur, animateValues };
}

type AvatarClipDefsProps = {
  clipId: string;
  blobPaths: string[];
  animateDur: string;
  animateValues: string;
  prefersReducedMotion: boolean | null;
};

function AvatarClipDefs({
  clipId,
  blobPaths,
  animateDur,
  animateValues,
  prefersReducedMotion,
}: AvatarClipDefsProps) {
  return (
    <svg aria-hidden="true" className="absolute size-0" focusable="false">
      <defs>
        <clipPath clipPathUnits="objectBoundingBox" id={clipId}>
          <path
            d={blobPaths[0]}
            transform={`translate(0.5 0.40) scale(${BLOB_CLIP_SCALE})`}
          >
            {!prefersReducedMotion && (
              <animate
                attributeName="d"
                dur={animateDur}
                repeatCount="indefinite"
                values={animateValues}
              />
            )}
          </path>
        </clipPath>
      </defs>
    </svg>
  );
}

type AvatarPortraitProps = {
  size: number;
  src: string;
  alt: string;
  clipId: string;
  motion: ReturnType<typeof useAvatarMotion>;
};

function AvatarPortrait({
  size,
  src,
  alt,
  clipId,
  motion: m,
}: AvatarPortraitProps) {
  return (
    <motion.div
      className={cn("relative shadow-lg", {
        "trippy-avatar-border": m.isTrippyActive,
      })}
      onMouseEnter={m.handleMouseEnter}
      onMouseLeave={m.handleMouseLeave}
      onMouseMove={m.handleMouseMove}
      ref={m.containerRef}
      style={{
        width: size,
        height: size,
        clipPath: `url(#${clipId})`,
      }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: m.transform }}
      >
        <motion.div
          animate={m.imageControls}
          className="absolute inset-0 size-full"
          style={{ scale: m.scaleSpring }}
        >
          <img
            alt={alt}
            className="size-full object-cover"
            draggable={false}
            height={size}
            onDragStart={(e) => e.preventDefault()}
            src={src}
            width={size}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

type AvatarPortalProps = {
  size: number;
  prefersReducedMotion: boolean | null;
};

/** Black-hole backdrop: accent halo and rim around a void core. */
function AvatarPortal({ size, prefersReducedMotion }: AvatarPortalProps) {
  const portalSize = Math.round(size * PORTAL_RATIO);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        left: "50%",
        top: "40%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Starfield className="-inset-8" count={28} seed={BLOB_SEED} />
      <motion.div
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        className="relative"
        style={{ width: portalSize, height: portalSize }}
        transition={{
          duration: PORTAL_SPIN_SECONDS,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <AnimatedBlob
          className="absolute inset-0 m-auto translate-x-[-2%] translate-y-[2%] text-accent/20 blur-2xl"
          prngSeed={7}
          shapeTime={8}
          size="100%"
        />
        <AnimatedBlob
          className="absolute inset-0 m-auto translate-x-[2%] translate-y-[-1%] scale-[0.86] text-accent/80"
          prngSeed={21}
          shapeTime={6}
          size="100%"
        />
        <AnimatedBlob
          className="text-background absolute inset-0 m-auto translate-x-[1%] translate-y-[1%] scale-[0.72]"
          prngSeed={33}
          shapeTime={5}
          size="100%"
        />
      </motion.div>
    </div>
  );
}

export default function Avatar({
  size = 256,
  src = "",
  alt = "Alan R. Soares portrait",
  className = "",
}: AvatarProps) {
  const blob = useAvatarBlobPaths();
  const avatarMotion = useAvatarMotion(size);

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <AvatarClipDefs
        animateDur={blob.animateDur}
        animateValues={blob.animateValues}
        blobPaths={blob.blobPaths}
        clipId={blob.clipId}
        prefersReducedMotion={avatarMotion.prefersReducedMotion}
      />
      <AvatarPortal
        prefersReducedMotion={avatarMotion.prefersReducedMotion}
        size={size}
      />
      <AvatarPortrait
        alt={alt}
        clipId={blob.clipId}
        motion={avatarMotion}
        size={size}
        src={src}
      />
    </div>
  );
}
