export default function Page() {
  return (
    <html className="bg-slate-700">
      <head>
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div className="grid place-items-center w-full min-h-screen">
          <svg className="stroke-[.03rem] stroke-blue-500 fill-red-500 w-5 h-5">
            <use href="./example.svg#circle"></use>
          </svg>

          <svg className="stroke-[.03rem] stroke-blue-500 fill-red-500 w-16 h-16">
            <use href="./example.svg#circle"></use>
          </svg>

          <svg className="stroke-yellow-500 fill-red-500 w-16 h-16">
            <use href="./example.svg#square"></use>
          </svg>

          <svg className="stroke-blue-500 fill-red-500 [--secondary:var(--color-yellow-500)]  w-7 h-7">
            <use href="./example.svg#two"></use>
          </svg>

          <svg className="fill-red-500 w-7 h-7">
            <use href="./example.svg#splash"></use>
          </svg>
        </div>
      </body>
    </html>
  );
}
