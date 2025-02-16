// eslint-disable-next-line

import { HTMLAttributes, type ReactNode } from "react";

export {};

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * XML Sitemap
       *
       * The entire sitemap
       */
      urlset: { xmlns: string; children: ReactNode; key?: string };

      /**
       * XML Sitemap
       *
       * An individual url entry
       */
      url: { children: ReactNode; key?: string };

      /**
       * XML Sitemap
       *
       * The string location of the url
       */
      loc: { children: string; key?: string };

      /**
       * XML Sitemap
       *
       * Last modified date in format: YYYY-MM-DD
       */
      lastmod: { children: string; key?: string };

      /**
       * XML Sitemap
       *
       * One of: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
       */
      changefreq: {
        children: string;
        key?: string;
      };

      /**
       * XML Sitemap
       *
       * 0.0 through 1.0
       */
      priority: { children: string; key?: string };

      [key: string]: HTMLAttributes<unknown>;
    }
  }
}
