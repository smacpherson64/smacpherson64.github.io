import * as React from "react";
import { twMerge } from "tailwind-merge";

export type CircleProps = React.ComponentProps<"svg">;

/**
 * @category components/shapes
 *
 * @description
 *
 * A visual circle
 *
 * @example
 * ```tsx
 * export default function Example() {
 *  return <Circle />
 * }
 * ```
 *
 * @param props
 */

export function Circle(props: CircleProps) {
  return (
    <svg
      viewBox="-1 -1 2 2"
      {...props}
      className={twMerge("w-full h-full fill-current", props.className)}
    >
      <circle cx="0" cy="0" r="1" />
    </svg>
  );
}
