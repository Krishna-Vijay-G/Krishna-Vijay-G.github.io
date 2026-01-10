import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { SettingsPanel } from '@/components/layout/SettingsPanel';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Certifications } from '@/components/sections/Certifications';
import { Volunteering } from '@/components/sections/Volunteering';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Certifications />
        <Volunteering />
        <Contact />
      </main>
      <Footer />
      <SettingsPanel />
    </>
  );
}
