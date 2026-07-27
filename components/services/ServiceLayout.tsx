import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { ServiceDoc } from "@/lib/service-data";
import ServiceHero from "./ServiceHero";
import ServiceProblem from "./ServiceProblem";
import ServiceOfferings from "./ServiceOfferings";
import ServiceDifferently from "./ServiceDifferently";
import ServiceTestimonial from "./ServiceTestimonial";
import ServiceFaq from "./ServiceFaq";
import ServiceQuoteForm from "./ServiceQuoteForm";
import ServiceTalkToUs from "./ServiceTalkToUs";

export default function ServiceLayout({ doc }: { doc: ServiceDoc }) {
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <ServiceHero doc={doc} />
        <ServiceProblem doc={doc} />
        <ServiceOfferings doc={doc} />
        <ServiceDifferently doc={doc} />
        <ServiceTestimonial doc={doc} />
        <ServiceFaq doc={doc} />
        <ServiceQuoteForm doc={doc} />
        <ServiceTalkToUs doc={doc} />
      </main>
      <Footer />
    </>
  );
}
