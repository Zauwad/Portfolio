import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { SiCodeblocks } from "react-icons/si";
import DownloadResume from './DownloadResume';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`sticky top-0 z-50 ${
        isScrolled
          ? 'backdrop-blur-md bg-black/60 border-b border-gray-700/40 shadow-md'
          : 'bg-black'
      }`}
    >
      <div className="pt-5 pb-5 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40">
        <div className="flex justify-between items-center">
          {/* Left Part */}
          <div className="left-part flex items-center gap-2 md:gap-4">
            <Link className="flex items-center gap-1" to="/">
              <SiCodeblocks className="size-6 md:size-7 text-purple-400" />
              <h1 className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                Ridwanul.dev
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-2 lg:gap-4">
              <Link to="/"><button className="btn btn-ghost dark:text-white hover:text-purple-400 text-sm lg:text-base">Home</button></Link>
              <Link to="/projects"><button className="btn btn-ghost dark:text-white hover:text-purple-400 text-sm lg:text-base">Projects</button></Link>
              <Link to="/contacts"><button className="btn btn-ghost dark:text-white hover:text-purple-400 text-sm lg:text-base">Contact</button></Link>
            </div>
          </div>

          {/* Right Part */}
          <div className="right-part flex items-center gap-3">
            <DownloadResume />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden btn btn-ghost p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                ) : (
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen
              ? 'max-h-96 opacity-100 mt-4 pb-4 border-t border-gray-700/50 pt-4 rounded-b-lg shadow-lg'
              : 'max-h-0 opacity-0 mt-0 pb-0 border-none pt-0 shadow-none'
          }`}
          
        >
          <div className="flex flex-col space-y-2 px-2">
            <Link to="/" onClick={closeMobileMenu}><button className="btn btn-ghost hover:text-purple-400 w-full text-left justify-start">Home</button></Link>
            <Link to="/projects" onClick={closeMobileMenu}><button className="btn btn-ghost hover:text-purple-400 w-full text-left justify-start">Projects</button></Link>
            <Link to="/contacts" onClick={closeMobileMenu}><button className="btn btn-ghost hover:text-purple-400 w-full text-left justify-start">Contact</button></Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
