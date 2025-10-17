import React from "react";
import { FaDownload } from "react-icons/fa";

const DownloadResume = () => {
    return (
        <div >
            <a
                href="/Ridwanul_Azim_Resume.pdf"
                download="Ridwanul_Azim_Resume.pdf"
                className="inline-flex items-center gap-2 p-3 text-white bg-black rounded-sm shadow-md hover:bg-gray-700 transition-all duration-300"
            >
                <FaDownload></FaDownload>
                Resume
            </a>
        </div>
    );
};

export default DownloadResume;
