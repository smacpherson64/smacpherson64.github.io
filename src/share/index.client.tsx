/// <reference lib="dom" />

import { createRoot } from "react-dom/client";

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

  return (
    <pre className="grid place-items-center h-screen text-3xl text-white select-all">
      {data}
    </pre>
  );
}

createRoot(document.body).render(<App />);
