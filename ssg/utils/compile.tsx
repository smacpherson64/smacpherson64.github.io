import { renderToStaticMarkup } from "react-dom/server";

import { getFrontmatter, parse } from "./markdown.ts";
import { renderXMLToString } from "./react.tsx";
import MarkdownTemplate from "../templates/markdown.tsx";
import SitemapTemplate from "../templates/sitemap.tsx";
import { baseUrl, Page } from "./site.tsx";
import { formatDistance } from "date-fns/formatDistance";

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");

export function compileMarkdown(filePath: string): Uint8Array<ArrayBufferLike> {
  const content = decoder.decode(Deno.readFileSync(filePath));
  const metadata = getFrontmatter(content);

  const result = renderToStaticMarkup(
    <MarkdownTemplate
      title={
        Array.isArray(metadata.title)
          ? metadata.title.join(" ")
          : metadata.title
      }
    >
      {parse(content)}
    </MarkdownTemplate>
  );

  return encoder.encode(result);
}

export async function compileTypescript(
  filePath: string
): Promise<Uint8Array<ArrayBufferLike>> {
  const { default: Component } = await import(filePath);
  const result = renderToStaticMarkup(<Component />);
  return encoder.encode(result);
}

export function compileXMLSitemap(pages: Page[]): Uint8Array<ArrayBufferLike> {
  return encoder.encode(renderXMLToString(<SitemapTemplate urls={pages} />));
}

export function compileHTMLSitemap(pages: Page[]): Uint8Array<ArrayBufferLike> {
  const content = renderToStaticMarkup(
    <nav>
      <ul>
        {pages.map((file) => {
          return (
            <div className="flex flex-col gap-1 dark:text-white" key={file.url}>
              <a href={file.url.replace(baseUrl, "")} className="block">
                {file.url}
              </a>
              <time
                className="text-xs text-slate-400"
                title={file.modifiedAt?.toString()}
              >
                {formatDistance(new Date(), new Date())}
              </time>
            </div>
          );
        })}
      </ul>
    </nav>
  );
  const html = renderToStaticMarkup(
    <MarkdownTemplate>{content}</MarkdownTemplate>
  );

  return encoder.encode(html);
}
