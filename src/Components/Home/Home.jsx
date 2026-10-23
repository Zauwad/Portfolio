import { Helmet } from "react-helmet";
import Hero from "./Hero";
import About from "./About";
import FeaturedWork from "./FeaturedWork";
import Stack from "./Stack";
import Experience from "./Experience";
import Services from "./Services";

export default function Home() {
  return (
    <div className="relative">
      <Helmet>
        <title>Ridwanul.dev — Software Engineer</title>
        <meta
          name="description"
          content="Ridwanul Azim Zawad — software engineer building platforms with modern tech stacks"
        />
      </Helmet>
      <Hero />
      <About />
      <FeaturedWork />
      <Stack />
      <Experience />
      <Services />
    </div>
  );
}

