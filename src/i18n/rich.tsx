import { Fragment, type ReactNode } from "react";

/**
 * Renders a dictionary string that carries light mark-up, so a translator can
 * move an emphasised phrase or a line break to wherever their grammar puts it
 * instead of the code fixing the word order.
 *
 * Two forms, never nested: `<b>text</b>` wraps text, `<br/>` stands alone.
 * Each tag name maps to a renderer supplied by the caller; a tag with no
 * renderer is dropped and its text kept, so a typo never shows mark-up.
 *
 *   rich("<b>KNEKS</b>, the National Committee…", {
 *     b: (text) => <span className="font-semibold">{text}</span>,
 *   })
 *
 * No hooks and no client APIs, so it works in Server and Client Components.
 */
export function rich(
  text: string,
  tags: Record<string, (chunk: string) => ReactNode> = {},
): ReactNode {
  const out: ReactNode[] = [];
  const pattern = /<(\w+)>([\s\S]*?)<\/\1>|<(\w+)\s*\/>/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) out.push(text.slice(last, match.index));
    const [, name, chunk, single] = match;
    const render = tags[name ?? single];
    if (render) out.push(<Fragment key={key++}>{render(chunk ?? "")}</Fragment>);
    else if (chunk) out.push(chunk);
    last = pattern.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length === 1 ? out[0] : out;
}

/**
 * Joins a heading kept as separate lines, the way the deck breaks it, with a
 * `<br>` between each. Translations choose their own number of lines.
 *
 * A break given a class is a responsive one (e.g. `hidden sm:block`): where it
 * is hidden the lines run on, so a space follows it to keep the words apart.
 */
export function lines(parts: readonly string[], brClassName?: string): ReactNode {
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 ? <br className={brClassName} /> : null}
      {i > 0 && brClassName ? ` ${part}` : part}
    </Fragment>
  ));
}
