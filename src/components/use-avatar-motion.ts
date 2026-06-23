import { useCallback } from "react";

import { useAvatarParallax } from "components/use-avatar-parallax";
import { useAvatarTrippy } from "components/use-avatar-trippy";

export function useAvatarMotion(size: number) {
  const parallax = useAvatarParallax(size);
  const trippy = useAvatarTrippy(parallax.prefersReducedMotion);

  const handleMouseEnter = useCallback(() => {
    if (parallax.prefersReducedMotion) return;
    parallax.scaleHover();
    trippy.handleMouseEnter();
  }, [parallax, trippy]);

  const handleMouseLeave = useCallback(() => {
    parallax.scaleRest();
    parallax.resetMotion();
    trippy.handleMouseLeave();
  }, [parallax, trippy]);

  return {
    prefersReducedMotion: parallax.prefersReducedMotion,
    isTrippyActive: trippy.isTrippyActive,
    containerRef: parallax.containerRef,
    imageControls: trippy.imageControls,
    transform: parallax.transform,
    scaleSpring: parallax.scaleSpring,
    handleMouseMove: parallax.handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}
