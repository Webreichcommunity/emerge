import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Services from '../Services/Services';
import { BadgeIndianRupee, Clock, Star, Users } from 'lucide-react';

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
]


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
    }, 3000); // Changed to 1 second as requested

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

  // Enhanced slide variants with zoom animation
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.5, ease: "easeOut" }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 }
      }
    })
  };

  // Zoom animation for images
  const zoomVariants = {
    initial: { scale: 1 },
    animate: {
      scale: 1.1,
      transition: {
        duration: 10,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Text animation with staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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

  // Indicators for current slide
  const renderIndicators = () => {
    return (
      <div className="absolute bottom-28 sm:bottom-32 md:bottom-36 left-0 right-0 flex justify-center gap-2 z-20">
        {services.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative text-gray-100 overflow-hidden">
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
            {/* Image with zoom effect */}
            <motion.div
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${services[currentIndex].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
              variants={zoomVariants}
              initial="initial"
              animate="animate"
            >
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">

                {/* Controls overlay with animated arrows */}
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <motion.button
                    onClick={handlePrev}
                    className="p-2 sm:p-3 rounded-full bg-black/30 backdrop-blur-sm text-white border border-white/20
                              hidden sm:flex items-center justify-center z-20 hover:bg-black/50 transition-all duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
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
                    className="p-2 sm:p-3 rounded-full bg-black/30 backdrop-blur-sm text-white border border-white/20
                              hidden sm:flex items-center justify-center z-20 hover:bg-black/50 transition-all duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
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

                {/* Text content with glass effect */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute bottom-0 left-0 right-0 w-full"
                >
                  <div className=" border-t border-white/10 px-4 sm:px-6 py-6 sm:py-8
                                  relative overflow-hidden">
                    {/* Animated glow effect */}
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 
                                 rounded-lg blur-3xl opacity-30"
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    ></motion.div>

                    <div className="max-w-7xl mx-auto relative">
                      <motion.h1
                        variants={itemVariants}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 
                                  text-white tracking-tight"
                      >
                        {services[currentIndex].name}
                      </motion.h1>

                      <motion.p
                        variants={itemVariants}
                        className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 text-gray-200 max-w-2xl"
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
                            className="inline-block px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-black text-sm sm:text-base font-semibold rounded-lg 
                                      transition-all duration-300 shadow-lg relative overflow-hidden group"
                          >
                            {/* Button shine effect */}
                            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent 
                                           via-white/50 to-transparent -translate-x-full group-hover:translate-x-full 
                                           transition-transform duration-800 ease-in-out"></span>
                            <span className="relative z-10">Explore Our Work</span>
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

        {/* Navigation Invisible touch areas */}
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

        {/* Slide indicators */}
        {/* {renderIndicators()} */}
      </section>

      {/* Call to Action Section with enhanced animations */}
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

        <motion.div
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
              {/* Button shine effect */}
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent 
                             via-white/30 to-transparent -translate-x-full group-hover:translate-x-full 
                             transition-transform duration-1000 ease-in-out"></span>
              <span className="relative z-10 text-sm sm:text-base">Get a Free Consultation</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
      <Services />
    </div>
  );
};

export default Home;