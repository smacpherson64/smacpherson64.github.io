# Headings

# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

---

# Emphasis


**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


---


# Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


---


# Lists

**Unordered**

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

**Ordered**

1. sequential numbers
1. sequential numbers
1. sequential numbers
1. sequential numbers

Start numbering with offset:

57. foo
1. bar


---


# Code

Inline `code`

Syntax highlighting

``` tsx
export type Page = {
  lastmod?: string;
  url: string;
  changefreq?: string;
  priority?: string;
  modifiedAt?: Date | null;
};

function add(...args: number[]) {
  return args.reduce((acc, number) => acc + number, 0)
};

/test/

1 + 1

true

false

let a = "test";
const b = 5;
var c = BigInt(5);

console.log(add(5, 5, 5, 5)); // 20
```

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](https://sethmac.com)

[link with title](https://sethmac.com/ "Title text")

automatic link: https://sethmac.com


## Footnotes

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

---

# Definition lists

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

---

# Custom containers

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

## Math

$$
X = Y * 2
Y = 5
X = 5 * 2
X = 10
$$