import {
  basename,
  dirname,
  fromFileUrl,
  normalize,
  resolve,
} from "jsr:@std/path";
import { SEPARATOR } from "jsr:@std/path/constants";

import { maybeFileStat, getExtension, getFiles } from "./fs.tsx";
import { typeByExtension } from "@std/media-types/type-by-extension";

const basePath = resolve(dirname(fromFileUrl(import.meta.url)), "..", "..");

const siteDir = resolve(basePath, "docs");
const relativePathBase = resolve(basePath, "src");
export const baseUrl = "https://www.sethmac.com";
export const skippedFiles = [
  /\/private\//i,
  /\/node_modules\//i,
  /.git$/i,
  /\.lock$/i,
];

export const xmlSiteMapPath = resolve("./docs/sitemap.xml");
export const htmlSiteMapPath = resolve("./docs/sitemap.html");

function getFileMetadata(path: string | URL) {
  let _path = path instanceof URL ? fromFileUrl(path) : path;
  _path = normalize(_path);
  _path = resolve(_path);

  const name = basename(_path);
  const info = maybeFileStat(_path) || {
    isFile: false,
    isDirectory: false,
    isSymlink: false,
    ctime: null,
  };
  const extension = getExtension(name);
  const mediaType = typeByExtension(extension);

  return {
    path: _path,
    name,
    isFile: info.isFile,
    isDirectory: info.isDirectory,
    isSymlink: info.isSymlink,

    modifiedAt: info.ctime,

    extension,
    mediaType,
  };
}

export function getSiteFileMetadata(path: string | URL) {
  const metadata = getFileMetadata(path);
  const relativePath = metadata.path
    .replace(relativePathBase, "")
    .replace(siteDir, "");

  const relativeUrl = relativePath
    .replace(/(\.md|\.page.tsx?)$/, ".html")
    .replace(/(\.md|\.pdf.tsx?)$/, ".pdf")
    .split(SEPARATOR)
    .join("/");

  return {
    ...metadata,

    // Add urls
    url: [baseUrl, relativeUrl].join(""),
    relativeUrl,

    // Add output location
    output: resolve(siteDir, ...relativeUrl.split("/")),
  };
}

export type Page = {
  lastmod?: string;
  url: string;
  changefreq?: string;
  priority?: string;
  modifiedAt?: Date | null;
};

export async function getPages(): Promise<Page[]> {
  const pages = (
    await getFiles(siteDir, {
      skip: skippedFiles,
    })
  )
    .filter((file) => file.path.endsWith("html"))
    .map((file) => getSiteFileMetadata(file.path))
    .map((file) => ({
      ...file,
      lastmod: file.modifiedAt?.toISOString().slice(0, 10),
    }));

  pages.sort((a, b) => a.url.localeCompare(b.url));

  return pages;
}
