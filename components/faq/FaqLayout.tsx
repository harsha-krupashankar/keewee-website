import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqHero from "./FaqHero";
import FaqCategories from "./FaqCategories";
import FaqCta from "./FaqCta";

export default function FaqLayout() {
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <FaqHero />
        <FaqCategories />
        <FaqCta />
      </main>
      <Footer />
    </>
  );
}
