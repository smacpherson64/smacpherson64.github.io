import { renderToStaticMarkup } from "react-dom/server";

export function renderXMLToString(element: JSX.Element) /* @__PURE__ */ {
  return `<?xml version="1.0" encoding="UTF-8"?>\n${renderToStaticMarkup(
    element
  )}`;
}
