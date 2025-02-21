import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { NavLink } from 'react-router'

const HeroSection = () => {
  const imgRef=useRef(null);
  useEffect(() => {
    const imageElement = imgRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className='w-full pt-36 md:pt-48 pb-10'>
      <div className='space-y-6 text-center'>
        <div className="space-y-6 mx-auto">
          <h1 className='text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title'>Master Your Interview Skills <br />Anytime, Anywhere</h1>
          <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl'>Prepare for success with realistic mock interviews powered by cutting-edge AI technology.</p>
        </div>

            
        <div className="flex justify-center space-x-4 z-60">
          <NavLink to='/interview-modes'>
            <Button size='lg' className='px-8'>Get Started</Button>
          </NavLink>
          <NavLink to={'/dashboard'}>
            <Button size='lg' className='px-8' variant='outline'>Watch Demo</Button>
          </NavLink>
        </div>


        <div className='hero-image-wrapper mt-5 md:mt-0'>
          <div ref={imgRef} className='hero-image'>
            <img src="/banner2.jpeg" width={800} height={520} className='rounded-lg shadow-2xl border mx-auto'  alt="banner" />
          </div>
        </div>
      </div>

    </section>
  )
}

export default HeroSection
