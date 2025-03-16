import {
  getPages,
  getSiteFileMetadata,
  htmlSiteMapPath,
  skippedFiles,
  xmlSiteMapPath,
} from "./utils/site.tsx";
import {
  compileHTMLSitemap,
  compileMarkdown,
  compileTypescript,
  compileXMLSitemap,
} from "./utils/compile.tsx";
import { info } from "./utils/console.tsx";
import { ensureDirSync } from "jsr:@std/fs/ensure-dir";
import { dirname } from "jsr:@std/path/dirname";
import { copySync } from "jsr:@std/fs/copy";
import { parseArgs } from "jsr:@std/cli/parse-args";
import {
  getFiles,
  isSameContents,
  maybeReadFileSync,
  removeFileSync,
  writeSyncIfChanged,
} from "./utils/fs.tsx";

/**
 * Directly invoked from CLI
 */
if (import.meta.main) {
  await compileAllSourceFiles();
  await compileSitemaps();

  const { watch } = parseArgs(Deno.args);
  if (!watch) Deno.exit(0);

  const watcher = Deno.watchFs("./src");

  for await (const event of watcher) {
    const fileName = event.paths[0];

    switch (event.kind) {
      case "create":
      case "modify": {
        await compileSourceFile(fileName);
        await compileSitemaps();
        continue;
      }

      case "remove": {
        await removeOutputFile(fileName);
        await compileSitemaps();
        continue;
      }
    }
  }
}

// -----------------------------
// #region ...
// -----------------------------

async function compileSitemaps() {
  const pages = await getPages();
  writeSyncIfChanged(xmlSiteMapPath, compileXMLSitemap(pages));
  writeSyncIfChanged(htmlSiteMapPath, compileHTMLSitemap(pages));
}

async function compileSourceFile(file: string): Promise<void> {
  const metadata = getSiteFileMetadata(file);

  info(`␜ ${metadata.relativeUrl}`);
  ensureDirSync(dirname(metadata.output));

  switch (metadata.extension) {
    case "md": {
      if (!metadata.path.endsWith(`.page.${metadata.extension}`)) return;
      writeSyncIfChanged(metadata.output, compileMarkdown(metadata.path));
      break;
    }

    case "tsx":
    case "js": {
      if (!metadata.path.endsWith(`.page.${metadata.extension}`)) return;
      writeSyncIfChanged(
        metadata.output,
        await compileTypescript(metadata.path)
      );
      break;
    }

    case "png":
    case "jpg":
    case "svg": {
      const outputContents = maybeReadFileSync(metadata.output);
      const contents = Deno.readFileSync(metadata.path);
      if (isSameContents(contents, outputContents)) return;
      copySync(metadata.path, metadata.output, { overwrite: true });
      break;
    }
  }
}

async function compileAllSourceFiles() {
  const sources = await getFiles("./src", {
    skip: skippedFiles,
  });

  for (const source of sources) {
    await compileSourceFile(source.path);
  }
}

function removeOutputFile(file: string): void {
  const metadata = getSiteFileMetadata(file);
  info(`␡ ${metadata.relativeUrl}`);
  removeFileSync(metadata.output);
}
