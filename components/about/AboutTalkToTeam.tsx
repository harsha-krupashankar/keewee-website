import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function AboutTalkToTeam() {
  return (
    <section className="py-8 md:pb-16 md:pt-10">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[24px] bg-ink px-8 py-12 text-center text-paper shadow-[0_20px_48px_rgba(28,27,25,0.2)] sm:px-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
              backgroundSize: "16px 16px",
            }}
          />
          <span className="relative z-10 mb-4 block font-display text-[13px] font-bold uppercase tracking-[0.09em] text-lime">
            Talk to the team
          </span>
          <h2 className="relative z-10 mx-auto mb-4.5 max-w-[700px] font-display text-[30px] font-extrabold leading-[1.06] tracking-[-0.035em] text-pretty sm:text-[44px] lg:text-[50px]">
            Want to talk to the actual people who&apos;ll do the work?
          </h2>
          <p className="relative z-10 mx-auto mb-7 max-w-[620px] font-body text-base font-medium leading-relaxed text-dark-text">
            No sales rep standing between you and us. Book a free 30-minute
            audit and you&apos;ll get on a call with one of the three of us,
            not someone reading from a script. If you&apos;re not ready for
            that yet, just say hi — we read every email ourselves too.
          </p>
          <div className="relative z-10 flex flex-wrap justify-center gap-3.5">
            <Button
              href="mailto:team@keewee.in?subject=Free%20audit"
              className="px-7 py-4 text-[17px]"
            >
              Book your free audit
            </Button>
            <Button
              href="mailto:team@keewee.in?subject=Hi"
              variant="ghost"
              className="px-7 py-3.5 text-[17px]"
            >
              Say hi instead
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
