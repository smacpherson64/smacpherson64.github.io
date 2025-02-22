import { useState, createElement, ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import Decimal from "decimal.js";

////////////////////////////////
// #region . Constants
////////////////////////////////

const data = getLevels(3).map((real, index) => ({
  real: real.toString(),
  natural: (index + 1).toString(),
}));

////////////////////////////////
// #region . Main app
////////////////////////////////

function App() {
  return (
    <main className="w-full overflow-x-hidden">
      <article>
        <TextLayout className="space-y-10">
          <header>
            <H1>
              Experiment: Mapping real numbers between 0 to 1 to natural
              numbers.
            </H1>
          </header>

          <section className="mt-8">
            <header>
              <H2 className="bg-orange-500/5 border border-orange-500 text-orange-100 px-8 py-8">
                TDLR: I failed, it is not possible to map real numbers between 0
                and 1 to natural numbers.
              </H2>

              <P className="mt-8">
                My main misunderstanding was not understanding the different
                types of numbers. The symbols are the same (E.G. digits between
                0 - 9), but the rules of the of numbers are not.
              </P>
            </header>

            <div className="mt-8">
              <P className="mb-0">Some lessons learned:</P>

              <ul className="pl-12">
                <li className="list-decimal">
                  There are different types of numbers.
                </li>

                <li className="list-decimal">
                  Natural numbers have finite digits.
                </li>

                <li className="list-decimal">
                  Some real numbers can have infinite digits.
                </li>
              </ul>

              <div className="w-full p-4 bg-slate-950 text-sm mt-8">
                Different types of numbers:
                <iframe
                  className="aspect-video w-full my-4"
                  src="https://www.youtube.com/embed/htYh-Tq7ZBI?si=9aijG7roZYIIHEKQ"
                  frameBorder="0"
                  title="Why can't I multiply matrices"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <table className="w-full mt-2 table-fixed">
                  <thead>
                    <tr>
                      <th>
                        <strong>Examples</strong>
                      </th>
                      <th>
                        <strong>Name</strong>
                      </th>
                      <th className="w-[8%]">
                        <strong>+</strong>
                      </th>
                      <th className="w-[8%]">
                        <strong>X</strong>
                      </th>
                      <th className="w-[8%]">
                        <strong>-</strong>
                      </th>
                      <th className="w-[8%]">
                        <strong>/</strong>
                      </th>
                      <th className="w-[8%]">
                        <strong>^</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0,1,2,3,4,5</td>
                      <td>ℕ - Natural</td>
                      <td>ℕ</td>
                      <td>ℕ</td>
                      <td>ℤ</td>
                      <td>Q</td>
                      <td>ℕ</td>
                    </tr>
                    <tr>
                      <td>-2,-1,0,1,2</td>
                      <td>ℤ - Integers</td>
                      <td>ℤ</td>
                      <td>ℤ</td>
                      <td>ℤ</td>
                      <td>Q</td>
                      <td>Q</td>
                    </tr>
                    <tr>
                      <td>1/3</td>
                      <td>Q - Rational</td>
                      <td>Q</td>
                      <td>Q</td>
                      <td>Q</td>
                      <td>Q</td>
                      <td>C</td>
                    </tr>
                    <tr>
                      <td>√5</td>
                      <td>ℝ - Real</td>
                      <td>ℝ</td>
                      <td>ℝ</td>
                      <td>ℝ</td>
                      <td>ℝ</td>
                      <td>C</td>
                    </tr>
                    <tr>
                      <td>√-5</td>
                      <td>C - Complex</td>
                      <td>C</td>
                      <td>C</td>
                      <td>C</td>
                      <td>C</td>
                      <td>C</td>
                    </tr>
                    <tr>
                      <td>(2.5, -3, 8.4)</td>
                      <td>ℝ3 - 3D Vectors</td>
                      <td>ℝ3</td>
                      <td></td>
                      <td>ℝ3</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full p-4 bg-slate-950 text-sm mt-8">
              <P>
                <A href="https://math.stackexchange.com/a/460479/1175828">
                  A similar question on math stack exchange:
                </A>
                . The accepted answer said: "natural numbers cannot be
                infinitely long".
              </P>

              <P>
                So the set of natural numbers is infinite, but each natural
                number in the set is not, each natural number has a finite set
                of digits.
              </P>

              <P>
                In response to the formula, So 1/3 returns a real number 0.3...,
                and this real number has infinite digits. Since natural numbers
                have finite digits, there is no way to represent this number.
              </P>

              <P>
                A formula like <strong>(1 / 3) * 10^x</strong>, returns an
                infinite set of natural numbers, not an actual natural number:
                [3, 33, 333, 3333, 33333, 333333, ...].
              </P>
            </div>

            <div className="w-full p-4 bg-slate-950 text-sm mt-8">
              <P>
                Originally shared this on{" "}
                <A href="https://news.ycombinator.com/item?id=35726944">
                  hacker news
                </A>{" "}
                and had some excellent feedback. The glaring problem with the
                first conclusion, and especially the mirror method, was
                irrational numbers. These numbers never stop getting bigger.
              </P>
            </div>
          </section>

          <section>
            <header>
              <H2>Original article:</H2>
            </header>

            <P>
              I enjoy watching{" "}
              <A href="https://www.veritasium.com">Veritasium</A>'s math videos.
              His video "Math's Fundamental Flaw" is my easily favorite.
              However, the explanation of{" "}
              <A href="https://en.wikipedia.org/wiki/Cantor's_diagonal_argument">
                Cantor's Diagonalization Argument
              </A>{" "}
              consistently bothers me. It comes in at around 4m and 30s in the
              video.
            </P>

            <iframe
              className="aspect-video w-full my-4"
              src="https://www.youtube.com/embed/HeQX2HjkcNo"
              title="Math&#39;s Fundamental Flaw"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            <P>
              Each time I hear the argument, that real numbers between zero to
              one are a larger infinity than natural numbers, I want explore and
              see if it is possible to make a one to one mapping between these
              sets. This post is my attempt.
            </P>

            <P>
              The clearest hurdle is the set real numbers between zero and one
              is "uncountable". There isn't a clear starting point, both ends of
              the set can keep growing or shrinking forever, E.G.:
            </P>

            <ul className="list-disc ml-12 leading-2 my-4">
              <li>
                <Bold>Prepend 0 after the decimal</Bold>:{" "}
                <span>0.1, 0.01, 0.001, 0.0001, 0.00001, ...</span>
              </li>
              <li>
                <Bold>Append .9</Bold>:{" "}
                <span>0.9, 0.99, 0.999, 0.9999, 0.99999, ...</span>
              </li>
            </ul>

            <P>
              The most direct way of counting is not possible. There is no good
              starting point for that algorithm.
            </P>
          </section>

          <section id="argument">
            <header>
              <H2>A different approach</H2>
            </header>

            <div className="space-y-4">
              <P>
                Since the starting point to count this set is not
                straightforward, the counting algorithm needs to be more
                creative. Whatever method is used, it must consistently count
                and label the these numbers.
              </P>

              <P>
                What if instead of counting this set of numbers on a line, they
                are counted like branches on a tree?
              </P>

              <figure className="block">
                <img src="./assets/tree.png" />

                <caption className="text-xs block text-left py-2">
                  <span className="opacity-80">Original picture from </span>
                  <A href="https://www.publicdomainpictures.net/en/view-image.php?image=170902&picture=trees-without-leaves">
                    PublicDomainPictures.net - George Hodan
                  </A>
                </caption>
              </figure>

              <P>The two main tree branch counting methods are: </P>
              <ul className="list-disc ml-12 leading-2 my-4 space-y-4">
                <li>
                  <Bold>
                    <A
                      className="text-md"
                      href="https://en.wikipedia.org/wiki/Depth-first_search"
                    >
                      Depth-first search
                    </A>
                  </Bold>{" "}
                  - Follow each branch as deeply as possible counting all sub
                  branches until there are no sub branches left. After each
                  branch is exhausted move on to the next available branch. Do
                  this until all branches on the tree have been counted.
                </li>
                <li>
                  <Bold>
                    <A
                      className="text-md"
                      href="https://en.wikipedia.org/wiki/Breadth-first_search"
                    >
                      Breadth-first search
                    </A>
                  </Bold>{" "}
                  - Follow only the immediately connected branches to the
                  current branch (or ground). Once all immediately connected
                  branches are counted, go to the next level down of branches
                  and count again until all branches have been reached (and
                  counted). Do this until all branches have been counted.
                </li>
              </ul>

              <P>
                To make these numbers into a tree, the individual branches could
                be each individual number, and they could be connected to the
                size of the number to count by. E.G: the first level .1 would be
                (.1 - .9), the second level .01 would result in (.01 -.99), the
                third .001 would be (.001-.999), the fourth would be .0001
                (.0001 - .9999), and so on. Each level would then exclude
                numbers that have already been counted. It could be visualized
                like so:
              </P>

              <div className="rounded relative">
                <div className="absolute h-full left-0">
                  <div
                    className="rounded-full bg-gray-500 w-3 h-3 absolute top-[-5px] left-[-5px]"
                    aria-hidden
                  />
                  <div
                    className="absolute top-0 left-0 h-full w-[2px] bg-gray-500 z-0"
                    aria-hidden
                  />
                </div>

                <div className="space-y-8 -translate-x-[12px]">
                  <div className="relative z-10">
                    <div
                      className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-500 -z-10"
                      aria-hidden
                    />

                    <div className="flex space-x-4 py-4 justify-between">
                      <div className="rounded bg-blue-600 inline-block px-2 relative">
                        .1
                      </div>

                      <div className="rounded-full bg-gray-600 px-2">.1</div>
                      <div className="rounded-full bg-gray-600 px-2">.2</div>
                      <div className="rounded-full bg-gray-600 px-2">.3</div>
                      <div className="rounded-full bg-gray-600 px-2">.4</div>
                      <div className="rounded-full bg-gray-600 px-2">.5</div>
                      <div className="rounded-full bg-gray-600 px-2">.6</div>
                      <div className="rounded-full bg-gray-600 px-2">.7</div>
                      <div className="rounded-full bg-gray-600 px-2">.8</div>
                      <div className="rounded-full bg-gray-600 px-2">.9</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 -translate-x-[12px]">
                  <div className="relative z-10">
                    <div
                      className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-500 -z-10"
                      aria-hidden
                    />

                    <div className="flex space-x-4 py-4 justify-between">
                      <div className="rounded bg-blue-600 inline-block px-2 relative">
                        .01
                      </div>

                      <div className="rounded-full bg-gray-600 px-2">.01</div>
                      <div className="rounded-full bg-gray-600 px-2">.02</div>
                      <div className="rounded-full bg-gray-600 px-2">.03</div>
                      <div className="rounded-full bg-gray-600 px-2">.04</div>
                      <div className="rounded-full bg-gray-600 px-2">.05</div>
                      <div className="rounded-full bg-gray-600 px-2">.06</div>
                      <div className="rounded-full bg-gray-600 px-2">...</div>
                      <div className="rounded-full bg-gray-600 px-2">.99</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 -translate-x-[12px]">
                  <div className="relative z-10">
                    <div
                      className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-500 -z-10"
                      aria-hidden
                    />

                    <div className="flex space-x-4 py-4 justify-between">
                      <div className="rounded bg-blue-600 inline-block px-2 relative">
                        .001
                      </div>

                      <div className="rounded-full bg-gray-600 px-2">.001</div>
                      <div className="rounded-full bg-gray-600 px-2">.002</div>
                      <div className="rounded-full bg-gray-600 px-2">.003</div>
                      <div className="rounded-full bg-gray-600 px-2">.004</div>
                      <div className="rounded-full bg-gray-600 px-2">.005</div>
                      <div className="rounded-full bg-gray-600 px-2">.006</div>
                      <div className="rounded-full bg-gray-600 px-2">...</div>
                      <div className="rounded-full bg-gray-600 px-2">.999</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 -translate-x-[12px]">
                  <div className="relative z-10">
                    <div
                      className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-500 -z-10"
                      aria-hidden
                    />

                    <div className="flex space-x-4 py-4 justify-between">
                      <div className="rounded bg-blue-600 inline-block px-2 relative">
                        .0001
                      </div>

                      <div className="rounded-full bg-gray-600 px-2">.0001</div>
                      <div className="rounded-full bg-gray-600 px-2">.0002</div>
                      <div className="rounded-full bg-gray-600 px-2">.0003</div>
                      <div className="rounded-full bg-gray-600 px-2">.0004</div>
                      <div className="rounded-full bg-gray-600 px-2">.0005</div>
                      <div className="rounded-full bg-gray-600 px-2">.0006</div>
                      <div className="rounded-full bg-gray-600 px-2">...</div>
                      <div className="rounded-full bg-gray-600 px-2">.9999</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 -translate-x-[12px]">
                  <div className="relative z-10">
                    <div className="flex space-x-4 py-4 justify-between">
                      <div className="rounded bg-blue-600 inline-block px-2 relative">
                        ...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <P>
              Although this is inefficient compared to a simple counting
              algorithm it does provide a method to consistently count and label
              the set of real numbers between zero and one.
            </P>
          </section>

          <section id="argument">
            <header>
              <H2>Mapping: how do these sets map one to one?</H2>
            </header>

            <div className="space-y-4">
              <P>
                Labeling each number with a simple index approach would work
                well:
              </P>

              <div className="h-48 overflow-scroll relative my-12">
                <table className="table-auto w-full">
                  <thead className="sticky top-0 bg-slate-600">
                    <tr>
                      <TD className="w-1/2">Natural Number</TD>
                      <TD className="w-1/2">Real Number</TD>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item, index) => {
                      return (
                        <TR key={item.real}>
                          <TD
                            className={
                              index % 2 === 0 ? "bg-white/5" : "bg-transparent"
                            }
                          >
                            {item.natural}:
                          </TD>
                          <TD
                            className={
                              index % 2 === 0 ? "bg-white/5" : "bg-transparent"
                            }
                          >
                            {item.real}
                          </TD>
                        </TR>
                      );
                    })}
                    <TR>
                      <TD>...</TD>
                      <TD>...</TD>
                    </TR>
                    <TR>
                      <TD>∞:</TD>
                      <TD>∞</TD>
                    </TR>
                  </tbody>
                </table>
              </div>

              <H3>The mirror method</H3>

              <P>
                A less straightforward option for labeling could be to flip each
                real number. Similar to looking at the number in a mirror. Each
                flipped real number in this set reveals a unique natural number
                equivalent.
              </P>

              <P>
                My favorite part of this method is that it shows that every real
                number between zero and one has a natural number reflected
                representation.
              </P>

              <div className="h-48 overflow-scroll relative my-12">
                <table className="table-auto w-full">
                  <thead className="sticky top-0 bg-slate-600">
                    <tr>
                      <TD className="w-1/2">Natural Number (mirrored)</TD>
                      <TD className="w-1/2">Real Number</TD>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item, index) => {
                      return (
                        <TR key={item.real}>
                          <TD
                            className={
                              index % 2 === 0 ? "bg-white/5" : "bg-transparent"
                            }
                          >
                            {inverse(item.real)}
                          </TD>
                          <TD
                            className={
                              index % 2 === 0 ? "bg-white/5" : "bg-transparent"
                            }
                          >
                            {item.real}
                          </TD>
                        </TR>
                      );
                    })}
                    <TR>
                      <TD>...</TD>
                      <TD>...</TD>
                    </TR>
                    <TR>
                      <TD>∞:</TD>
                      <TD>∞</TD>
                    </TR>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </TextLayout>

        <FullWidthLayout>
          <div className="bg-white/5 max-w-[800px] mx-auto p-4">
            <H2>Mirror method example</H2>

            <P>
              This simplistic example shows how the mirror could function. On
              one side is a real number between zero and one. On the other is
              the natural number reflection that represents this number. Every
              real number entered has an equivalent natural number on the right.
            </P>

            <InverseInput />
          </div>
        </FullWidthLayout>

        <TextLayout>
          <section>
            <header>
              <H2>Conclusion</H2>
            </header>

            <P>
              Thinking of the set of real numbers between zero and one as a tree
              and then using a tree counting algorithm makes it possible to map
              this set one to one with natural numbers.
            </P>
          </section>
        </TextLayout>
      </article>
    </main>
  );
}

