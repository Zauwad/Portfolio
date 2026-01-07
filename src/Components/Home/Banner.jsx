import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { AtSign } from 'lucide-react';
import { Link } from 'react-router';
import { TbFileStack } from 'react-icons/tb';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SparklesCore } from './SparklesCore';
import { BsArrowDown } from "react-icons/bs";

const Banner = () => {
    const container = useRef();
    const mobileImgRef = useRef();
    const pcImgRef = useRef();

    useEffect(() => {
        const context = gsap.context(() => {
            gsap.from("div", {
                y: 40,
                duration: 0.7,
                delay: 0.3,
                opacity: 0,
                stagger: 0,
            });

            gsap.from(mobileImgRef.current, {
                y: -60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.3,
            });

            gsap.from(pcImgRef.current, {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.3,
            });

            gsap.fromTo(
                ".scroll-arrow",
                { y: 0, opacity: 0 },
                {
                    y: 10,
                    opacity: 1,
                    duration: 1.2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    delay: 1,
                }
            );
        }, container);

        return () => context.revert();
    }, []);

    return (
        <div className="relative min-h-screen bg-black overflow-hidden">
            <SparklesCore className="absolute inset-0" background="#000000" />

            <div className="Hero-Section absolute inset-0 flex flex-col md:flex-row justify-center items-center gap-10 px-4 sm:px-6 md:px-16 pt-24 md:pt-40 pb-20 md:pb-40 border-b border-gray-500">

                {/* Mobile Image */}
                <div ref={mobileImgRef} className="flex justify-center md:hidden">
                    <img
                        className="w-40 h-40 sm:w-56 sm:h-56 rounded-4xl object-cover shadow-sm shadow-white"
                        src="../../../assets/myphoto3.jpg"
                        alt=""
                    />
                </div>

                {/* Text */}
                <div
                    ref={container}
                    className="w-full md:w-1/2 space-y-6 md:space-y-10 px-2 sm:px-4 text-center md:text-left"
                >
                    <div className="upper-part">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Hey, I'm{" "}
                            <span className="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
                                Ridwanul
                            </span>
                        </h1>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            A{" "}
                            <span className="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
                                Web Developer
                            </span>
                        </h1>
                    </div>

                    <div className="text-sm sm:text-base md:text-lg text-gray-300 text-left md:text-left">
                        <p>
                            A <span className="font-bold">full stack developer</span> with hands-on
                            experience in <span className="font-bold">web development</span>.
                            <br />
                            Passionate about writing clean and efficient code
                            with a strong focus on problem-solving and front-end design.
                        </p>
                    </div>

                    {/* Buttons & socials */}
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <button className="btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500 w-full sm:w-auto">
                                <AtSign />
                                <a href="mailto:redwanulazimzawad@gmail.com">Contact Me</a>
                            </button>

                            <Link to="/projects" className="w-full sm:w-auto">
                                <button className="btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500 w-full sm:w-auto">
                                    <TbFileStack size={20} />
                                    <span className="md:hidden inline lg:inline">View</span>
                                    Projects
                                </button>
                            </Link>
                        </div>

                        <div className="hidden sm:block text-3xl">|</div>

                        <div className="flex justify-center sm:justify-start gap-6 md:gap-10">
                            <a href="https://github.com/Zauwad">
                                <FaGithub
                                    className="transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500 rounded-full"
                                    size={32}
                                />
                            </a>
                            <a href="https://www.linkedin.com/in/ridwanul-azim-zawad-513272184/">
                                <FaLinkedin
                                    className="transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500"
                                    size={32}
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* PC Image */}
                <div className="hidden md:flex md:w-1/5 justify-center">
                    <img
                        ref={pcImgRef}
                        className="w-64 h-64 md:w-80 md:h-80 rounded-4xl object-cover shadow-sm shadow-white"
                        src="../../../assets/myphoto3.jpg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
