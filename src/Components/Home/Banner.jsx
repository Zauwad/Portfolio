import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { AtSign } from 'lucide-react';
import { Link } from 'react-router';
import { TbFileStack } from 'react-icons/tb';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SparklesCore } from './SparklesCore';


const Banner = () => {

    const container = useRef()

    useEffect(() => {
        const context = gsap.context(() => {
            gsap.from("div", {
                y: 40,
                duration: .7,
                delay: .3,
                opacity: 0,
                stagger: 1
            })
        }, container)

        return () => context.revert()
    }, [])


    return (
        <div className="relative h-screen w-screen bg-black overflow-hidden">
            <SparklesCore className="absolute inset-0" background="#000000" />

            {/* Main section: now side-by-side */}
            <div className="Hero-Section absolute inset-0 flex flex-col md:flex-row justify-center gap-10 px-6 md:px-16 pb-20 md:pb-40 pt-20 md:pt-40 border-b border-gray-500 min-h-screen">

                {/* Left side: Text */}
                <div
                    ref={container}
                    className="w-full md:w-1/2 space-y-6 md:space-y-10 px-4 text-center md:text-left"
                >
                    <div className="upper-part">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                            Hey, I'm{' '}
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Ridwanul
                            </span>{' '}
                            ✨
                        </h1>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                            A{' '}
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Web Developer
                            </span>
                        </h1>
                    </div>

                    {/* Bottom part */}
                    <div className="text-base sm:text-lg md:text-xl text-gray-300">
                        <p>
                            A <span className="font-bold">full stack developer</span> with hands-on
                            experience in <span className="font-bold">web development</span>.
                            <br />
                            <span>
                                Passionate about writing clean, efficient, and beginner-friendly code
                                with a strong focus on problem-solving and front-end design.
                            </span>
                        </p>
                    </div>

                    {/* Buttons & socials */}
                    <div className="button-socials gap-4 md:gap-10 flex flex-col sm:flex-row items-center">
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <button className="btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500 w-full sm:w-auto">
                                <AtSign />
                                <a href="mailto:redwanulazimzawad@gmail.com">Contact Me</a>
                            </button>

                            <Link to={'/projects'}>
                                <button className="btn btn-primary bg-black transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500 w-full sm:w-auto">
                                    <TbFileStack size={20}></TbFileStack>
                                    View Projects
                                </button>
                            </Link>
                        </div>

                        <div className="text-3xl hidden sm:block">|</div>

                        <div className="flex gap-6 md:gap-10">
                            <a href="https://github.com/Zauwad">
                                <FaGithub
                                    className="transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500 rounded-full"
                                    size={35}
                                />
                            </a>
                            <a href="https://www.linkedin.com/in/ridwanul-azim-zawad-513272184/">
                                <FaLinkedin
                                    className="transition duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-purple-500"
                                    size={35}
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right side: Image */}
                <div className="w-full md:w-1/2 ">
                    <img
                        className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-lg shadow-purple-500/40"
                        src="../../../assets/per.png"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
