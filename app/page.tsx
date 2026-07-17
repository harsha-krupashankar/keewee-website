import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Problem from "@/components/Problem";
import FullFunnel from "@/components/FullFunnel";
import WhyKeewee from "@/components/WhyKeewee";
import HowItWorks from "@/components/HowItWorks";
import Proof from "@/components/Proof";
import FreeAudit from "@/components/FreeAudit";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <FullFunnel />
        <WhyKeewee />
        <HowItWorks />
        <Proof />
        <FreeAudit />
        <WhoWeWorkWith />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