export default App;

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
const FullWidthLayout = tw("p-6 m-auto text-left");
const H1 = tw("text-2xl sm:text-3xl font-bold mb-2 mt-6");
const H2 = tw("text-xl font-bold mb-2 mt-6");
const H3 = tw("text-md font-bold mb-2 mt-6");
const P = tw("mb-6");
const Bold = tw("font-bold", "strong");
const A = tw(
  "text-emerald-400 transition-colors hover:text-emerald-400/90",
  "a"
);
const TR = tw("hover:bg-white/10", "tr");
const TD = tw("p-1", "td");

// =============================
// #region .. util functions
// =============================

function inverse(real: number | string) {
  return real.toString().replace("0.", "").split("").reverse().join("");
}

function InverseInput() {
  const [number, setNumber] = useState(
    Math.random().toString().replace("0.", "")
  );
  return (
    <div className="flex flex-col md:flex-row items-center md:items-center justify-between space-y-2 md:space-x-8 w-full text-left">
      <div className="flex-1 w-full md:w-auto text-[17px] md:text-2xl">
        <label htmlFor="real-number-input">Real number</label>
        <div className="rounded p-4 bg-white/10 focus-within:ring-2 flex">
          <span>0.</span>

          <input
            type="number"
            id="real-number-input"
            className="w-full focus:ring-0 border-0 bg-transparent focus:outline-none flex-1"
            value={number}
            onChange={(event) => {
              // Remove non digits
              const value = event.currentTarget.value.replace(/\D{1}/g, "");

              // Remove trailing zeros, unless only zeros
              const nextValue = /^0{1,}$/.test(value)
                ? value
                : value.replace(/0{1,}$/, "");

              setNumber(nextValue);
            }}
          />
        </div>
      </div>

      <div className="text-3xl md:text-[50px] leading-none">
        <span aria-hidden className="hidden md:inline-block">
          →
        </span>
        <span aria-hidden className="inline-block md:hidden">
          ↓
        </span>
        <span className="sr-only">becomes</span>
      </div>

      <div className="flex-1 w-full md:w-auto max-sm:w-full text-[17px] md:text-2xl">
        <span>Natural number (mirrored)</span>
        <div className="rounded bg-white/10 p-4 focus-within:ring-2 w-full break-all">
          {number.split("").reverse().join("") || <>&nbsp;</>}
        </div>
      </div>
    </div>
  );
}

function getLevels(maxLevel: number = 1) {
  const list: number[] = [];
  let level = 1;
  let modifier = new Decimal(1);
  let at = new Decimal(0);

  while (level <= maxLevel) {
    modifier = modifier.mul(new Decimal(0.1));
    at = new Decimal(0);

    while (true) {
      at = at.add(modifier);

      if (at.toNumber() < 1) {
        if (!list.includes(at.toNumber())) {
          list.push(at.toNumber());
        }
      } else {
        break;
      }
    }

    level += 1;
  }

  return list;
}
