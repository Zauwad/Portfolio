import { IoSend } from 'react-icons/io5';
import { RiChatSmile2Fill } from 'react-icons/ri';
import { CiGlobe } from "react-icons/ci";
import { FaInfoCircle } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Projects = () => {

  const cardsRef = useRef([]);
  cardsRef.current = [];

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const directions = [
      { x: -150, y: 0 },   // left
      { x: 150, y: 0 },    // right
      { x: 0, y: -150 },   // top
      { x: 0, y: 150 },    // bottom
    ];

    cardsRef.current.forEach((card, i) => {
      const dir = directions[i % directions.length];

      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: dir.x,
          y: dir.y,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1,
          delay: i * 0.15,
          ease: "power3.out",
        }
      );
    });
  }, []);

  const projects = [
    {
      id: 1,
      title: 'FitTrack',
      img: '/assets/fitnessTracker.png',
      desc: 'A full-stack Fitness Tracker Platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Empowers users to track fitness progress, book trainers, join classes, and engage with a community.',
      link: 'https://fitness-tracker-d03b6.web.app/'
    },
    {
      id: 2,
      title: 'Plant Pal',
      img: '/assets/Plant-Track.png',
      desc: 'This platform enables users to track daily care tasks, set reminders, and maintain plant health records.',
      link: 'https://plant-track-4558e.web.app/'
    },
    {
      id: 3,
      title: 'Find a Doctor',
      img: '/assets/Doctor-phudu.jpg',
      desc: 'This platform connects patients with verified doctors, allowing appointment booking, online consultation, and access to medical information.',
      link: 'https://doc-talk-bd-by-zawad.netlify.app/home'
    },
    {
      id: 4,
      title: 'English Janala',
      img: '/assets/EnglishJanala.png',
      desc: 'An interactive English learning platform designed to help users improve grammar, vocabulary, and speaking skills through fun exercises and lessons.',
      link: 'https://english-janala-by-zawad.netlify.app/'
    },
    {
      id: 5,
      title: 'NextGenBlog',
      img: '/assets/blog1.png',
      desc: 'This platform is a modern, user-friendly blogging platform built to make content creation and discovery easy and enjoyable',
      link: 'https://job-track-by-zawad.netlify.app/'
    }
  ];

  return (
    <div className="px-4 bg-black md:px-10 lg:px-20 p-4 md:p-10 lg:p-20 space-y-6 md:space-y-8 lg:space-y-10">
      <Helmet>
        <title>Projects</title>
      </Helmet>

      <div className="text-part space-y-2">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl">Projects</h1>
        <p className="small-text">Here you will find a selection of projects I have worked on.</p>
      </div>

      <div className="project-cards relative space-y-3 md:space-y-4 lg:space-y-5">

        {/* First two */}
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-2">
          {projects.slice(0, 2).map((p, i) => (
            <div
              key={i}
              ref={addToRefs}
              className="bg-gray-950 text-white shadow-lg rounded-lg overflow-hidden flex flex-col"
            >
              <div className="overflow-hidden">
                <img className="w-full h-[300px] md:h-[400px] object-cover object-top transition-transform duration-500 hover:scale-150" src={p.img} alt={p.title} />
              </div>

              <div className="p-4 flex-1">
                <h3 className="font-bold text-2xl">{p.title}</h3>
                <p>{p.desc}</p>
              </div>

              <div className="p-4 flex flex-wrap gap-3">
                <a href={p.link} target="_blank" rel="noreferrer"
                  className="btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500">
                  <div className="flex items-center gap-2">
                    <CiGlobe /> Visit Project
                  </div>
                </a>

                <Link to={`/projects/${p.id}`}
                  className="btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500">
                  <div className="flex items-center gap-2">
                    <FaInfoCircle /> Project Details
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Second two */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-2">
          {projects.slice(2, 4).map((p, i) => (
            <div
              key={i}
              ref={addToRefs}
              className="bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden flex flex-col"
            >
              <div className="overflow-hidden">
                <img className="w-full h-[300px] md:h-[400px] object-cover object-top transition-transform duration-500 hover:scale-150" src={p.img} alt={p.title} />
              </div>

              <div className="p-4 flex-1">
                <h3 className="font-bold text-2xl">{p.title}</h3>
                <p>{p.desc}</p>
              </div>

              <div className="p-4 flex flex-wrap gap-3">
                <a href={p.link} target="_blank" rel="noreferrer" className="btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500">
                  <CiGlobe /> Visit Project
                </a>

                <Link to={`/projects/${p.id}`} className="btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500">
                  <FaInfoCircle /> Project Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Third row */}
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-2">

          <div ref={addToRefs} className="bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <img className="w-full h-[300px] md:h-[400px] object-cover object-top transition-transform duration-500 hover:scale-150" src={projects[4].img} alt={projects[4].title} />
            <div className="p-4">
              <h3 className="font-bold text-2xl">{projects[4].title}</h3>
              <p>{projects[4].desc}</p>
            </div>
          </div>

          <div
            ref={addToRefs}
            className="right-side text-center flex items-center justify-center py-8 md:py-0"
          >
            <div className="space-y-3">
              <RiChatSmile2Fill className="mx-auto" size={60} />
              <h1 className="font-bold text-lg md:text-xl">Let's Work Together!</h1>
              <p className="small-text">Have an idea in mind? Let's talk about it.</p>
              <button className="btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500">
                <IoSend />
                <a href="mailto:redwanulazimzawad@gmail.com">Contact Me</a>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Projects;
