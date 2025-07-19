/// <reference lib="dom" />

import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import QRCode from "qrcode";

////////////////////////////////
// #region . render
////////////////////////////////

function App() {
  const data = new URLSearchParams(location.search).get("i");

  if (!data) {
    return (
      <form
        method="GET"
        action="/share"
        className="grid place-items-center h-screen w-full p-8"
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="text-to-share" className="text-gray-400 text-xl">
            Share text
          </label>
          <textarea
            id="text-to-share"
            name="i"
            placeholder="Type content to share..."
            className="rounded-2xl sm:rounded-3xl text-xl sm:text-3xl bg-gray-600 text-white p-5 max-w-full"
            rows={5}
            autoFocus
          />
          <button
            type="submit"
            className="rounded-2xl sm:rounded-3xl text-xl sm:text-3xl bg-blue-400 p-4 text-white"
          >
            Link
          </button>
        </div>
      </form>
    );
  }

  const link = location.href;

  return (
    <div className="min-h-[100svh] p-8 flex flex-col gap-8 w-full items-center">
      <div className="break-all break-words w-full whitespace-break-spaces flex-1 grid place-items-center p-2">
        <div className="text-xl sm:text-3xl text-white select-all font-mono text-center p-8">
          {data}
        </div>
      </div>

      <div className="block aspect-square w-full max-w-[320px]">
        <QRCodeCanvas link={link} />
      </div>
    </div>
  );
}

function QRCodeCanvas({ link }: { link: string }) {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<null | string>(null);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    QRCode.toDataURL(
      link,
      {
        width: 320,
        color: {
          dark: "#ddd",
          light: "#1f1f1e",
        },
      },
      (error: Error, url?: string | null) => {
        setImage(url || null);
        setError(error);
        setLoading(false);
      }
    );
  }, [link]);

  if (loading) {
    return null;
  }

  if (error || !image) {
    console.error("An error occurred while generating the QR Code", error);
    return <a href={link}>{link}</a>;
  }

  return (
    <a href={link} className="block">
      <img src={image} className="w-full h-full" />
    </a>
  );
}

createRoot(document.body).render(<App />);
