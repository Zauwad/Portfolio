import React from "react";
import { FaDownload, FaEye } from "react-icons/fa";

const DownloadResume = () => {
  return (
    <div className="inline-block group">
      {/* Default (before hover) */}
      <div className="inline-flex  items-center gap-2 p-3 text-white bg-black rounded-sm shadow-md transition-all duration-300 group-hover:bg-gray-950 overflow-hidden relative">
        {/* Normal text */}
        <div className="flex items-center gap-2 transition-all duration-300 group-hover:opacity-0">
          <FaDownload />
          <span>Resume</span>
        </div>

        {/* On hover — Review & Download buttons appear inside same space */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <a
            href="/Ridwanul_Azim_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1  hover:text-purple-400"
          >
            <FaEye />
          </a>
          <span className="text-gray-500">|</span>
          <a
            href="/Ridwanul_Azim_Resume.pdf"
            download="Ridwanul_Azim_Resume.pdf"
            className="flex items-center gap-1 hover:text-purple-400"
          >
            <FaDownload />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DownloadResume;
