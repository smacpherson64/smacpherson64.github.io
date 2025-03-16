import { type Static } from "@sinclair/typebox";
import { verify, Type } from "../utils/types.tsx";

const schema = Type.Object({
  children: Type.String(),
  title: Type.Optional(Type.String()),
});

export default function Template(props: Static<typeof schema>) {
  verify(Template, schema, props);

  const title = [props.title, "sethmac.com"].filter(Boolean).join(" | ");

  return (
    <html lang="en" style={{ backgroundColor: "#0f172a" }} className="h-full">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" type="image/png" href="/favicon_128.png" />
      </head>
      <body className="markdown">
        <div
          dangerouslySetInnerHTML={{ __html: props.children }}
          className="wrapper"
        />
      </body>
    </html>
  );
}
