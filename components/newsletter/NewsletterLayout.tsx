import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterHero from "./NewsletterHero";
import NewsletterWhySubscribe from "./NewsletterWhySubscribe";
import NewsletterWhatYouGet from "./NewsletterWhatYouGet";
import NewsletterAfterHours from "./NewsletterAfterHours";
import NewsletterFinalCta from "./NewsletterFinalCta";

export default function NewsletterLayout() {
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <NewsletterHero />
        <NewsletterWhySubscribe />
        <NewsletterWhatYouGet />
        <NewsletterAfterHours />
        <NewsletterFinalCta />
      </main>
      <Footer />
    </>
  );
}
