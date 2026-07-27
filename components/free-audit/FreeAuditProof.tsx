import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function FreeAuditProof() {
  return (
    <section className="bg-paper pb-14 pt-2 md:pb-16">
      <Container>
        <Reveal className="mx-auto mb-6 max-w-[680px] text-center">
          <span className="mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] text-green">
            {"// What people say"}
          </span>
          <h2 className="font-display text-[26px] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[38px]">
            Don&apos;t take our word for it.
          </h2>
        </Reveal>
        <Reveal
          delay={80}
          className="flex flex-col items-center rounded-[20px] border-2 border-dashed border-[#DAD3C4] bg-[#FBFAF6] p-11 text-center"
        >
          <span className="mb-3 font-sticker text-2xl tracking-wide text-green">
            Proof, coming soon
          </span>
          <p className="max-w-[560px] font-body text-base font-medium leading-relaxed text-muted">
            We&apos;re currently working with our first cohort of clients.
            This section will have real words from real people soon.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
