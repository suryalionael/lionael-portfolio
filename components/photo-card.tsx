import Image from "next/image";

export function PhotoCard() {
  return (
    <div className="card-float relative mx-auto w-[280px] md:w-[330px]">
      <div className="rounded-2xl border border-white/[0.12] bg-white/[0.04] p-3 pt-7 shadow-[0_40px_90px_-24px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.03)] backdrop-blur-sm">
        <div
          aria-hidden="true"
          className="absolute top-3 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full border border-white/10 bg-ink/80"
        />
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
          <Image
            src="/assets/lanyard/front.png"
            alt="Studio portrait of Lionael Surya in a black shirt"
            fill
            priority
            sizes="330px"
            quality={95}
            className="object-cover"
          />
        </div>
        <div className="flex items-center justify-between px-1 pt-4 pb-1">
          <div>
            <p className="text-sm font-medium text-paper">Lionael Surya</p>
            <p className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
              Data &amp; software engineering
            </p>
          </div>
          <span className="dot-live size-1.5 shrink-0 rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
}
