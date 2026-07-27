import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function BlogNewsletter() {
  return (
    <section className="pb-2 pt-12">
      <Container>
        <Reveal className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border-soft bg-surface p-8 sm:p-9">
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-[0.09em] text-green">
              Stay in the loop
            </span>
            <h3 className="mt-2 font-display text-xl font-extrabold tracking-[-0.02em] text-ink sm:text-2xl">
              One newsletter every week. No recycled takes.
            </h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <input
              type="email"
              placeholder="your@workemail.com"
              className="w-60 rounded-xl border border-border-soft bg-white px-4 py-3.5 font-body text-sm text-ink outline-none focus:border-green focus:shadow-[0_0_0_3px_rgba(198,240,0,0.35)]"
            />
            <button
              type="button"
              className="whitespace-nowrap rounded-xl bg-green px-6 py-3.5 font-display text-sm font-bold text-white shadow-[3px_3px_0_#1C1B19] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#1C1B19] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px]"
            >
              Subscribe
            </button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
