import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import type { ServiceDoc } from "@/lib/service-data";

export default function ServiceTestimonial({ doc }: { doc: ServiceDoc }) {
  return (
    <section className="py-8 md:py-10">
      <Container>
        <Reveal className="flex flex-col items-center rounded-[20px] border-2 border-dashed border-border-line bg-[#FBFAF6] px-8 py-10 text-center">
          <span className="mb-3 font-sticker text-2xl tracking-wide text-green">
            Proof, coming soon
          </span>
          <p className="max-w-[560px] font-body text-base font-medium leading-relaxed text-muted">
            {doc.testimonial}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
