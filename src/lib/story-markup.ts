/**
 * The small markup a story body is written in, parsed to plain data the
 * public page turns into elements. Nothing here ever becomes raw HTML: text
 * stays text, and React escapes it like any other string.
 *
 * - A blank line separates paragraphs; single line breaks inside one are kept.
 * - A line starting "## " is a subheading.
 * - Lines starting "- " (or "* ") make a bullet list.
 * - **bold** and [text](https://link) work inside any of them. Only http(s)
 *   links become links; anything else is left as the text that was typed.
 *
 * Pure, so the admin and tests can use it too.
 */

export type Inline =
  | { type: "text"; text: string }
  | { type: "bold"; children: Inline[] }
  | { type: "link"; href: string; children: Inline[] };

export type Block =
  | { type: "paragraph"; lines: Inline[][] }
  | { type: "heading"; children: Inline[] }
  | { type: "list"; items: Inline[][] };

const TOKEN = /\*\*(.+?)\*\*|\[([^\]\n]+)\]\(([^)\s]+)\)/g;

function safeHref(raw: string): string | null {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

/** Bold and links within one line. A link's text may be bold, and bold text may hold a link. */
export function parseInline(text: string, depth = 0): Inline[] {
  const out: Inline[] = [];
  let last = 0;
  const push = (t: string) => {
    if (!t) return;
    const prev = out[out.length - 1];
    if (prev?.type === "text") prev.text += t;
    else out.push({ type: "text", text: t });
  };
  for (const m of text.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    push(text.slice(last, at));
    last = at + m[0].length;
    if (m[1] !== undefined) {
      out.push({ type: "bold", children: depth < 2 ? parseInline(m[1], depth + 1) : [{ type: "text", text: m[1] }] });
      continue;
    }
    const href = safeHref(m[3]);
    if (!href) {
      push(m[0]);
      continue;
    }
    out.push({ type: "link", href, children: depth < 2 ? parseInline(m[2], depth + 1) : [{ type: "text", text: m[2] }] });
  }
  push(text.slice(last));
  return out;
}

/** The body as blocks, in order. Empty and whitespace-only input gives none. */
export function parseStoryBody(body: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flush = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", lines: paragraph.map((l) => parseInline(l)) });
    if (list.length) blocks.push({ type: "list", items: list.map((l) => parseInline(l)) });
    paragraph = [];
    list = [];
  };

  for (const raw of body.replace(/\r\n?/g, "\n").split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
    } else if (line.startsWith("## ")) {
      flush();
      const text = line.slice(3).trim();
      if (text) blocks.push({ type: "heading", children: parseInline(text) });
    } else if (/^[-*] /.test(line)) {
      if (paragraph.length) flush();
      const text = line.slice(2).trim();
      if (text) list.push(text);
    } else {
      if (list.length) flush();
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}
