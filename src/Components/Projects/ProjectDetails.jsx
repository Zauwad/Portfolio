import { useParams, Link } from "react-router";
import { projects } from "./ProjectsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CiGlobe } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa6";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="text-center text-white py-20">
        <h2 className="text-3xl font-bold">Project Not Found</h2>
        <Link
          to="/projects"
          className="inline-block text-white font-semibold py-2 px-4 rounded-lg  
          btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500 mt-6"
        >
          <div className="flex justify-center items-center gap-2">
            <FaArrowLeft />
            Back to Projects
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 px-6 md:px-16 py-16 flex flex-col lg:flex-row gap-10">
      {/* LEFT - Back Button + Image Slider */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        {/* 🔹 Back to Projects Button */}
        <Link
          to="/projects"
          className="inline-block text-white font-semibold py-2 px-4 rounded-lg  
          btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500 w-fit"
        >
          <div className="flex justify-center items-center gap-2">
            <FaArrowLeft />
            Back to Projects
          </div>
        </Link>

        <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-4 shadow-xl">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="rounded-lg overflow-hidden"
          >
            {project.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={project.title}
                  className="w-full h-[450px] object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* RIGHT - Details */}
      <div className="w-full lg:w-1/3 space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {project.title}
          </h1>
          <h2 className="text-lg text-gray-400">
            {project.subtitle || "A complete web platform"}
          </h2>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-2">What Is It?</h3>
          <p className="text-gray-300 leading-relaxed">{project.desc}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech, idx) => (
              <span
                key={idx}
                className="bg-gray-800 text-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Difficulty Faced
          </h3>
          <p className="text-gray-300 leading-relaxed">{project.difficulty}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Future Plan
          </h3>
          <p className="text-gray-300 leading-relaxed">{project.futurePlan}</p>
        </div>

        <div className="pt-4">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-white font-semibold py-2 px-4 rounded-lg  
            btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500"
          >
            <div className="flex justify-center items-center gap-2">
              <CiGlobe />
              Visit Project
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
