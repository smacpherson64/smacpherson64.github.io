import { formatDistance } from "date-fns";
import { copySync, ensureDirSync } from "jsr:@std/fs";
import { resolve, dirname } from "jsr:@std/path";
import { SEPARATOR } from "jsr:@std/path/constants";
import { renderToStaticMarkup } from "react-dom/server";

import { getFrontmatter, parse } from "./utils/markdown.ts";
import { getFiles, WalkFileEntry } from "./utils/fs.tsx";

import SitemapTemplate from "./templates/sitemap.tsx";
import MarkdownTemplate from "./templates/markdown.tsx";
import { renderXMLToString } from "./utils/react.tsx";
import { info } from "./utils/console.tsx";

const siteDir = "docs";
const baseUrl = "https://www.sethmac.com";
const skippedFiles = [
  /\/private\//i,
  /\/node_modules\//i,
  /.git$/i,
  /\.lock$/i,
];

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");

function enhance(file: WalkFileEntry) {
  const relativeUrl = file.relativePath
    .replace(/(\.md|\.page.tsx?)$/, ".html")
    .split(SEPARATOR)
    .join("/");

  return {
    ...file,
    // Add urls
    url: [baseUrl, relativeUrl].join(""),
    relativeUrl,

    // Add output location
    output: resolve(siteDir, ...relativeUrl.split("/")),
  };
}

/**
 * Determines if this file is a source file to render or copy.
 */
function isSource(entry: WalkFileEntry) {
  return !entry.path.endsWith(".tsx") || entry.path.endsWith(".page.tsx");
}

function isHTML(file: WalkFileEntry) {
  return file.mediaType === "text/html";
}

if (import.meta.main) {
  ////////////////////////////////
  // #region . Convert sources
  ////////////////////////////////

  const sources = (
    await getFiles("./src", {
      skip: skippedFiles,
    })
  )
    .filter(isSource)
    .map(enhance);

  for (const file of sources) {
    info(`${file.name} -> ${file.relativeUrl}`);
    ensureDirSync(dirname(file.output));

    switch (file.extension) {
      case "md": {
        const content = decoder.decode(Deno.readFileSync(file.path));
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

        Deno.writeFileSync(file.output, encoder.encode(result));
        break;
      }
      case "tsx": {
        const { default: Component } = await import(file.path);
        const result = renderToStaticMarkup(<Component />);
        Deno.writeFileSync(file.output, encoder.encode(result));
        break;
      }
      case "png":
      case "jpg":
      case "svg": {
        copySync(resolve(file.path), file.output, { overwrite: true });
        break;
      }
    }
  }

  ////////////////////////////////
  // #region . html files
  ////////////////////////////////

  const htmlFiles = (
    await getFiles(siteDir, {
      skip: skippedFiles,
    })
  )
    .filter(isHTML)
    .map(enhance);

  ////////////////////////////////
  // #region . Sourcemap
  ////////////////////////////////

  const pages = htmlFiles.map((file) => ({
    ...file,
    lastmod: file.modifiedAt?.toISOString().slice(0, 10),
  }));

  pages.sort((a, b) => a.url.localeCompare(b.url));

  {
    const output = resolve(siteDir, "sitemap.xml");
    const sitemap = renderXMLToString(<SitemapTemplate urls={pages} />);
    Deno.writeFileSync(output, encoder.encode(sitemap));
  }

  {
    const output = resolve(siteDir, "sitemap.html");

    const content = renderToStaticMarkup(
      <nav>
        <ul>
          {pages.map((file) => {
            return (
              <li key={file.url}>
                <div className="flex flex-col gap-1 dark:text-white">
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
              </li>
            );
          })}
        </ul>
      </nav>
    );
    const html = renderToStaticMarkup(
      <MarkdownTemplate>{content}</MarkdownTemplate>
    );

    Deno.writeFileSync(output, encoder.encode(html));
  }
}
