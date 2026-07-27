import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FreeAuditHero from "./FreeAuditHero";
import FreeAuditCover from "./FreeAuditCover";
import FreeAuditForYou from "./FreeAuditForYou";
import FreeAuditDeliverables from "./FreeAuditDeliverables";
import FreeAuditFaq from "./FreeAuditFaq";
import FreeAuditProof from "./FreeAuditProof";
import FreeAuditFinalCta from "./FreeAuditFinalCta";

export default function FreeAuditLayout() {
  return (
    <>
      <Navbar
        minimal
        ctaLabel="Book your free audit"
        ctaHref="mailto:team@keewee.in?subject=Free%20audit%20call"
      />
      <main className="bg-paper">
        <FreeAuditHero />
        <FreeAuditCover />
        <FreeAuditForYou />
        <FreeAuditDeliverables />
        <FreeAuditFaq />
        <FreeAuditProof />
        <FreeAuditFinalCta />
      </main>
      <Footer />
    </>
  );
}
