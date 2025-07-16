/**
 * A number range in tuple form.
 */
export type Range = [number, number];

/**
 * Expands a number range into a list of numbers.
 */
export function expandRange(range: Range) {
  return Array.from({ length: range[1] - range[0] }).map(
    (_, i) => i + range[0]
  );
}
