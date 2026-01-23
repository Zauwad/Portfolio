import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa6';

const Footer = () => {
    return (
        <div >
            <footer className="sm:footer-horizontal bg-neutral text-neutral-content px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 flex flex-col md:flex-row justify-between items-start md:items-center p-6 md:p-10 gap-6 md:gap-0">
                <aside className="w-full md:w-auto">
                    {/* <svg
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        className="fill-current">
                        <path
                            d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                    </svg> */}
                    <h3 className='text-xl sm:text-2xl font-bold mb-2 md:mb-0'>Ridwanul Azim Zawad</h3>
                    <div>
                        <p className='flex items-center gap-2 sm:gap-3 text-sm sm:text-base'>
                            <svg className='size-5 sm:size-7 flex-shrink-0' xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 356.18">
                                <g fillRule="nonzero">
                                    <path fill="#006A4E" d="M28.137 0H483.86C499.337 0 512 12.663 512 28.14v299.9c0 15.477-12.663 28.14-28.14 28.14H28.137C12.663 356.18 0 343.517 0 328.04V28.14C0 12.663 12.663 0 28.137 0z" />
                                    <path fill="#F42A41" d="M345.047 178.09c0-65.572-53.157-118.729-118.729-118.729-65.573 0-118.729 53.157-118.729 118.729s53.156 118.729 118.729 118.729c65.572 0 118.729-53.157 118.729-118.729z" />
                                </g>
                            </svg>
                            Based In Bangladesh
                        </p>
                    </div>
                </aside>

                <nav className='space-y-3 md:space-y-4 w-full md:w-auto'>
                    <h6 className="small-text text-base sm:text-lg md:text-xl text-center md:text-right">Built with React js., Tailwind, JavaScript</h6>
                    <div className="flex justify-center md:justify-end gap-3 sm:gap-4">


                        <div className="flex justify-center sm:justify-start gap-6 md:gap-5">
                            <a href="https://github.com/Zauwad">
                                <FaGithub
                                    className="transition duration-300 hover:scale-130 shadow-md hover:shadow-lg rounded-full"
                                    size={32}
                                />
                            </a>
                            <a href="https://www.linkedin.com/in/ridwanul-azim-zawad-513272184/">
                                <FaLinkedin
                                    className="transition duration-300 hover:scale-130 shadow-md hover:shadow-lg rounfu"
                                    size={32}
                                />
                            </a>
                            <a href="https://www.facebook.com/redwanul.azim.zawad">
                                <FaFacebook
                                    className="transition duration-300 hover:scale-130 shadow-md hover:shadow-lg rounfu"
                                    size={32}
                                />
                            </a>
                        </div>



                        {/* <a className="hover:scale-110 transition-transform duration-200" aria-label="Twitter" href=''>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                className="fill-current sm:w-6 sm:h-6">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>
                        <a className="hover:scale-110 transition-transform duration-200" aria-label="YouTube">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                className="fill-current sm:w-6 sm:h-6">
                                <path
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a className="hover:scale-110 transition-transform duration-200" aria-label="Facebook">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                className="fill-current sm:w-6 sm:h-6">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a> */}
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;