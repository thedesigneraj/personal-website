import { StoryHero } from "@/components/StoryHero";
import { Concepts, Contact, Footer, Work } from "@/components/Sections";
import { About } from "@/components/About";

export default function Home() {
  return (
    <main>
      <StoryHero />
      <Work />
      <Concepts />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
