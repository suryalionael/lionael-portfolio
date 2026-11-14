const ITEMS = [
  "Data Engineering",
  "Analytics Engineering",
  "Machine Learning",
  "Streaming Pipelines",
  "Internal Software",
  "Geospatial Analysis",
  "Forecasting",
  "Applied Statistics",
];

// A slow, quiet ticker between the hero and the rest of the page.
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {ITEMS.map((item) => (
        <li
          key={item}
          className="flex items-center text-2xl font-medium tracking-tight text-neutral-600 transition-colors duration-500 hover:text-paper md:text-4xl"
        >
          <span className="px-8 md:px-10">{item}</span>
          <span aria-hidden="true" className="text-neutral-700">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="marquee overflow-hidden border-t border-white/[0.06] py-8 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] md:py-10"
      role="region"
      aria-label="Areas of work"
    >
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
