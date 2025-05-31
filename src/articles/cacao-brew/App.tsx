import { ComponentProps, createElement } from "react";
import { twMerge } from "tailwind-merge";

////////////////////////////////
// #region . Helpers
////////////////////////////////

// =============================
// #region .. styling
// =============================

type As = keyof HTMLElementTagNameMap;

const tw = <A extends As>(className: string, as?: A) => {
  return function Component(props: ComponentProps<A>) {
    return createElement(as ?? "div", {
      ...props,
      className: twMerge(className, props.className),
    });
  };
};

const TextLayout = tw("p-6 max-w-xl m-auto text-left");
const H1 = tw("text-2xl sm:text-3xl font-bold mb-2 mt-6", "h1");
const H2 = tw("text-xl font-bold mb-2 mt-6", "h2");
const P = tw("mb-6 font-light", "p");
const Figcaption = tw(
  "text-lg text-gray-200 mt-2 px-4 py-1 max-w-92 leading-none",
  "figcaption"
);
const Img = tw("aspect-square w-full max-w-92 w-full rounded-2xl", "img");

////////////////////////////////
// #region . Main app
////////////////////////////////

function App() {
  return (
    <main className="w-full overflow-x-hidden">
      <article>
        <TextLayout className="space-y-10">
          <header>
            <H1>Cacao brew</H1>

            <P>
              My family and I enjoy drinking cacao brew as a special treat.{" "}
            </P>

            <P>I wanted to share the recipe so others can enjoy it as well:</P>
          </header>

          <hr className="text-gray-800" />

          <section className="mt-8">
            <H2 className="font-bold">Ingredients</H2>
            <ul className="mt-4">
              <li>
                <figure>
                  <Img src="./assets/salt-teaspoon.jpg" />
                  <Figcaption>1/8 teaspoon of salt </Figcaption>
                </figure>
              </li>

              <li className="mt-8">
                <figure>
                  <Img src="./assets/syrup-half-cup.jpg" />
                  <Figcaption>1/3 cup organic maple syrup</Figcaption>
                </figure>
              </li>

              <li className="mt-8">
                <figure>
                  <Img src="./assets/cacao-tablespoon.jpg" />
                  <Figcaption>6 tablespoons of cacao nibs</Figcaption>
                </figure>
              </li>

              <li className="mt-8">
                <figure>
                  <div className="aspect-square max-w-92 w-full border border-dotted border-gray-800 p-4 rounded-2xl grid place-items-center">
                    <div className="text-blue-400">
                      <span>Imagine water here...</span>
                    </div>
                  </div>
                  <Figcaption>33oz (4.125cups) filtered water</Figcaption>
                </figure>
              </li>
            </ul>
          </section>

          <section>
            <H2 className="font-bold">Steps</H2>

            <div className="mt-4">
              <ul className="pl-6">
                <li className="list-decimal">
                  <span>
                    Mix salt, syrup, cacao nibs, and water together in a pot
                  </span>
                  <div className="mt-6">
                    <figure>
                      <Img src="./assets/mixed-in-pot.jpg" />
                      <Figcaption className="text-sm text-slate-400">
                        When boiling the cacao nibs will turn a darker brown.
                      </Figcaption>
                    </figure>
                  </div>
                </li>

                <li className="list-decimal mt-6">Cook on high heat</li>
                <li className="list-decimal">Bring to a boil</li>
                <li className="list-decimal">Once boiling remove from heat</li>
                <li className="list-decimal">Let it cool for 5 minutes</li>
                <li className="list-decimal">Strain out nibs and serve</li>
              </ul>
            </div>
          </section>

          <section>
            <H2 className="font-bold">Notes</H2>

            <div className="mt-4">
              <figure>
                <Img src="./assets/strainer.jpg" />
                <Figcaption className="text-base">
                  For straining, we like this strainer from oxo.
                  <br /> It's wide lips make save one's fingers from burning.
                </Figcaption>
              </figure>
            </div>
          </section>
        </TextLayout>
      </article>
    </main>
  );
}

export default App;
