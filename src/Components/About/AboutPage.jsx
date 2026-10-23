import { Helmet } from "react-helmet";
import About from "../Home/About";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Ridwanul.dev</title>
        <meta
          name="description"
          content="About Ridwanul Azim Zawad — Software Engineer. Background, engineering philosophy, and focus."
        />
      </Helmet>
      <About showTopBorder={false} />
    </>
  );
}
