"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-CA", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/Toronto",
  timeZoneName: "short",
});

// Live local time in Toronto, updated on the minute.
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 15_000);
    return () => clearInterval(id);
  }, []);

  // Server renders nothing; the slot keeps layout stable.
  return (
    <span className="inline-block min-w-[7.5ch] tabular-nums">
      {time ?? "—"}
    </span>
  );
}
