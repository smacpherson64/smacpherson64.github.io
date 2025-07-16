
# React Components

React in the style of VanJS.

## Proof of concept

My goal was to make a proof of concept that could work like VanJS style of callable functions using React.

Mainly something that could be used directly in the browser without compiling / bundling. 

I generally use three things that prevent things from being used in browsers directly without bundlers:
- Typescript, JSX, and npm

For NodeJS however, the last piece is JSX. By using a function calling style (like VanJS), React can be used on the server in a more ergonomic way.


```javascript
import { Fragment, createElement } from "react";

/** @import { JSX, JSXElementConstructor, ReactElement, ComponentProps, ReactNode } from 'react' */

/**
 * @typedef {Record<`data-${string}`, string>} DataAttributes
 */

/**
 * @typedef {keyof JSX.IntrinsicElements | JSXElementConstructor<any> | string} ComponentInput
 */

/**
 * @template {ComponentInput} A
 * @typedef {ComponentProps<A extends keyof JSX.IntrinsicElements ? A : A extends string ? "div" : A> & DataAttributes} Props
 */

/**
 * @template {ComponentInput} A
 * @typedef {Props<A> | ReactNode} ElementOrProps
 */

/**
 * @template {ComponentInput} A
 * @typedef {(
 *   ...args:
 *     | []
 *     | [ElementOrProps<A> | undefined]
 *     | [ElementOrProps<A> | undefined, ...(ReactNode | undefined)[]]
 * ) => ReactElement<Props<A>>} Component
 */

/**
 * @param {unknown} input
 * @returns {boolean}
 */
function isProps(input) {
  if (!input) return false;
  if (typeof input !== "object") return false;
  if ("$$typeof" in input) return false;
  return true;
}

/**
 * @template {ComponentInput} A
 * @param {A} tag
 * @return {Component<A>}
 */
function component(tag) {
  /**
   * @param {...any} args
   */
  return function create(...args) {
    const [head, ...rest] = args;
    /** @type {any} */
    let props = {};
    const children = [...rest];

    if (isProps(head)) {
      props = head;
    } else {
      children.unshift(props);
    }

    return createElement(tag, props, ...children);
  };
}

/**
 * @typedef {Readonly<Record<string, Component<string>>> & {[K in keyof JSX.IntrinsicElements]: Component<K>}} ProxyBaseObject
 */

export const tags = new Proxy(/** @type {ProxyBaseObject} */ ({}), {
  get(_, tag) {
    if (typeof tag !== "string") return noop;

    switch (tag) {
      case "fragment":
        return component(Fragment);

      default:
        return component(tag);
    }
  },
});

function noop() {
  return null;
}

```

Then using it would look like:

```javascript
import { tags } from "../utils/react.js";

const { div, small, abbr, details, summary, ul, li } = tags;

/**
 * @typedef {Object} ExperienceVisual.Props
 * @property {Object} item
 * @property {string} [item.description]
 * @property {string} item.title
 * @property {[number, number]} item.range
 * @property {string} item.business
 * @property {string[]} [item.responsibilities]
 * @property {string[]} [item.accomplishments]
 *
 * @param {ExperienceVisual.Props} props
 */
export function ExperienceVisual({ item }) {
  const header = (
      div({ className: "leading-tight" },
        div({ className: "flex items-baseline gap-1" },
          div({ className: "font-semibold" },
            item.description
              ? div({ className: "relative group cursor-help" },
                  abbr({ "data-title": item.description, className: "border-b border-dotted" },
                    item.title
                  ),
                  div({ className: "absolute hidden group-hocus:block -top-6 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded-md bg-slate-700/50 text-white backdrop-blur-sm w-[200px]", tabIndex: 0 },
                    item.description
                  )
                )
              : item.title
            ),
            small(item.range.join(" - "))
          ),
          div({ className: "font-light dark:text-gray-500" }, item.business)
        )
    );

  if (!item.responsibilities && !item.responsibilities) {
    return div({ className: "ml-5" }, header);
  }

  return (
    details(
      summary({ className: "gap-2 focus:outline-0 focus:ring-2 focus:ring-sky-500 rounded-xs" }, header),
      
      item.responsibilities &&
        div({ className: "mt-2 block px-2" },
          div({ className: "text-sm text-gray-700 dark:text-gray-300" },
            "Responsibilities:"
          ),
          ul({ className: "flex flex-col gap-2 mt-2 pl-8 text-gray-700 dark:text-gray-300 text-sm" },
            item.responsibilities.map(($item) =>
              li({ key: $item, className: "marker:text-sky-500 list-disc leading-tight" },
                $item
              )
          )
        )
      ),
    item.accomplishments &&
      div({ className: "mt-2 px-2" },
        div({ className: "text-sm text-gray-700 dark:text-gray-300" },
          "Favorite accomplishments:"
        ),
        ul({ className: "flex flex-col gap-2 mt-2 pl-8 text-gray-700 dark:text-gray-300  text-sm" },
          item.accomplishments.map(($item) =>
            li({ key: $item, className: "marker:text-sky-500 list-disc leading-tight" },
              $item
            )
          )
        )
      )
  )
}
```

