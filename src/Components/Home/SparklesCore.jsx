"use client";
import React, { useId, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "framer-motion";

export const SparklesCore = ({
  id,
  className = "",
  background = "#0d47a1",
  minSize = 1,
  maxSize = 3,
  speed = 4,
  particleColor = "#ffffff",
  particleDensity = 120,
}) => {
  const [init, setInit] = useState(false);
  const controls = useAnimation();
  const generatedId = useId();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = async () => {
    controls.start({ opacity: 1, transition: { duration: 1 } });
  };

  return (
    <motion.div animate={controls} className={`opacity-0 ${className}`}>
      {init && (
        <Particles
          id={id || generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={{
            background: { color: { value: background } },
            fullScreen: { enable: false, zIndex: 1 },
            fpsLimit: 120,
            interactivity: {
              events: { onClick: { enable: true, mode: "push" }, resize: true },
              modes: { push: { quantity: 4 } },
            },
            particles: {
              color: { value: particleColor },
              move: {
                enable: true,
                speed: { min: 0.1, max: 1 },
                direction: "none",
                outModes: { default: "out" },
              },
              number: {
                density: { enable: true, area: 800 },
                value: particleDensity,
              },
              opacity: {
                value: { min: 0.1, max: 1 },
                animation: { enable: true, speed },
              },
              size: { value: { min: minSize, max: maxSize } },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};
