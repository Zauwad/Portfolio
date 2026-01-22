import React, { useState, useEffect, useRef } from "react";
import { FaDownload, FaEye } from "react-icons/fa";

const DownloadResume = () => {
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef();

  // Handle clicks outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // mobile touch
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleTap = (e) => {
    if (window.innerWidth < 768) {
      e.preventDefault(); // prevent auto-download
      setShowOptions((prev) => !prev);
    }
  };

  return (
    <div ref={containerRef} className="flex group select-none relative border border-[#c4c4c4] rounded-sm btn btn-primary items-center justify-center shadow-[0_0_40px_20px_rgba(255,255,255,0.6)] transition duration-300 ">
      <div
        className="inline-flex items-center gap-2 text-white bg-black rounded-sm shadow-md transition-all duration-300 group-hover:bg-gray-950 overflow-hidden relative"
        onClick={handleTap}
      >
        {/* Default Label */}
        <div
          className={`flex items-center gap-2 transition-all duration-300 ${
            showOptions ? "opacity-0" : "group-hover:opacity-0"
          }`}
        >
          <FaDownload />
          <span>Resume</span>
        </div>

        {/* Hover/Tap Options */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 ${
            showOptions ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <a
            href="/Ridwanul_Azim_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // prevent toggle
            className="flex items-center gap-1 hover:text-[#6e6e6e]"
          >
            <FaEye />
          </a>

          <span className="text-gray-500">|</span>

          <a
            href="/Ridwanul_Azim_Resume.pdf"
            download="Ridwanul_Azim_Resume.pdf"
            onClick={(e) => e.stopPropagation()} // prevent toggle
            className="flex items-center gap-1 hover:text-[#6e6e6e]"
          >
            <FaDownload />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DownloadResume;
