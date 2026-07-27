import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "./AboutHero";
import AboutWhatWeAre from "./AboutWhatWeAre";
import AboutFoundingStory from "./AboutFoundingStory";
import AboutTeam from "./AboutTeam";
import AboutTalkToTeam from "./AboutTalkToTeam";

export default function AboutLayout() {
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <AboutHero />
        <AboutWhatWeAre />
        <AboutFoundingStory />
        <AboutTeam />
        <AboutTalkToTeam />
      </main>
      <Footer />
    </>
  );
}
