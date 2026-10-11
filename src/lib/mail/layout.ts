/**
 * The brand shell every email shares. Mail clients ignore stylesheets and
 * most layout CSS, so this is tables and inline styles only; Figtree shows
 * where the reader has it, Arial everywhere else.
 */

const FONT = "Figtree, Arial, Helvetica, sans-serif";
const INDIGO = "#383189";
const GOLD = "#fcc228";
const INK = "#201f22";
const MUTED = "#4a4a52";

/** For every value a person typed. Quotes too, since some land in attributes. */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escaped, with the sender's line breaks kept. */
export function escapeMultiline(value: string) {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br>");
}

export function heading(text: string) {
  return `<h1 style="margin:0 0 16px;font-family:${FONT};font-size:22px;line-height:30px;font-weight:700;color:${INDIGO};">${escapeHtml(text)}</h1>`;
}

/** Trusted markup only: callers escape what they put inside. */
export function paragraph(html: string) {
  return `<p style="margin:0 0 16px;font-family:${FONT};font-size:15px;line-height:24px;color:${INK};">${html}</p>`;
}

/** A bulleted list of plain-text items, escaped here. */
export function list(items: string[]) {
  const body = items
    .map((item) => `<li style="margin:0 0 4px;font-family:${FONT};font-size:15px;line-height:22px;font-weight:600;color:${INK};">${escapeHtml(item)}</li>`)
    .join("");
  return `<ul style="margin:0 0 20px;padding:0 0 0 20px;">${body}</ul>`;
}

/** A small indigo label over the block that follows it. */
export function label(text: string) {
  return `<p style="margin:0 0 8px;font-family:${FONT};font-size:13px;line-height:18px;font-weight:700;color:${INDIGO};">${escapeHtml(text)}</p>`;
}

/** A label/value table. Values are plain text and escaped here. */
export function details(rows: [label: string, value: string][]) {
  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;font-family:${FONT};font-size:13px;line-height:20px;font-weight:600;color:${MUTED};vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>` +
        `<td style="padding:8px 0;font-family:${FONT};font-size:15px;line-height:22px;color:${INK};vertical-align:top;">${escapeMultiline(value)}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 16px;border-top:1px solid #e6e4ee;border-collapse:collapse;">${body}</table>`;
}

export function button(href: string, label: string) {
  return `<p style="margin:8px 0 16px;"><a href="${escapeHtml(href)}" style="display:inline-block;padding:11px 20px;border-radius:6px;background:${INDIGO};font-family:${FONT};font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">${escapeHtml(label)}</a></p>`;
}

/** Wraps the body in the shell: wordmark, gold rule, white card, footer note. */
export function layout({ title, body, footer }: { title: string; body: string; footer?: string }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f3f8;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3f8;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:8px;">
<tr><td style="padding:28px 32px 0;">
<p style="margin:0;font-family:${FONT};font-size:13px;line-height:18px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${INDIGO};">Moria Ventures</p>
<div style="margin:14px 0 0;width:48px;height:3px;background:${GOLD};font-size:0;line-height:0;">&nbsp;</div>
</td></tr>
<tr><td style="padding:24px 32px 16px;">
${body}
</td></tr>
</table>
<p style="margin:16px 0 0;max-width:560px;font-family:${FONT};font-size:12px;line-height:18px;color:${MUTED};">${footer ? `${footer}<br>` : ""}PT Moria Ventures Capital</p>
</td></tr>
</table>
</body>
</html>`;
}
