import { useMemo } from "react";

type SkillVisualProps = {
  item: {
    description?: string;
    title: string;
    range: [number, number];
    business: string;
    responsibilities?: string[];
    accomplishments?: string[];
  };
};

export function ExperienceVisual({ item }: SkillVisualProps) {
  const header = useMemo(() => {
    return (
      <div className="leading-tight">
        <div className="flex items-baseline gap-1">
          <div className="font-semibold">
            {item.description ? (
              <div className="relative group cursor-help">
                <abbr
                  data-title={item.description}
                  className="border-b border-dotted"
                >
                  {item.title}
                </abbr>

                <div
                  className="absolute hidden group-hocus:block -top-6 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded-md bg-slate-700/50 text-white backdrop-blur-sm w-[200px]"
                  tabIndex={0}
                >
                  {item.description}
                </div>
              </div>
            ) : (
              item.title
            )}
          </div>

          <small>{item.range.join(" - ")}</small>
        </div>

        <div className="font-light dark:text-gray-500">{item.business}</div>
      </div>
    );
  }, []);

  if (!item.responsibilities && !item.responsibilities) {
    return <div className="ml-5">{header}</div>;
  }

  return (
    <details>
      <summary className="gap-2 focus:outline-0 focus:ring-2 focus:ring-sky-500 rounded-xs">
        {header}
      </summary>

      {item.responsibilities && (
        <div className="mt-2 block px-2">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Responsibilities:
          </div>

          <ul className="flex flex-col gap-2 mt-2 pl-8 text-gray-700 dark:text-gray-300 text-sm">
            {item.responsibilities.map(($item) => (
              <li
                key={$item}
                className="marker:text-sky-500 list-disc leading-tight"
              >
                {$item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.accomplishments && (
        <div className="mt-2 px-2">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Favorite accomplishments:
          </div>

          <ul className="flex flex-col gap-2 mt-2 pl-8 text-gray-700 dark:text-gray-300  text-sm">
            {item.accomplishments.map(($item) => (
              <li
                key={$item}
                className="marker:text-sky-500 list-disc leading-tight"
              >
                {$item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </details>
  );
}
