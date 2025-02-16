import { type Static } from "@sinclair/typebox";
import { Type, verify } from "../utils/types.tsx";

const schema = Type.Object({
  urls: Type.Array(
    Type.Object({
      url: Type.String(),
      lastmod: Type.Optional(Type.String()),
      changefreq: Type.Optional(Type.String()),
      priority: Type.Optional(Type.String()),
    })
  ),
});

export default function Template(props: Static<typeof schema>) {
  verify(Template, schema, props);

  return (
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      {props.urls.map(({ url, lastmod, changefreq, priority }) => (
        <url key={url}>
          <loc>{url}</loc>
          {lastmod && <lastmod>{lastmod}</lastmod>}
          {changefreq && <changefreq>{changefreq}</changefreq>}
          {priority && <priority>{priority}</priority>}
        </url>
      ))}
    </urlset>
  );
}
