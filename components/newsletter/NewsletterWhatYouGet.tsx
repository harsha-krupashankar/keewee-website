import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { whatYouGet } from "@/lib/newsletter-data";

export default function NewsletterWhatYouGet() {
  return (
    <section className="py-14 md:py-16">
      <Container>
        <Reveal className="mx-auto mb-9 max-w-[680px] text-center">
          <span className="mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] text-green">
            // What you&apos;ll get
          </span>
          <h2 className="font-display text-[28px] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[36px] lg:text-[42px]">
            What&apos;s inside every issue.
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {whatYouGet.map((d, i) => (
            <Reveal
              key={d.title}
              delay={i * 60}
              className="flex flex-col rounded-[18px] border border-green-border bg-green-bg p-6.5 pb-7"
            >
              <h3 className="mb-2.5 font-display text-[19px] font-extrabold leading-tight tracking-[-0.02em] text-ink">
                {d.title}
              </h3>
              <p className="font-body text-[15px] font-medium leading-relaxed text-green-deep">
                {d.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
