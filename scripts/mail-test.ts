/**
 * Sends one test email with the app's SMTP settings, to check them without
 * submitting the form.
 *
 *   npm run mail:test -- you@example.com
 *
 * Reads .env, then .env.local (which wins), whichever exist; variables
 * already in the environment beat both. With the settings in another file:
 *
 *   npx tsx --env-file=/path/to/env scripts/mail-test.ts you@example.com
 */
import { button, heading, layout, paragraph } from "../src/lib/mail/layout";
import { createMailer, readMailConfig } from "../src/lib/mail/transport";

async function main() {
  const to = process.argv[2];
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    throw new Error("Usage: npm run mail:test -- you@example.com");
  }
  const config = readMailConfig();
  if ("error" in config) throw new Error(config.error);

  const where = `${config.host}:${config.port} (${config.secure ? "SSL" : "STARTTLS when offered"})`;
  console.log(`sending from ${config.from} via ${where}${config.user ? ` as ${config.user}` : ""}`);

  const mailer = createMailer(config);
  try {
    await mailer.verify();
    const site = process.env.APP_URL?.trim();
    const info = await mailer.sendMail({
      to,
      subject: "Moria Ventures test email",
      html: layout({
        title: "Test email",
        body:
          heading("SMTP works") +
          paragraph(`This test came from the Moria Ventures site via ${where}.`) +
          (site ? button(site, "Open the site") : ""),
      }),
      text: `SMTP works\n\nThis test came from the Moria Ventures site via ${where}.${site ? `\n\n${site}` : ""}`,
    });
    console.log(`sent: ${info.messageId} (${info.response})`);
  } finally {
    mailer.close();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
