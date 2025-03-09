import { visit } from "npm:unist-util-visit";

export function githubDirectivesToHtml() {
  return (
    tree: import("npm:mdast").Root,
    file: import("npm:vfile").VFile
  ): undefined => {
    visit(tree, function (node) {
      console.log({ node });
      if (node.type === "containerDirective") {
        const data = node.data || (node.data = {});
        data.hName = "blockquote";
        data.hProperties = {
          class: [node.name].filter(Boolean).join(" ").toLocaleLowerCase(),
        };
        node.children.unshift({
          type: "paragraph",
          data: { hProperties: { class: "header" } },
          children: [
            {
              type: "text",
              value: node.name,
            },
          ],
        });
      }
    });
  };
}
