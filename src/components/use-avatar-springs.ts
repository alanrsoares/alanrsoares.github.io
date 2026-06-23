import { useMotionTemplate, useMotionValue, useSpring } from "motion/react";

export function useAvatarSprings() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const rotateXSpring = useSpring(0, springConfig);
  const rotateYSpring = useSpring(0, springConfig);
  const translateXSpring = useSpring(0, springConfig);
  const translateYSpring = useSpring(0, springConfig);
  const scaleSpring = useSpring(1.25, springConfig);
  const transform = useMotionTemplate`translate3d(${translateXSpring}px, ${translateYSpring}px, 0) rotateX(${rotateXSpring}deg) rotateY(${rotateYSpring}deg)`;

  return {
    mouseX,
    mouseY,
    rotateXSpring,
    rotateYSpring,
    translateXSpring,
    translateYSpring,
    scaleSpring,
    transform,
  };
}
