import React, { useState } from 'react';
import { Link } from 'react-router';
import { AtSign } from 'lucide-react';
import { TbFileStack } from 'react-icons/tb';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GoProjectSymlink } from 'react-icons/go';
import Banner from './Banner';
import emailjs from "emailjs-com";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import AboutMe from './AboutMe';



const Home = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .send(
                "service_md9oohj",    // Replace with EmailJS service ID
                "template_ie5m0li",   // Replace with EmailJS template ID
                formData,
                "7lnSEaRpD7r7YXs3J"     // Replace with EmailJS public key
            )
            .then(
                () => {
                    Swal.fire({
                        icon: "success",
                        title: "Message Sent!",
                        text: "Thanks for reaching out — I'll get back to you soon.",
                        confirmButtonColor: "#8b5cf6", // matches purple accent
                    });
                    setFormData({ email: "", subject: "", message: "" });
                },
                (error) => {
                    alert("❌ Failed to send message: " + error.text);
                }
            );
    };


    const [formData, setFormData] = useState({
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };


    return (
        <div >
            <Helmet>
                <title>Ridwanul</title>
            </Helmet>

            <Banner></Banner>


            {/* Experiences */}
            <div className='bg-black'>
                <div data-aos="fade-up"
                    data-aos-duration="3000" className="Experiences px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 space-y-6 md:space-y-10 py-10 md:py-20">
                    <div className='space-y-3 text-center md:text-left'>
                        <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl'>Building Digital Experiences</h1>
                        <p className='font-light text-lg'>I specialize in creating clean, efficient code and dynamic web interfaces that stand out.</p>
                    </div>

                    <div className='Cards flex flex-col lg:flex-row gap-6 md:gap-10'>
                        <div className="first-card border border-gray-500 p-6 md:p-10 space-y-5 rounded-2xl w-full lg:w-[40%] transition duration-300 hover:scale-110 shadow-md hover:shadow-lg ">
                            <h1 className='font-bold text-xl sm:text-2xl md:text-3xl'>What I Can Do</h1>
                            <p className='text-gray-400 text-lg'>I can help develop solutions that will help you grow your business:</p>

                            <ul className='list-disc mx-4 md:mx-8  font-bold space-y-1  md:text-base'>
                                <li className='text-lg'>Full-stack Web Development
                                </li>
                                <li className='text-lg'>Database Design
                                </li>
                                <li className='text-lg'>JavaScript & CSS Expertise
                                </li>
                                <li className='text-lg'>Dynamic Web Interfaces
                                </li>
                                <li className='text-lg'>API Integration
                                </li>
                            </ul>
                        </div>

                        <div className="Second-card border border-gray-500 p-6 md:p-10 space-y-5 rounded-2xl w-full lg:w-[40%] transition duration-300 hover:scale-110 shadow-md hover:shadow-lg ">
                            <h1 className='font-bold text-xl sm:text-2xl md:text-3xl'>Tools I Use</h1>
                            <p className='text-gray-400 text-lg'>I use the latest tools and technologies to build functional and scalable projects:</p>

                            <ul className='list-disc mx-4 md:mx-8 md:text-base '>
                                <li className='font-bold text-lg'>Frontend:
                                    <p className='small-text textsm font-normal'>React Js, Next Js, JavaScript, Typescript, Tailwind CSS </p>
                                </li>
                                <li className='font-bold text-lg'>Backend:
                                    <p className='small-text font-normal'>
                                        Node.js, Express.js, Rest API
                                    </p>
                                </li>
                                <li className='font-bold text-lg'>Database:
                                    <p className='small-text font-normal'>
                                        Firebase, MongoDB
                                    </p>
                                </li>
                                {/* <li className='font-bold'>Tools:
                                <p className='small-text'>
                                    Git, VS Code, Chrome DevTools
                                </p>
                            </li> */}
                            </ul>
                        </div>


                        <div className="Third-card border border-gray-500 p-6 md:p-10 space-y-5 rounded-2xl w-full lg:w-[40%] transition duration-300 hover:scale-110 shadow-md hover:shadow-lg ">
                            <h1 className='font-bold text-xl sm:text-2xl md:text-3xl'>UI/UX Design</h1>
                            <p className='text-gray-400 text-lg'>I can help design clean and modern interfaces:</p>

                            <ul className='list-disc mx-4 md:mx-8 font-bold space-y-1 text-sm md:text-base'>
                                <li className='text-lg'>User-Centered Design</li>
                                <li className='text-lg'>Modern & Clean UI
                                </li>
                                <li className='text-lg'>Responsive Layouts
                                </li>
                                <li className='text-lg'>Client-Focused Solutions
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="my-projects flex justify-center md:justify-end">
                        <Link to={'/projects'}>
                            <button className='btn btn-primary transition duration-300 bg-black w-full sm:w-auto'>
                                <GoProjectSymlink size={20}></GoProjectSymlink>
                                View My Projects</button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* <AboutMe></AboutMe> */}


            {/* Connect w me */}
            <div className="bg-black">
                <div
                    data-aos="fade-up"
                    data-aos-duration="3000"
                    className="contact-form flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32 xl:px-50 gap-10 md:gap-20  p rounded-2xl md:rounded-4xl py-10 md:py-30"
                >
                    <div className="left-side space-y-5 text-center lg:text-left">
                        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl">
                            Bringing Your Ideas Into Life.
                        </h1>
                        <p className="font-bold text-base sm:text-lg md:text-xl">
                            Have an idea in mind or want to connect? Let's Connect!
                        </p>
                    </div>

                    <div className="Right-side outline-1 rounded-2xl form w-full lg:w-[40%] px-3 md:px-5 ">
                        <section>
                            <div className="py-4 md:py-8 px-2 md:px-4 mx-auto max-w-screen-md">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6 md:space-y-8"
                                >
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Your email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                            placeholder="Enter your email adderess"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                            placeholder="Let me know how I can help you"
                                            required
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="message"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                        >
                                            Your message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows="6"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Leave a comment..."
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="py-3 btn btn-primary transition duration-300 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 w-full sm:w-fit"
                                    >
                                        Send message
                                    </button>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;