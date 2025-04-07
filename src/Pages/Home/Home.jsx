import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BadgeIndianRupee, Clock, Star, Users } from 'lucide-react';
import Services from '../Services/Services';
import Stats from '../Stats/Stats';
import Projects from '../Projects/Projects';

const services = [
  {
    name: "Planning",
    href: "/services/planning",
    image: "/planning.PNG",
    description: "Strategic planning to bring your vision to life with precision and efficiency."
  },
  {
    name: "Sanctioning",
    href: "/services/sanctioning",
    image: "/image2.PNG",
    description: "Ensuring legal approvals and compliance for a seamless construction process."
  },
  {
    name: "Building Construction",
    href: "/services/buildingconstruction",
    image: "/image3.PNG",
    description: "High-quality construction services for residential and commercial spaces."
  },
  {
    name: "3D Modeling",
    href: "/services/3dmodeling",
    image: "/image4.PNG",
    description: "Realistic 3D visualizations to preview your dream project before construction."
  },
  {
    name: "Interior Designing",
    href: "/services/interiordesigning",
    image: "/image5.PNG",
    description: "Creative interior solutions that enhance aesthetics and functionality."
  },
  {
    name: "Renovation",
    href: "/services/renovation",
    image: "/image6.PNG",
    description: "Transforming spaces with modern upgrades and high-quality renovations."
  },
  {
    name: "Estimation",
    href: "/services/estimation",
    image: "/image7.PNG",
    description: "Accurate cost estimation to keep your project within budget."
  },
  {
    name: "Land Sub-division",
    href: "/services/landsubdivision",
    image: "/image8.PNG",
    description: "Expert solutions for dividing land into plots with legal approvals."
  }
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && !isAnimating) {
        handleNext();
      }
    }, 3000); // Increased to 5 seconds for better user experience

    return () => clearInterval(interval);
  }, [isHovered, isAnimating]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleDotClick = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Fade animation variants for images
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  // Subtle movement for images to add depth without popup effect
  const imageMovementVariants = {
    initial: { scale: 1.05 },
    animate: {
      scale: 1,
      transition: {
        duration: 8,
        ease: "easeOut"
      }
    }
  };

  // Text animation with staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
        stiffness: 100,
        damping: 15
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

  // Enhanced indicators for current slide
  const renderIndicators = () => {
    return (
      <div className="absolute bottom-28 sm:bottom-36 left-0 right-0 flex justify-center gap-3 z-20">
        {services.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full transition-all duration-300 ease-in-out 
                      ${index === currentIndex ? "bg-white w-6 md:w-8" : "bg-white/30"}`}
            whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.06 }}
          />
        ))}
      </div>
    );
  };

  // Progress indicator that shows time until next slide
  const renderProgressBar = () => {
    return (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 5,
            ease: "linear",
            repeat: isHovered ? 0 : Infinity,
            repeatType: "loop"
          }}
        />
      </div>
    );
  };

  return (
    <div className="relative text-gray-100 overflow-hidden bg-black">
      {/* Hero Carousel Section */}
      <section
        className="relative h-screen w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* Image with subtle movement */}
            <motion.div
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${services[currentIndex].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
              variants={imageMovementVariants}
              initial="initial"
              animate="animate"
            >
              {/* Enhanced gradient overlay with more depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10">
                {/* Animated particles effect */}
                <div className="absolute inset-0 overflow-hidden opacity-30">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 md:w-2 md:h-2 bg-white rounded-full"
                      initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: Math.random() * 0.5 + 0.3
                      }}
                      animate={{
                        y: [null, Math.random() * -100 - 50],
                        opacity: [null, 0]
                      }}
                      transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  ))}
                </div>

                {/* Controls overlay with enhanced design */}
                <div className="absolute inset-0 flex items-center justify-between px-6">
                  <motion.button
                    onClick={handlePrev}
                    className="p-3 sm:p-4 rounded-full bg-black/40 backdrop-blur-md text-white/90 border border-white/20
                              hidden sm:flex items-center justify-center z-20 hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    aria-label="Previous slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>

                  <motion.button
                    onClick={handleNext}
                    className="p-3 sm:p-4 rounded-full bg-black/40 backdrop-blur-md text-white/90 border border-white/20
                              hidden sm:flex items-center justify-center z-20 hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    aria-label="Next slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>

                {/* Text content with enhanced glass effect */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute bottom-0 left-0 right-0 w-full"
                >
                  <div className="border-t border-white/10 px-6 sm:px-8 py-8 sm:py-12
                                  relative overflow-hidden">
                    {/* Enhanced animated glow effect */}
                    <motion.div
                      className="absolute -inset-1 
                                 rounded-lg blur-3xl opacity-40"
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                        rotate: [0, 3, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    ></motion.div>

                    <div className="max-w-7xl mx-auto relative">
                      {/* Service number indicator for visual interest */}
                      <motion.div
                        variants={itemVariants}
                        className="text-sm font-mono tracking-widest text-white/70 mb-2"
                      >
                        {String(currentIndex + 1).padStart(2, '0')}/{String(services.length).padStart(2, '0')}
                      </motion.div>

                      <motion.h1
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 
                                  text-white tracking-tight"
                      >
                        {services[currentIndex].name}
                      </motion.h1>

                      <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 text-gray-200 max-w-2xl"
                      >
                        {services[currentIndex].description}
                      </motion.p>

                      <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-4"
                      >
                        <motion.div
                          variants={buttonVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Link
                            to={services[currentIndex].href}
                            className="inline-block px-8 py-3 sm:px-10 sm:py-4 bg-white text-black text-sm sm:text-base font-semibold rounded-lg 
                                      transition-all duration-300 shadow-lg relative overflow-hidden group"
                          >
                            {/* Enhanced button shine effect */}
                            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent 
                                           via-white/80 to-transparent -translate-x-full group-hover:translate-x-full 
                                           transition-transform duration-1000 ease-in-out"></span>
                            <span className="relative z-10 flex items-center gap-2">
                              Explore Our Work
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </span>
                          </Link>
                        </motion.div>

                        <motion.div
                          variants={buttonVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Link
                            to="/contact"
                            className="inline-block px-8 py-3 sm:px-10 sm:py-4 bg-transparent border border-white/70 text-white text-sm sm:text-base font-semibold rounded-lg 
                                      transition-all duration-300 hover:bg-white/10 relative overflow-hidden"
                          >
                            <span className="relative z-10">Get Quote</span>
                          </Link>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        {/* {renderProgressBar()} */}

        {/* Navigation Invisible touch areas for mobile */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-0 h-full w-1/4 z-10 opacity-0"
          aria-label="Previous slide"
        />
        <button
          onClick={handleNext}
          className="absolute right-0 top-0 h-full w-1/4 z-10 opacity-0"
          aria-label="Next slide"
        />
      </section>

      <section className="py-12 sm:py-16 px-4 bg-gradient-to-br from-stone-900 to-black relative overflow-hidden">
        {/* Background animated shapes */}
        <motion.div
          className="absolute -right-24 -top-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -left-24 -bottom-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />

        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-white">Ready to Start Your Project?</h2>
          <p className="text-sm sm:text-base md:text-lg mb-6 text-gray-300 max-w-xl mx-auto">
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
              className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-white text-black font-bold rounded-lg 
                       transition-all duration-300 shadow-lg relative overflow-hidden group"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent 
                             via-white/30 to-transparent -translate-x-full group-hover:translate-x-full 
                             transition-transform duration-1000 ease-in-out"></span>
              <span className="relative z-10 text-sm sm:text-base">Get a Free Consultation</span>
            </Link>
          </motion.div>
        </motion.div> */}


      </section>
      <Stats />
      <Services />
      <Projects/>
    </div>
  );
};

export default Home;