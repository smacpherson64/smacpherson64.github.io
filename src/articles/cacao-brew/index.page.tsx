import App from "./App.tsx";

export default function Page() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Equal Infinity | sethmac.com</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" type="image/png" href="/favicon_128.png" />
      </head>

      <body className="bg-slate-900 text-white/90">
        <App />
      </body>
    </html>
  );
}
