import { track } from "@vercel/analytics";

/** Custom events the site reports. Names are stable; don't rename casually. */
type EventProps = {
  resume_download: { resume: string; role: string };
  role_select: { role: string };
  palette_open: Record<string, never>;
};

export function report<N extends keyof EventProps>(name: N, props: EventProps[N]) {
  track(name, props);
}
