import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function NewsletterAfterHours() {
  return (
    <section className="relative overflow-hidden bg-green py-14 text-paper md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
          backgroundSize: "16px 16px",
        }}
      />
      <Container className="relative z-[2] max-w-[720px]">
        <Reveal className="mb-3.5 font-mono text-xs font-bold uppercase tracking-[1.4px] text-lime">
          // Subscriber exclusive
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mb-5.5 font-display text-[28px] font-extrabold leading-[1.06] tracking-[-0.03em] text-paper sm:text-[36px] lg:text-[42px]">
            Keewee After Hours.
          </h2>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-4">
          <p className="font-body text-base font-medium leading-relaxed text-[#E6F0DB]">
            A few times a year, we send something that never touches the
            regular Thursday schedule. Keewee After Hours carries the
            conversations we usually keep off the record. What a founder told
            us right after a board meeting. Why a launch actually failed.
            Numbers a competitor would rather you not see.
          </p>
          <p className="font-body text-base font-medium leading-relaxed text-[#E6F0DB]">
            It goes out once, only to subscribers, and it&apos;s never
            archived anywhere public. Unsubscribe before one lands and you
            won&apos;t see it again.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
