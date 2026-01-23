import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import gsap from 'gsap';

const Contacts = () => {

  const titleRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { y: -80, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }
    ).fromTo(
      infoRef.current,
      { y: 80, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
      "-=0.4"
    );
  }, []);

  return (
    <div className='bg-black p-10 md:p-20 lg:p-40 space-y-10 h-screen'>

      <Helmet>
        <title>Contacts</title>
      </Helmet>

      <h1
        ref={titleRef}
        className='font-bold text-5xl'
      >
        Contact Information
      </h1>

      <div
        ref={infoRef}
        className='text-xl'
      >
        <p>Email: redwanulazimzawad@gmail.com</p>
        <p>Phone: +8801339562237</p>
      </div>

    </div>
  );
};

export default Contacts;
