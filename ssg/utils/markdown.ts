import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkPrism from "remark-prism";
import remarkDirective from "remark-directive";
import remarkDeflist from "remark-deflist";
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";
import { unified } from "unified";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkHtml from "remark-html";
import { githubDirectivesToHtml } from "./remark-plugins/github-directives-to-html.tsx";

export function getFrontmatter(markdown: string): {
  [key: string]: string | string[] | undefined;
} {
  const result = remark()
    .use(remarkFrontmatter, ["yaml", "toml"])
    .use(remarkParseFrontmatter)
    .processSync(markdown);

  return (result.data?.frontmatter as any) ?? {};
}

export function parse(markdown: string) {
  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkPrism, { plugins: ["line-numbers"] })
    .use(remarkHtml, { sanitize: false })
    .use(remarkGithubAdmonitionsToDirectives)
    .use(githubDirectivesToHtml)
    .use(remarkDirective)
    .use(remarkDeflist)
    .processSync(markdown);

  return String(file);
}
