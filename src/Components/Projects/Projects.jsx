import { IoSend } from 'react-icons/io5';
import { RiChatSmile2Fill } from 'react-icons/ri';
import { CiGlobe } from "react-icons/ci";
import { FaInfoCircle } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Fitness Tracker',
      img: '/assets/fitnessTracker.jpg',
      desc: 'A full-stack Fitness Tracker Platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Empowers users to track fitness progress, book trainers, join classes, and engage with a community.',
      link: 'https://fitness-tracker-d03b6.web.app/'
    },
    {
      id: 2,
      title: 'Job Portal',
      img: '/assets/Screenshot (501).png',
      desc: 'JobTrack is an innovative, user-friendly job portal website designed to help job seekers find career opportunities across a wide variety of companies.',
      link: 'https://job-track-by-zawad.netlify.app/'
    },
    {
      id: 3,
      title: 'English Janala',
      img: '/assets/EnglishJanala.jpg',
      desc: 'This platform enables users to track daily care tasks, set reminders, and maintain plant health records.',
      link: 'https://english-janala-by-zawad.netlify.app/'
    },
    {
      id: 4,
      title: 'Plant Care Tracker',
      img: '/assets/Plant-Track.jpg',
      desc: 'This platform enables users to track daily care tasks, set reminders, and maintain plant health records.',
      link: 'https://plant-track-4558e.web.app/'
    },
    {
      id: 5,
      title: 'Find a Doctor',
      img: '/assets/Doctor-phudu.jpg',
      desc: 'This platform enables users to track daily care tasks, set reminders, and maintain plant health records.',
      link: 'https://doc-talk-bd-by-zawad.netlify.app/home'
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
            <div key={i} className="bg-gray-950 text-white shadow-lg rounded-lg overflow-hidden flex flex-col">
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-500 hover:scale-150"
                  src={p.img}
                  alt={p.title}
                />
              </div>

              {/* Details */}
              <div className="p-4 flex-1">
                <h3 className="font-bold text-2xl">{p.title}</h3>
                <p>{p.desc}</p>
              </div>

              {/* Buttons Side by Side */}
              <div className="p-4 flex flex-wrap gap-3 justify-start">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-white font-semibold py-2 px-4 rounded-lg  
                  btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500"
                >
                  <div className='flex justify-center items-center gap-2 '>
                    <CiGlobe />
                    Visit Project
                  </div>
                </a>

                <Link
                  to={`/projects/${p.id}`}
                  className="inline-block text-white font-semibold py-2 px-4 rounded-lg  
                  btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500"
                >
                  <div className='flex justify-center items-center gap-2'>
                    <FaInfoCircle />
                    Project Details
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Second two */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-2">
          {projects.slice(2, 4).map((p, i) => (
            <div key={i} className="bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden flex flex-col">
              <div className="overflow-hidden">
                <img
                  className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-500 hover:scale-150"
                  src={p.img}
                  alt={p.title}
                />
              </div>
              <div className="p-4 flex-1">
                <h3 className="font-bold text-2xl">{p.title}</h3>
                <p>{p.desc}</p>
              </div>
              <div className="p-4 flex flex-wrap gap-3 justify-start">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-white font-semibold py-2 px-4 rounded-lg  
                  btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500"
                >
                  <div className='flex justify-center items-center gap-2'>
                    <CiGlobe />
                    Visit Project
                  </div>
                </a>

                <Link
                  to={`/projects/${p.id}`}
                  className="inline-block text-white font-semibold py-2 px-4 rounded-lg  
                  btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500"
                >
                  <div className='flex justify-center items-center gap-2'>
                    <FaInfoCircle />
                    Project Details
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Third two */}
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-2">
          {/* Project card */}
          <div className="bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <div className="overflow-hidden">
              <img
                className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-500 hover:scale-150"
                src={projects[4].img}
                alt={projects[4].title}
              />
            </div>
            <div className="p-4 flex-1">
              <h3 className="font-bold text-2xl">{projects[4].title}</h3>
              <p>{projects[4].desc}</p>
            </div>
            <div className="p-4 flex flex-wrap gap-3 justify-start">
              <a
                href={projects[4].link}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-white font-semibold py-2 px-4 rounded-lg  
                btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500"
              >
                <div className='flex justify-center items-center gap-2'>
                  <CiGlobe />
                  Visit Project
                </div>
              </a>

              <Link
                to={`/projects/${projects[4].id}`}
                className="inline-block text-white font-semibold py-2 px-4 rounded-lg  
                btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500"
              >
                <div className='flex justify-center items-center gap-2'>
                  <FaInfoCircle />
                  Project Details
                </div>
              </Link>
            </div>
          </div>

          {/* Contact card */}
          <div className="right-side text-center flex items-center justify-center py-8 md:py-0">
            <div className="space-y-3">
              <RiChatSmile2Fill className="mx-auto" size={60} />
              <h1 className="font-bold text-lg md:text-xl">Let's Work Together!</h1>
              <p className="small-text px-4 md:px-0">Have an idea in mind? Let's talk about it.</p>
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
