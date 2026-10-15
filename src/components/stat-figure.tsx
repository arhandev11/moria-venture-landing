/**
 * A headline figure as the stat bands set it. When the figure leads with a
 * currency code ("IDR 25M+"), the code is set small on the baseline so the
 * number keeps the width a symbol like "$" would give it and the band's
 * columns stay even. The run stays left-to-right inside Arabic pages.
 */
export function StatFigure({ value }: { value: string }) {
  const coded = /^([A-Z]{3})[\s ]+(.+)$/.exec(value);
  return (
    <bdi dir="ltr" className="whitespace-nowrap">
      {coded ? (
        <>
          <span className="me-[0.12em] text-[0.42em] tracking-normal">{coded[1]}</span>
          {coded[2]}
        </>
      ) : (
        value
      )}
    </bdi>
  );
}
