import { walk, WalkEntry, type WalkOptions } from "jsr:@std/fs/walk";

export function getExtension(filePath: string, otherwise = "txt"): string {
  return filePath.toLocaleLowerCase().split(".").pop() ?? otherwise;
}

export async function getFiles(
  dir: string,
  options: WalkOptions
): Promise<WalkEntry[]> {
  const entries = await Array.fromAsync(walk(dir, options));
  return entries.filter((entry) => entry.isFile);
}

export function isSameContents(
  leftBuffer?: Uint8Array,
  rightBuffer?: Uint8Array
): boolean {
  if (!leftBuffer || !rightBuffer) return false;
  if (leftBuffer.length !== rightBuffer.length) return false;
  return leftBuffer.every((value, index) => value === rightBuffer[index]);
}

export function writeSyncIfChanged(path: string, contents: Uint8Array) {
  const outputContents = maybeReadFileSync(path);
  if (outputContents && isSameContents(contents, outputContents)) return;
  Deno.writeFileSync(path, contents);
}

export function maybeFileStat(path: string): Deno.FileInfo | undefined {
  try {
    return Deno.statSync(path);
  } catch {
    return;
  }
}

export function maybeReadFileSync(path: string) {
  try {
    return Deno.readFileSync(path);
  } catch {
    return;
  }
}

export function removeFileSync(path: string) {
  try {
    Deno.removeSync(path);
  } catch {
    return;
  }
}
