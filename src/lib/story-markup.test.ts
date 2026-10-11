import assert from "node:assert/strict";
import { test } from "node:test";
import { parseInline, parseStoryBody, type Inline } from "./story-markup";

/** The hrefs of every link in a run, nested ones included. */
const hrefs = (nodes: Inline[]): string[] =>
  nodes.flatMap((n) => (n.type === "link" ? [n.href, ...hrefs(n.children)] : n.type === "bold" ? hrefs(n.children) : []));

test("blocks: paragraphs, kept line breaks, headings and one list from - and * lines", () => {
  const blocks = parseStoryBody("First line\nsecond line\n\n## Heading\n\n- one\n* two\n\n\nAfter");
  assert.deepEqual(
    blocks.map((b) => b.type),
    ["paragraph", "heading", "list", "paragraph"],
  );
  const [para, , list] = blocks;
  assert.equal(para.type === "paragraph" && para.lines.length, 2);
  assert.equal(list.type === "list" && list.items.length, 2);
});

test("empty, blank and CRLF input", () => {
  assert.deepEqual(parseStoryBody(""), []);
  assert.deepEqual(parseStoryBody("  \n\n \t\n"), []);
  assert.equal(parseStoryBody("a\r\nb\r\n\r\nc").length, 2);
});

test("bold and links inside a line, bold inside a link", () => {
  assert.deepEqual(parseInline("a **b** [c **d**](https://x.test/p?q=1)"), [
    { type: "text", text: "a " },
    { type: "bold", children: [{ type: "text", text: "b" }] },
    { type: "text", text: " " },
    {
      type: "link",
      href: "https://x.test/p?q=1",
      children: [{ type: "text", text: "c " }, { type: "bold", children: [{ type: "text", text: "d" }] }],
    },
  ]);
});

test("only http and https become links; anything else stays as typed", () => {
  for (const raw of [
    "javascript:alert(1)",
    "JaVaScRiPt:alert(1)",
    "data:text/html,hi",
    "vbscript:x",
    "//evil.test/x",
    "/relative",
    "mailto:a@b.test",
    "not a url",
  ]) {
    const text = `[click](${raw})`;
    const nodes = parseInline(text);
    assert.deepEqual(hrefs(nodes), [], raw);
    assert.deepEqual(nodes, [{ type: "text", text }], raw);
  }
  assert.deepEqual(hrefs(parseInline("[ok](http://a.test) [ok](HTTPS://B.test/x)")), ["http://a.test/", "https://b.test/x"]);
});

test("markup characters and HTML stay text", () => {
  const nodes = parseInline('<script>alert(1)</script><img src=x onerror="y"> ** [x]');
  assert.deepEqual(nodes, [{ type: "text", text: '<script>alert(1)</script><img src=x onerror="y"> ** [x]' }]);
});

test("a link never nests inside another link", () => {
  const walk = (nodes: Inline[], inLink: boolean): boolean =>
    nodes.every((n) => (n.type === "link" ? !inLink && walk(n.children, true) : n.type === "bold" ? walk(n.children, inLink) : true));
  for (const text of [
    "[a [b](https://b.test)](https://a.test)",
    "[**[b](https://b.test)**](https://a.test)",
    "**[a](https://a.test) **[b](https://b.test)****",
  ]) {
    assert.ok(walk(parseInline(text), false), text);
  }
});
