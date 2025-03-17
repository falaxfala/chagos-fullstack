export const makeNumberArray = (length: number = 10): number[] =>
  Array.from({ length }, (_, i) => i + 1);
