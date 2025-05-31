import { renderToStaticMarkup } from "react-dom/server";
import ReactPDF from "@react-pdf/renderer";
import { type JSX } from "npm:react/jsx-runtime";

export function renderXMLToString(element: JSX.Element) /* @__PURE__ */ {
  return `<?xml version="1.0" encoding="UTF-8"?>\n${renderToStaticMarkup(
    element
  )}`;
}

export function renderPDF(element: JSX.Element) /* @__PURE__ */ {
  return ReactPDF.renderToStream(element);
}
