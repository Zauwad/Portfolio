import React, { useEffect, useRef } from "react";
import { FaLaptopCode, FaBrain, FaHeart, FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-heading", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-heading", start: "top 85%" },
      });

      gsap.from(".about-text p", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: ".about-text", start: "top 80%" },
      });

      gsap.from(".about-icons div", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".about-icons", start: "top 85%" },
      });

      gsap.from(".about-btn", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-btn", start: "top 85%" },
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative bg-black text-gray-300 py-20 px-6 md:px-16 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-5xl w-full">
        {/* Heading */}
        <div className="about-heading text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            A little glimpse into my journey, mindset, and passion.
          </p>
        </div>

        {/* Content */}
        <div className="about-text space-y-6 text-lg leading-relaxed text-left md:text-justify">
          <p>
            Hey there! I’m{" "}
            <span className="font-bold text-white">Ridwanul Azim Zawad</span>{" "}
            currently living in <span className="font-bold">Mirpur</span>. My fascination
            with technology started long before I could even write a line of code —
            whether it was a mobile phone or a computer, I was always curious about how
            things worked behind the screen. That curiosity naturally led me to pursue a{" "}
            <span className="font-bold">Bachelor’s degree in Computer Science</span>,
            where my programming journey truly began.
          </p>

          <p>
            Coding felt like solving puzzles — challenging yet deeply rewarding. About{" "}
            <span className="font-bold">1.5 years</span> into my studies, I wanted to
            explore beyond academic projects and discovered the world of{" "}
            <span className="font-bold text-purple-400">Web Development</span>. I
            instantly fell in love with it and have been building ever since.
          </p>

          <p>
            My{" "}
            <span className="font-bold text-purple-400">
              strongest area is Frontend Development
            </span>
            , where I enjoy bringing designs to life with smooth interactions and elegant
            animations. I’m also steadily expanding my skills into{" "}
            <span className="font-bold">Full-Stack Development</span> to understand the
            complete flow from database to user interface.
          </p>

          <p>
            I’m currently a <span className="font-bold">student</span> and a{" "}
            <span className="font-bold">fast learner</span> who adapts quickly and learns
            from mistakes. I’ve learned how to balance work and study effectively and
            truly enjoy both worlds. When I’m working on projects, I often use tools like{" "}
            <span className="font-bold">ChatGPT, Claude, Copilot,</span> and{" "}
            <span className="font-bold">Cursor</span> — not as a crutch, but as an
            extension of my creativity and productivity.
          </p>

          <p>
            One of my proudest creations is{" "}
            <a
              href="https://fitness-tracker-d03b6.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 underline hover:underline"
            >
              Fitness Tracker
            </a>
            , a full-stack fitness platform featuring authentication, dashboards, Stripe
            payments, and a clean, responsive frontend. This project solidified my
            confidence as a capable developer.
          </p>

          <p>
            Outside of coding, I enjoy exploring new tech trends (and occasionally
            sharing opinions — like how Apple’s “Liquid Glass” design isn’t as
            revolutionary as people think 😄). I’m comfortable working{" "}
            <span className="font-bold">2–3 days a week in a hybrid office</span> setup and
            always open to learning from real-world experiences.
          </p>

          <p className="text-gray-400 italic">
            In short — I’m a passionate developer who loves solving problems, learning
            fast, and building digital experiences that feel intuitive and beautiful.
          </p>
        </div>

        {/* Icons / Highlights */}
        <div className="about-icons mt-12 flex flex-wrap justify-center gap-8 text-center text-sm md:text-base">
          <div className="flex flex-col items-center">
            <FaLaptopCode className="text-purple-400 text-3xl mb-2" />
            <p>Frontend Focused</p>
          </div>
          <div className="flex flex-col items-center">
            <FaBrain className="text-pink-400 text-3xl mb-2" />
            <p>Fast Learner</p>
          </div>
          <div className="flex flex-col items-center">
            <FaUserGraduate className="text-purple-400 text-3xl mb-2" />
            <p>CS Student</p>
          </div>
          <div className="flex flex-col items-center">
            <FaHeart className="text-pink-400 text-3xl mb-2" />
            <p>Passionate About Code</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
