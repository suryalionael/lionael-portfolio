// Section heading whose words rise into place when scrolled into view.
// The reveal trigger lives in components/ambient.tsx ([data-reveal]).
export function SplitHeading({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <h2 data-reveal className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} aria-hidden="true">
          <span className="split-word">
            <span style={{ "--w": i } as React.CSSProperties}>{word}</span>
          </span>{" "}
        </span>
      ))}
    </h2>
  );
}
