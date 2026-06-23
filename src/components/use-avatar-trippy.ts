import { useCallback, useEffect, useRef, useState } from "react";

import { useAnimation } from "motion/react";

export function useAvatarTrippy(prefersReducedMotion: boolean | null) {
  const [isTrippyActive, setIsTrippyActive] = useState(false);
  const trippyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imageControls = useAnimation();

  const handleMouseEnter = useCallback(() => {
    if (prefersReducedMotion) return;
    if (trippyTimeout.current) clearTimeout(trippyTimeout.current);
    trippyTimeout.current = setTimeout(() => setIsTrippyActive(true), 3000);
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsTrippyActive(false);
    imageControls.stop();
    if (trippyTimeout.current) clearTimeout(trippyTimeout.current);
  }, [imageControls]);

  useEffect(() => {
    if (isTrippyActive) {
      imageControls.start({
        filter: [
          "hue-rotate(0deg) saturate(2) contrast(1.2)",
          "hue-rotate(360deg) saturate(2) contrast(1.2)",
        ],
        transition: { duration: 3, repeat: Infinity, ease: "linear" },
      });
    } else {
      imageControls.start({
        filter: "hue-rotate(0deg) saturate(1) contrast(1)",
        transition: { duration: 0.3 },
      });
    }
  }, [isTrippyActive, imageControls]);

  useEffect(
    () => () => {
      if (trippyTimeout.current) clearTimeout(trippyTimeout.current);
    },
    [],
  );

  return { isTrippyActive, imageControls, handleMouseEnter, handleMouseLeave };
}
