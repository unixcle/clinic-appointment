import Header from '../components/homePage/header';
import HeroSection from '../components/homePage/heroSection';
import Services from '../components/homePage/services';
import DocIntro from '../components/homePage/docIntro';
import Contact from '../components/homePage/contact';
import Footer from '../components/homePage/footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <Services />
      <DocIntro />
      <Contact />
      <Footer />
    </>
  );
}
