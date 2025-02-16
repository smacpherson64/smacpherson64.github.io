export type Range = [number, number];

export function expandRange(range: Range) {
  return Array.from({ length: range[1] - range[0] }).map(
    (_, i) => i + range[0]
  );
}
