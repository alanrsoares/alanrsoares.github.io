import { type MouseEvent, useCallback, useRef } from "react";

import { parallaxFromPointer } from "components/avatar-parallax-math";
import { useAvatarSprings } from "components/use-avatar-springs";
import { useReducedMotion } from "motion/react";

export function useAvatarParallax(size: number) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const springs = useAvatarSprings();
  const maxTranslate = ((size * 1.05 - size) / 2) * 2;
  const maxRotate = 18;

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !containerRef.current) return;
      const boundingRect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - (boundingRect.left + size / 2);
      const y = e.clientY - (boundingRect.top + size / 2);
      springs.mouseX.set(x);
      springs.mouseY.set(y);
      const { translateX, translateY, rotateX, rotateY } = parallaxFromPointer(
        x,
        y,
        size,
        maxTranslate,
        maxRotate,
      );
      springs.translateXSpring.set(translateX);
      springs.translateYSpring.set(translateY);
      springs.rotateXSpring.set(rotateX);
      springs.rotateYSpring.set(rotateY);
    },
    [prefersReducedMotion, size, maxTranslate, springs],
  );

  const resetMotion = useCallback(() => {
    springs.translateXSpring.set(0);
    springs.translateYSpring.set(0);
    springs.rotateXSpring.set(0);
    springs.rotateYSpring.set(0);
    springs.mouseX.set(0);
    springs.mouseY.set(0);
  }, [springs]);

  return {
    prefersReducedMotion,
    containerRef,
    transform: springs.transform,
    scaleSpring: springs.scaleSpring,
    handleMouseMove,
    resetMotion,
    scaleHover: () => springs.scaleSpring.set(1.15),
    scaleRest: () => springs.scaleSpring.set(1.25),
  };
}
