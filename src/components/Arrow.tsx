import * as React from "react";
import { twMerge } from "tailwind-merge";

export type ArrowProps = React.ComponentProps<"svg">;

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
 *  return <Arrow />
 * }
 * ```
 *
 * @param props
 */

export function Arrow(props: ArrowProps) {
  return (
    <svg
      width="20"
      height="12"
      viewBox="0 0 20 12"
      {...props}
      className={twMerge("w-full h-full fill-current", props.className)}
    >
      <path
        d="M10 11.5L0 1.5L1.5 0L10 8.5L18.5 0L20 1.5L10 11.5Z"
        fill="black"
      />
    </svg>
  );
}
