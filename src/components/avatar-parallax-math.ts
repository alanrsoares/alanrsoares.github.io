const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function parallaxFromPointer(
  x: number,
  y: number,
  size: number,
  maxTranslate: number,
  maxRotate: number
) {
  return {
    translateX: clamp(
      (x / (size / 2)) * maxTranslate,
      -maxTranslate,
      maxTranslate
    ),
    translateY: clamp(
      (y / (size / 2)) * maxTranslate,
      -maxTranslate,
      maxTranslate
    ),
    rotateX: clamp(-(y / (size / 2)) * maxRotate, -maxRotate, maxRotate),
    rotateY: clamp((x / (size / 2)) * maxRotate, -maxRotate, maxRotate),
  };
}
