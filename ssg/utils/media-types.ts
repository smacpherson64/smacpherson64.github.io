import { typeByExtension } from "@std/media-types";

export function getTypeByExtension(extension: string): string {
  const contentType = typeByExtension(extension);

  if (contentType) return contentType;

  switch (extension) {
    case ".tsx":
      return "application/x-typescript";
    default:
      return "text/plain";
  }
}
