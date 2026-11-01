import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import Blog from '../components/Blog';
import LatestDaily from '../components/daily/LatestDaily';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Blog />
      <LatestDaily />
      <Contact />
    </>
  );
};

export default Home;
