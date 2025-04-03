import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  { 
    name: "Architectural Design", 
    href: "/ourwork/architecturaldesign", 
    image: "https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Innovative designs that blend aesthetics with functionality"
  },
  { 
    name: "Residential Construction", 
    href: "/ourwork/residentialconstruction", 
    image: "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Building homes that stand the test of time with quality craftsmanship"
  },
  { 
    name: "Commercial Building Construction", 
    href: "/ourwork/commercialconstruction", 
    image: "https://images.pexels.com/photos/209266/pexels-photo-209266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Creating commercial spaces that inspire productivity and success"
  },
  { 
    name: "Road & Highway Development", 
    href: "/ourwork/roaddevelopment", 
    image: "https://images.pexels.com/photos/8159/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Engineering pathways that connect communities and drive progress"
  },
  { 
    name: "Bridge & Flyover Construction", 
    href: "/ourwork/bridgeconstruction", 
    image: "https://images.pexels.com/photos/1320737/pexels-photo-1320737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Building structures that overcome obstacles and stand strong"
  },
  { 
    name: "Industrial Infrastructure Development", 
    href: "/ourwork/industrialinfrastructure", 
    image: "https://images.pexels.com/photos/2098624/pexels-photo-2098624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Developing industrial solutions for tomorrow's challenges"
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setDirection(1);
        setCurrentIndex((prevIndex) => 
          prevIndex === services.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  // Enhanced animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { 
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { 
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    })
  };

  // Text animation variants with staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200,
        damping: 20
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(255, 255, 255, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.97 }
  };

  return (
    <div className="relative text-gray-100  overflow-hidden">
      {/* Hero Carousel Section */}
      <section 
        className="relative h-screen w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${services[currentIndex].image})` }}
            >
              {/* Enhanced gradient overlay - more concentrated at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent">
                {/* Glass effect text container */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute bottom-0 left-0 right-0 w-full"
                >
                  <div className="backdrop-blur-md bg-black/30 border-t border-white/10 px-6 py-8 md:py-10 
                                  relative overflow-hidden">
                    {/* Subtle animated glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 
                                   rounded-lg blur-3xl opacity-20 animate-pulse"></div>
                    
                    <div className="max-w-7xl mx-auto relative">
                      <motion.h1 
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 
                                  text-white tracking-tight"
                      >
                        {services[currentIndex].name}
                      </motion.h1>
                      
                      <motion.p 
                        variants={itemVariants}
                        className="text-lg md:text-xl lg:text-2xl mb-6 text-gray-200 max-w-3xl"
                      >
                        {services[currentIndex].description}
                      </motion.p>
                      
                      <motion.div
                        variants={itemVariants}
                        className="inline-block"
                      >
                        <motion.div
                          variants={buttonVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Link 
                            to={services[currentIndex].href}
                            className="inline-block px-8 py-3.5 bg-white text-black font-semibold rounded-lg 
                                      transition-all duration-300 shadow-lg relative overflow-hidden group"
                          >
                            {/* Button shine effect */}
                            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent 
                                           via-white/30 to-transparent -translate-x-full group-hover:translate-x-full 
                                           transition-transform duration-1000 ease-in-out"></span>
                            <span className="relative z-10">Explore Our Work</span>
                          </Link>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Invisible buttons at left/right edge for easier mobile touch */}
        {/* <button 
          onClick={handlePrev}
          className="absolute left-0 top-0 h-full w-1/4 z-10 opacity-0"
          aria-label="Previous slide"
        />
        <button 
          onClick={handleNext}
          className="absolute right-0 top-0 h-full w-1/4 z-10 opacity-0"
          aria-label="Next slide"
        /> */}

      </section>

      {/* Call to Action Section with enhanced animations */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-stone-900 to-black">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Start Your Project?</h2>
          <p className="text-lg sm:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Our team of experts is ready to bring your vision to life with innovative solutions and exceptional craftsmanship.
          </p>
          <motion.div
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <Link 
              to="/contact"
              className="inline-block px-8 py-4 sm:px-10 sm:py-5 bg-white text-black font-bold rounded-lg 
                       transition-all duration-300 shadow-lg relative overflow-hidden group"
            >
              {/* Button shine effect */}
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent 
                             via-white/30 to-transparent -translate-x-full group-hover:translate-x-full 
                             transition-transform duration-1000 ease-in-out"></span>
              <span className="relative z-10">Get a Free Consultation</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;