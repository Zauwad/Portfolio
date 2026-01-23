import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
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

  // Desktop nav animation class
  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-1 text-sm lg:text-base transition-colors duration-200
     text-white hover:text-gray-400
     after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px]
     after:bg-white after:origin-left after:transition-transform after:duration-300
     ${isActive ? "text-gray-400 after:scale-x-100" : "after:scale-x-0"}`;

  // Mobile nav simple active style
  const mobileNavClass = ({ isActive }) =>
    `btn btn-ghost w-full text-left justify-start
     ${isActive ? "text-gray-400" : "text-white hover:text-gray-400"}`;

  return (
    <>
      <nav
        className={`sticky top-0 z-50 border-b border-gray-700/40 ${
          isScrolled
            ? 'backdrop-blur-md bg-black/60 shadow-md'
            : 'bg-black'
        }`}
      >
        <div className="pt-5 pb-5 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40">
          <div className="flex justify-between items-center">

            {/* Left Part */}
            <div className="flex items-center gap-2 md:gap-4">
              <Link className="flex items-center gap-1" to="/">
                <SiCodeblocks className="size-6 md:size-7" />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Ridwanul.dev
                </h1>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex gap-2 lg:gap-4">
                <NavLink to="/" className={navLinkClass}>Home</NavLink>
                <NavLink to="/projects" className={navLinkClass}>Projects</NavLink>
                <NavLink to="/contacts" className={navLinkClass}>Contact</NavLink>
              </div>
            </div>

            {/* Right Part */}
            <div className="flex items-center gap-3">
              <div className="hidden md:inline">
                <DownloadResume />
              </div>

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
        </div>
      </nav>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] max-w-sm bg-black z-50 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          md:hidden shadow-xl border-l border-gray-700/50`}
      >
        <div className="p-6 flex flex-col space-y-4">

          <button
            onClick={closeMobileMenu}
            className="self-end btn btn-ghost"
            aria-label="Close menu"
          >
            ✕
          </button>

          <NavLink to="/" onClick={closeMobileMenu} className={mobileNavClass}>
            Home
          </NavLink>

          <NavLink to="/projects" onClick={closeMobileMenu} className={mobileNavClass}>
            Projects
          </NavLink>

          <NavLink to="/contacts" onClick={closeMobileMenu} className={mobileNavClass}>
            Contact
          </NavLink>

          <DownloadResume />
        </div>
      </div>
    </>
  );
};

export default Navbar;
