import Image from "next/image";

/**
 * KNEKS's mark. On colour the deck sits it on a white plate; on the site's
 * light ground the plate goes but its box stays, so the mark keeps the same
 * clear space either way.
 */
export function KneksLogo({
  plate = true,
  alt = "KNEKS — Komite Nasional Ekonomi dan Keuangan Syariah",
}: {
  plate?: boolean;
  /** The committee's full name, in the page's language. */
  alt?: string;
}) {
  return (
    <span
      className={`inline-flex h-12 w-[98px] shrink-0 items-center justify-center ${plate ? "bg-white" : ""}`}
    >
      <Image
        src="/assets/kneks/kneks-logo.webp"
        alt={alt}
        width={500}
        height={160}
        className="h-auto w-[76px]"
      />
    </span>
  );
}
