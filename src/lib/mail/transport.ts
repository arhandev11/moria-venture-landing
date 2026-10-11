import nodemailer, { type SendMailOptions } from "nodemailer";

/**
 * SMTP from the environment, and nothing else: no credentials live in the
 * repo. Kept free of `server-only` so `npm run mail:test` can import it as
 * plain TS outside Next.
 *
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM
 *
 * Without SMTP_HOST mail is switched off, so local dev and `next build` work
 * with no mail server at all.
 */

export const DEFAULT_FROM = "Moria Ventures <no-reply@moriaventures.com>";

export type MailConfig = {
  host: string;
  port: number;
  /** Implicit TLS from the first byte (port 465), as opposed to STARTTLS. */
  secure: boolean;
  user?: string;
  pass?: string;
  from: string;
};

/** The config, or a reason it is unusable. */
export function readMailConfig(env: NodeJS.ProcessEnv = process.env): MailConfig | { error: string } {
  const host = env.SMTP_HOST?.trim();
  if (!host) return { error: "SMTP_HOST is not set" };

  const flag = env.SMTP_SECURE?.trim().toLowerCase();
  const rawPort = env.SMTP_PORT?.trim();
  const port = rawPort ? Number(rawPort) : flag === "false" || flag === "0" ? 587 : 465;
  if (!Number.isInteger(port) || port < 1 || port > 65535) return { error: `SMTP_PORT "${rawPort}" is not a port` };
  // Unset means "whatever the port implies": 465 is SSL, anything else STARTTLS.
  const secure = flag ? flag === "true" || flag === "1" : port === 465;

  return {
    host,
    port,
    secure,
    user: env.SMTP_USER?.trim() || undefined,
    pass: env.SMTP_PASS || undefined,
    from: oneLine(env.MAIL_FROM ?? "") || DEFAULT_FROM,
  };
}

export function createMailer(config: MailConfig) {
  return nodemailer.createTransport(
    {
      host: config.host,
      port: config.port,
      secure: config.secure,
      // On a non-SSL port, refuse to send credentials in the clear.
      requireTLS: !config.secure && !!config.user,
      auth: config.user ? { user: config.user, pass: config.pass } : undefined,
      // Nodemailer waits minutes by default; a dead server should fail fast.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 30_000,
    },
    { from: config.from },
  );
}

export type Mail = SendMailOptions & { subject: string; html: string; text: string };

/** CR and LF are what header injection needs; anything bound for a header loses them. */
export function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}
