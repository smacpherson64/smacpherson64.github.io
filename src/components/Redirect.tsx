export function Redirect({ url }: { url: string }) {
  return (
    <html
      style={{ backgroundColor: "rgb(31, 31, 30)" }}
      lang="en"
      className="h-full"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{`Redirecting to ${url}`}</title>
        <meta httpEquiv="refresh" content={`0; URL=${url}`} />
        <link rel="canonical" href={url} />
        <link rel="stylesheet" href="/styles.css" />
      </head>

      <body>
        Redirecting to <a href={url}>{url}</a>
      </body>
    </html>
  );
}
