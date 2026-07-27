import Container from "@/components/Container";

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-paper pb-14 pt-16 sm:pb-16 sm:pt-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: "radial-gradient(#1C1B19 1.3px, transparent 1.7px)",
          backgroundSize: "17px 17px",
        }}
      />
      <div
        className="pointer-events-none absolute -right-6 top-6 select-none font-display text-[190px] font-extrabold leading-[0.8] tracking-[-0.04em] text-transparent"
        style={{
          WebkitTextStroke: "2px #E1DACB",
          transform: "rotate(-4deg)",
        }}
      >
        *
      </div>
      <div className="pointer-events-none absolute bottom-9 left-6 z-[1] animate-spin-slow text-2xl text-green sm:left-16">
        ✱
      </div>

      <Container className="relative z-[3] flex flex-col items-center text-center">
        <div className="mb-5.5 inline-flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-1.5 shadow-[0_6px_18px_rgba(28,27,25,0.05)]">
          <span className="h-2 w-2 rounded-full bg-green" />
          <span className="font-display text-xs font-bold uppercase tracking-[0.09em] text-green">
            The Keewee blog
          </span>
        </div>
        <h1 className="mb-5 max-w-[800px] font-display text-[40px] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink sm:text-[54px] lg:text-[68px]">
          Marketing blog{" "}
          <span className="relative z-0 inline-block">
            <span className="absolute inset-x-[-8px] bottom-1.5 z-[-1] h-[34%] -rotate-1 rounded bg-lime" />
            goldmine!
          </span>
        </h1>
        <p className="max-w-[660px] font-body text-lg font-medium leading-relaxed text-body sm:text-[19px]">
          Literally the best content on B2B SaaS marketing. Positioning, SEO,
          demand gen, paid media, conversion, and everything in between.
          Written by the people doing the work, not summarizing someone
          else&apos;s newsletter.
        </p>
      </Container>
    </section>
  );
}
