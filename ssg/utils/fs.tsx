import { walk, WalkEntry, type WalkOptions } from "jsr:@std/fs/walk";
import { resolve } from "jsr:@std/path";
import { typeByExtension } from "@std/media-types";

export function getExtension(filePath: string, otherwise = "txt"): string {
  return filePath.toLocaleLowerCase().split(".").pop() ?? otherwise;
}

export type WalkFileEntry = {
  name: string;
  path: string;
  relativePath: string;
  extension: string;
  mediaType?: string;
  createdAt: Date | null;
  modifiedAt: Date | null;
};

export async function getFiles(
  dir: string,
  options: WalkOptions
): Promise<WalkFileEntry[]> {
  const directoryPath = resolve(dir);

  const entries = await Array.fromAsync(walk(dir, options));
  const files = entries.filter((entry) => entry.isFile);
  return files.map(function enhanceFile(entry: WalkEntry) {
    const extension = getExtension(entry.name);
    const mediaType = typeByExtension(extension);
    const stats = Deno.statSync(entry.path);
    const fullPath = resolve(entry.path);
    const relativePath = fullPath.replace(directoryPath, "");

    return {
      name: entry.name,
      path: fullPath,
      relativePath,
      extension,
      mediaType,
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
    };
  });
}
