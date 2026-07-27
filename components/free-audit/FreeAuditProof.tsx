import CenteredSectionHeader from "@/components/CenteredSectionHeader";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import type { FreeAuditPage } from "@/sanity/lib/types";

export default function FreeAuditProof({ page }: { page: FreeAuditPage }) {
  if (!page.proofBody && !page.proofHeader) return null;

  return (
    <section className="bg-paper pb-14 pt-2 md:pb-16">
      <Container>
        <CenteredSectionHeader
          header={page.proofHeader}
          className="mx-auto mb-6 max-w-[680px] text-center"
        />
        <Reveal
          delay={80}
          className="flex flex-col items-center rounded-[20px] border-2 border-dashed border-[#DAD3C4] bg-[#FBFAF6] p-11 text-center"
        >
          {page.proofSticker && (
            <span className="mb-3 font-sticker text-2xl tracking-wide text-green">
              {page.proofSticker}
            </span>
          )}
          {page.proofBody && (
            <p className="max-w-[560px] font-body text-base font-medium leading-relaxed text-muted">
              {page.proofBody}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
