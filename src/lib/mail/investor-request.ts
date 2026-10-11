import "server-only";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { adminUsers } from "@/db/schema";
import { button, details, escapeHtml, heading, label, layout, list, paragraph } from "@/lib/mail/layout";
import { createMailer, oneLine, readMailConfig, type Mail } from "@/lib/mail/transport";

/**
 * The two emails a stored /kneks access request sets off: a heads-up to every
 * superadmin, and a receipt to the investor. Runs after the response has
 * gone, so it never throws: every failure is logged and swallowed.
 */

export type StoredInvestorRequest = {
  id: number;
  name: string;
  email: string;
  region: string;
  ticket: string;
  message: string;
  /** The published SMEs the investor picked, at least one. */
  shortlist: string[];
  submittedAt: Date;
};

const WIB = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  dateStyle: "medium",
  timeStyle: "short",
});

/** Warn once per process, not once per form submission. */
const warned = new Set<string>();
function warnOnce(message: string) {
  if (warned.has(message)) return;
  warned.add(message);
  console.warn(message);
}

export async function sendInvestorRequestEmails(request: StoredInvestorRequest, site: string | null) {
  const config = readMailConfig();
  if ("error" in config) {
    warnOnce(`[mail] ${config.error}; investor request emails are switched off`);
    return;
  }
  if (!site) warnOnce("[mail] APP_URL is not set; team notifications go out without a link to the admin");

  const mailer = createMailer(config);
  const send = async (what: string, mail: Mail) => {
    try {
      await mailer.sendMail(mail);
    } catch (err) {
      console.error(`[mail] failed to send ${what} for investor request ${request.id}`, err);
    }
  };

  let admins: string[] = [];
  try {
    admins = await teamRecipients();
  } catch (err) {
    console.error(`[mail] could not load admin emails for investor request ${request.id}`, err);
  }

  const jobs = [send("investor confirmation", investorConfirmation(request))];
  if (admins.length) jobs.push(send("team notification", teamNotification(request, admins, site)));
  else warnOnce("[mail] no superadmins to notify of investor requests");
  await Promise.all(jobs);
  mailer.close();
}

/**
 * Who hears about a new request: superadmins only. KNEKS users manage the
 * SMEs and are never sent investors' details, so they are left off here
 * rather than filtered out later.
 */
export async function teamRecipients() {
  const rows = await getDb().select({ email: adminUsers.email }).from(adminUsers).where(eq(adminUsers.role, "superadmin"));
  return rows.map((row) => row.email);
}

function teamNotification(r: StoredInvestorRequest, to: string[], site: string | null): Mail {
  const name = oneLine(r.name);
  const link = site ? new URL(`/admin/submissions/${r.id}`, site).href : null;
  const rows: [string, string][] = [
    ["Name", r.name],
    ["Email", r.email],
    ["Region", r.region],
    ["Ticket size", r.ticket],
    ["Submitted", `${WIB.format(r.submittedAt)} WIB`],
    ["Message", r.message || "None"],
  ];

  return {
    to,
    replyTo: { name, address: oneLine(r.email) },
    subject: `New investor access request — ${name}`,
    html: layout({
      title: "New investor access request",
      body:
        heading("New investor access request") +
        paragraph(`${escapeHtml(r.name)} asked for investor access on the KNEKS page. Reply to this email to answer them directly.`) +
        label("SMEs they are interested in") +
        list(r.shortlist) +
        details(rows) +
        (link ? button(link, "Open in admin") : paragraph("Open it in the admin under Submissions.")),
      footer: "Sent to every superadmin of the Moria Ventures site.",
    }),
    text: [
      "New investor access request",
      "",
      "SMEs they are interested in:",
      ...r.shortlist.map((sme) => `- ${sme}`),
      "",
      // The message goes last and on its own lines, so a long one reads as a block.
      ...rows.map(([key, value]) => (key === "Message" ? `${key}:\n${value}` : `${key}: ${value}`)),
      "",
      link ? `Open in admin: ${link}` : "Open it in the admin under Submissions.",
      "",
      "Reply to this email to answer the investor directly.",
    ].join("\n"),
  };
}

/**
 * Echoes back only the choices they made. The message is left out: anyone
 * can type any address into the form, and this keeps free text a stranger
 * wrote out of someone else's inbox (the name, capped at 120 characters and
 * escaped, is the one exception).
 */
function investorConfirmation(r: StoredInvestorRequest): Mail {
  const smes = r.shortlist.join(", ");
  const rows: [string, string][] = [
    ["Region", r.region],
    ["Ticket size", r.ticket],
  ];
  const intro =
    "We have received your request for investor access to the KNEKS SME program. The Moria Ventures team will send you the current SME list and get in touch to set up an intro call.";
  const ignore = "If you did not request access, you can ignore this email.";

  return {
    to: { name: oneLine(r.name), address: oneLine(r.email) },
    subject: "We have received your investor access request",
    html: layout({
      title: "We have received your request",
      body:
        heading(`Thank you, ${r.name}`) +
        paragraph(intro) +
        paragraph(`<strong>SMEs you asked about:</strong> ${escapeHtml(smes)}`) +
        details(rows) +
        paragraph("Warm regards,<br>The Moria Ventures team"),
      footer: escapeHtml(`This email was sent because this address was used on the Moria Ventures KNEKS page. ${ignore}`),
    }),
    text: [
      `Thank you, ${oneLine(r.name)}`,
      "",
      intro,
      "",
      `SMEs you asked about: ${smes}`,
      ...rows.map(([key, value]) => `${key}: ${value}`),
      "",
      "Warm regards,",
      "The Moria Ventures team",
      "",
      "--",
      `This email was sent because this address was used on the Moria Ventures KNEKS page. ${ignore}`,
      "PT Moria Ventures Capital",
    ].join("\n"),
  };
}
