import Image from "next/image";

/** KNEKS's mark on the white plate it always sits on in the deck. */
export function KneksLogo() {
  return (
    <span className="inline-flex h-12 w-[98px] shrink-0 items-center justify-center bg-white">
      <Image
        src="/assets/kneks/kneks-logo.webp"
        alt="KNEKS — Komite Nasional Ekonomi dan Keuangan Syariah"
        width={500}
        height={160}
        className="h-auto w-[76px]"
      />
    </span>
  );
}
