import React from "react";

export default function Page() {
  return (
    <html
      style={{ backgroundColor: "rgb(31, 31, 30)" }}
      lang="en"
      className="h-full"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ico generator | sethmac.com</title>
        <link rel="stylesheet" href="/styles.css" />
        <script src="./ico.client.js" defer async />
      </head>

      <body className="bg-gradient-to-br from-gray-950 to-slate-800 min-h-screen text-white" />
    </html>
  );
}
