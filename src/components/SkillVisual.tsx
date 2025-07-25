import { useMemo } from "react";
import { Circle } from "./Circle.tsx";
import { expandRange } from "../utils/numbers.tsx";

type SkillVisualProps = {
  name: string;
  description: string | string[];
  years: [number, number][];
  startYear: number;
};

export function SkillVisual({
  name,
  years,
  startYear,
  description,
}: SkillVisualProps) {
  const total = useMemo(
    // Include current year
    () => new Date().getFullYear() + 1 - startYear,
    [startYear]
  );

  const yearsUsed = useMemo(() => years.map(expandRange).flat(), [years]);
  const count = yearsUsed.length;

  const slots: Array<boolean> = useMemo(
    () =>
      Array.from<boolean>({ length: total }).map((_, i) =>
        yearsUsed.includes(i + startYear)
      ),
    [startYear, years]
  );

  const dots = useMemo(() => {
    return slots.map((isUsed, i) => (
      <div
        key={i}
        className={`${
          isUsed
            ? "text-sky-400 dark:text-sky-500"
            : "text-gray-300 dark:text-gray-700"
        } w-[7px] h-[7px] relative group`}
      >
        <Circle />
        <div
          className="absolute hidden group-hocus:block -top-6 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded-md bg-slate-700/50 text-white backdrop-blur-sm"
          tabIndex={0}
        >
          {startYear + i}
        </div>
      </div>
    ));
  }, [count, slots]);

  return (
    <div className="text-black dark:text-slate-300">
      <div>
        {description ? (
          <details className="w-full flex flex-col gap-2">
            <summary className="whitespace-pre font-semibold dark:font-light flex-1 text-sm outline-0 focus:ring-2 focus:ring-sky-500 rounded-xs dark:border-0">
              <div className="flex items-center justify-between w-full gap-2">
                <span>{name}</span>{" "}
                <span
                  className="h-[1px] w-full bg-gray-200 dark:bg-gray-800"
                  aria-hidden
                ></span>
                <small className="flex-1 whitespace-pre">
                  {count} {count === 1 ? "year" : "years"}
                </small>
              </div>
            </summary>

            <div className="p-2">
              <small className="text-xs text-gray-500 dark:text-gray-400 leading-tight whitespace-normal">
                {description}
              </small>
            </div>
          </details>
        ) : (
          <span className="font-semibold dark:font-light flex-1 whitespace-pre text-sm flex gap-2 items-center justify-between">
            {name}{" "}
            <span
              className="h-[1px] w-full bg-gray-200 dark:bg-gray-800"
              aria-hidden
            ></span>
            <small className="flex-1  whitespace-pre">
              {count} {count === 1 ? "year" : "years"}
            </small>
          </span>
        )}
      </div>

      <div
        className="flex flex-wrap gap-[2px]"
        aria-label={`Seth used the ${name} skill during the following years: ${yearsUsed.join(
          ", "
        )}`}
      >
        {dots}
      </div>
    </div>
  );
}
