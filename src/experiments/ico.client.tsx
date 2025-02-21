/// <reference lib="dom" />

import JSZip from "jszip";
import { Suspense, use, useEffect, useState, useMemo } from "react";
import { createRoot } from "react-dom/client";

const sizes = [16, 24, 32, 48, 64, 128, 256];

const emojiRanges = [
  [128513, 128591],
  [9986, 10160],
  [128640, 128704],
];

function App() {
  const [emoji, setEmoji] = useState("🤘");

  const emojis = useMemo(
    () =>
      emojiRanges
        .map(expand)
        .flat(1)
        .map((number) => {
          const $emoji = String.fromCodePoint(Number(number));

          return (
            <button
              type="button"
              name="emoji"
              value={number}
              className="border border-slate-700 rounded p-1 bg-white/5 hocus:bg-white/15 cursor-pointer"
              key={number}
              onClick={() => {
                setEmoji($emoji);
              }}
            >
              {$emoji}
            </button>
          );
        }),
    []
  );

  const renderedIconsPromise = useMemo(() => renderIcons(emoji), [emoji]);

  return (
    <>
      <header className="p-8 border-b border-b-slate-800">
        <label className="flex flex-col justify-between md:flex-row gap-4 w-full">
          <div className="text-2xl font-semibold p-4">Emoji to generate</div>

          <Suspense
            fallback={
              <div className="min-h-16 grid place-items-center">loading...</div>
            }
          >
            <Output renderedIconsPromise={renderedIconsPromise} />
          </Suspense>

          <div className="flex justify-center gap-2">
            <input
              id="input"
              className="bg-transparent text-2xl rounded ring ring-slate-800 focus:ring-blue-500 p-4 w-[4em] text-center"
              value={emoji}
              onChange={(event) => {
                const value = event.currentTarget.value || "";
                const firstChar = Array.from(value)[0] || "";
                setEmoji(firstChar);
              }}
            />

            <Suspense
              fallback={
                <div
                  id="link"
                  className="cursor-pointer opacity-30 flex flex-col justify-center items-center text-xs text-center text-white px-4 rounded bg-blue-400 hocus:bg-blue-500"
                  tabIndex={0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
                    />
                  </svg>
                  <span className="text-xs">Download</span>
                </div>
              }
            >
              <DownloadLink renderedIconsPromise={renderedIconsPromise} />
            </Suspense>
          </div>
        </label>

        <div id="fast-icons" className="flex gap-2 flex-wrap mt-8">
          {emojis}
        </div>
      </header>
    </>
  );
}

function DownloadLink({
  renderedIconsPromise,
}: {
  renderedIconsPromise: Promise<{
    iconsLink: string;
    images: Map<number, string>;
  }>;
}) {
  const { iconsLink } = use(renderedIconsPromise);

  return (
    <a
      id="link"
      className="cursor-pointer flex flex-col justify-center items-center text-xs text-center text-white px-4 rounded bg-blue-400 hocus:bg-blue-500"
      download="icons.zip"
      href={iconsLink}
      tabIndex={0}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
        />
      </svg>
      <span className="text-xs">Download</span>
    </a>
  );
}

function Output({
  renderedIconsPromise,
}: {
  renderedIconsPromise: Promise<{
    iconsLink: string;
    images: Map<number, string>;
  }>;
}) {
  const { images } = use(renderedIconsPromise);

  useEffect(() => {
    let link: HTMLLinkElement | null = document.querySelector(
      "link[rel='shortcut icon']"
    );

    if (!link) {
      link = document.createElement("link");
      link.rel = "shortcut icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }

    link.href = images.get(256) || "";
  }, [images]);

  return (
    <>
      <div
        id="images"
        className="flex flex-wrap gap-3 justify-center items-center"
      >
        <img src={images.get(256)} style={{ width: 16, height: 16 }} />
        <img src={images.get(256)} style={{ width: 64, height: 64 }} />
      </div>
    </>
  );
}

////////////////////////////////
// #region . Utils
////////////////////////////////

function expand(range: number[]) {
  const result: number[] = [];
  const [start, end] = range;
  let i = start;

  while (i <= end) {
    result.push(i);
    i++;
  }

  return result;
}

// Create PNG ArrayBuffer from canvas.
function canvasToBlob(
  canvas: HTMLCanvasElement,
  type = "image/png"
): Promise<Blob | null> {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, type);
  });
}

function blobToArrayBuffer(blob: Blob): Promise<Uint8Array> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener("loadend", () => {
      resolve(new Uint8Array(reader.result));
    });

    reader.readAsArrayBuffer(blob);
  });
}

function blobToUrl(blob: Blob, type = "image/png") {
  return URL.createObjectURL(blob, type);
}

async function createImage({
  size,
  content,
  type = "image/png",
}: {
  size: number;
  content: string;
  type?: string;
}) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");

  if (!ctx) return { blob: [], src: "", buffer: new Uint8Array() };
  const unit = size * 0.01;

  ctx.font = `normal ${unit * 80}px monospace`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(content, unit * 10, unit * 10);

  const blob = await canvasToBlob(canvas, type);

  if (!blob) return { blob: [], src: "", buffer: new Uint8Array() };

  const buffer = await blobToArrayBuffer(blob);
  const src = blobToUrl(blob);

  return { src, blob, buffer };
}

async function renderIcons(content: string) {
  const zip = new JSZip();
  const images: Map<number, string> = new Map();

  for (const size of sizes) {
    const { buffer, src } = await createImage({ size, content });

    images.set(size, src);
    zip.file(`favicon_${size}.png`, buffer);
  }

  const { buffer } = await createImage({
    size: 256,
    content,
    type: "image/vnd.microsoft.icon",
  });
  zip.file(`favicon.ico`, buffer);

  const zipBlob = await zip.generateAsync({ type: "blob" });

  return { iconsLink: blobToUrl(zipBlob), images };
}

////////////////////////////////
// #region . render
////////////////////////////////

createRoot(document.body).render(<App />);
