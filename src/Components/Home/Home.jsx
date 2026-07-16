import { Helmet } from "react-helmet";
import Hero from "./Hero";
import About from "./About";
import Stack from "./Stack";
import FeaturedWork from "./FeaturedWork";
import Experience from "./Experience";
import Services from "./Services";
import ContactStrip from "./ContactStrip";

export default function Home() {
  return (
    <div className="relative">
      <Helmet>
        <title>Ridwanul.dev — Full-stack Engineer</title>
        <meta
          name="description"
          content="Ridwanul Azim Zawad — full-stack engineer building considered web platforms with React, Node, and Firebase."
        />
      </Helmet>
      <Hero />
      <About />
      <FeaturedWork />
      <Stack />
      <Experience />
      <Services />
      <ContactStrip />
    </div>
  );
}
