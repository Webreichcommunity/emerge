import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Updated service data with refined color scheme
const servicesData = [
  {
    title: "Planning",
    description: "Comprehensive project planning for optimal results",
    image: "https://images.pexels.com/photos/4977404/pexels-photo-4977404.jpeg?auto=compress&cs=tinysrgb&w=600",
    longDescription: "Our planning services include detailed project scoping, timeline development, resource allocation, and risk assessment to ensure your project starts with a solid foundation and clear direction.",
    color: "from-neutral-900 to-stone-900"
  },
  {
    title: "Sanctioning",
    description: "Expert guidance through approval processes",
    image: "https://images.pexels.com/photos/31430679/pexels-photo-31430679/free-photo-of-modern-indoor-wooden-staircase-with-glass-rail.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    longDescription: "We navigate complex approval processes with regulatory bodies, ensuring all permits and sanctions are obtained efficiently and correctly, saving you time and preventing costly delays.",
    color: "from-stone-900 to-neutral-900"
  },
  {
    title: "Building Construction",
    description: "End-to-end construction management",
    image: "https://images.pexels.com/photos/1451416/pexels-photo-1451416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    longDescription: "From groundbreaking to final inspections, our construction services deliver quality craftsmanship, adherence to timelines, and transparent communication throughout the entire build process.",
    color: "from-neutral-900 to-stone-900"
  },
  {
    title: "3D Modeling",
    description: "Realistic 3D visualizations of your project",
    image: "https://images.pexels.com/photos/15764116/pexels-photo-15764116/free-photo-of-architect-working-on-a-computer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    longDescription: "Our advanced 3D modeling creates photorealistic renderings and walkthroughs of your project, allowing you to visualize and refine your space before construction begins.",
    color: "from-stone-900 to-neutral-900"
  },
  {
    title: "Interior Designing",
    description: "Stylish and functional interior solutions",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    longDescription: "Our interior design team creates spaces that balance aesthetics with functionality, incorporating your personal style while optimizing flow, lighting, and spatial relationships.",
    color: "from-neutral-900 to-stone-900"
  },
  {
    title: "Renovation",
    description: "Transforming existing spaces with precision",
    image: "https://images.pexels.com/photos/3990359/pexels-photo-3990359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    longDescription: "We breathe new life into existing structures through careful renovation that preserves character while updating functionality, efficiency, and appearance to modern standards.",
    color: "from-stone-900 to-neutral-900"
  },
  {
    title: "Estimation",
    description: "Accurate cost projections and budgeting",
    image: "https://images.pexels.com/photos/8488033/pexels-photo-8488033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    longDescription: "Our detailed estimation services provide comprehensive cost breakdowns, helping you plan financially with confidence and avoid unexpected expenses during your project.",
    color: "from-neutral-900 to-stone-900"
  },
  {
    title: "Land Sub-division",
    description: "Professional land division services",
    image: "https://images.pexels.com/photos/8082328/pexels-photo-8082328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    longDescription: "We handle the complexities of land subdivision, including surveys, legal requirements, infrastructure planning, and coordination with local authorities to maximize land value and utility.",
    color: "from-stone-900 to-neutral-900"
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  // Handle scroll position to show/hide arrows
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    setShowLeftArrow(scrollLeft > 20);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
  };
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  const openPopup = (service) => {
    if (isDragging) return;
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };
  
  const closePopup = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };
  
  // Enhanced smooth scroll handling
  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Add a small delay before allowing clicks again
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  
  const scrollToDirection = (direction) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -300 : 300;
    
    container.scrollTo({
      left: container.scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative py-16 bg-white overflow-hidden" id='services'>
      {/* Subtle animated background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black via-stone-950 to-black opacity-70"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        
        {/* Subtle floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-stone-400 to-gray-500 opacity-5"
            style={{
              width: Math.random() * 120 + 40,
              height: Math.random() * 120 + 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 80],
              y: [0, (Math.random() - 0.5) * 80],
              opacity: [0.03, 0.08, 0.03],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-32 bg-stone-600 rounded-full opacity-5 blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 py-2 text-transparent bg-clip-text bg-gradient-to-r from-stone-100 via-neutral-200 to-stone-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our Premium Services
          </motion.h2>
          
          <motion.div 
            className="w-24 h-0.5 mx-auto bg-gradient-to-r from-stone-400 to-neutral-300 rounded-full mb-5"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          
          <motion.p 
            className="text-stone-300 max-w-2xl mx-auto text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Explore our range of professional services designed to make your vision a reality through expert craftsmanship and innovative solutions.
          </motion.p>
        </motion.div>

        {/* Improved horizontal scrolling container */}
        <div className="relative mt-8 px-2">
          {/* Improved scrolling area with better event handling */}
          <motion.div 
            ref={scrollContainerRef}
            className="flex pb-8 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
            style={{ scrollSnapType: 'x mandatory', scrollPadding: '0 1rem', cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Add padding at the start for mobile */}
            <div className="flex-shrink-0 w-4 md:w-6" />
            
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.06,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                }}
                viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                className="flex-shrink-0 w-72 h-[400px] mx-3 snap-center"
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, type: 'spring', stiffness: 300 }
                }}
                onClick={() => openPopup(service)}
              >
                <div className={`relative h-full rounded-xl overflow-hidden shadow-2xl transition-all duration-300 cursor-pointer group`}>
                  {/* Premium glass effect background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-40 backdrop-blur-md`} />
                  
                  {/* Premium border effect */}
                  <div className="absolute inset-0 rounded-xl border border-white border-opacity-10" />
                  
                  {/* Enhanced hover shine effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      filter: 'blur(8px)',
                      transform: 'translateZ(0)',
                    }}
                  />
                  
                  {/* Card content with improved spacing */}
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    {/* Image with enhanced hover animation */}
                    <div className="relative rounded-lg overflow-hidden mb-5 h-40 group-hover:shadow-lg transition-all duration-500">
                      <motion.div
                        className="absolute inset-0 bg-stone-400 opacity-10 blur-md"
                        animate={{
                          scale: [1, 1.03, 1],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'easeInOut',
                        }}
                      />
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-110"
                        style={{ transform: 'translateZ(0)' }}
                      />
                      
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40 group-hover:opacity-30 transition-opacity duration-500" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-stone-100 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-stone-300 mb-5 flex-grow text-sm leading-relaxed">{service.description}</p>
                    
                    <motion.button
                      className="mt-auto w-full py-2.5 px-4 bg-gradient-to-r from-stone-800 to-neutral-800 hover:from-stone-700 hover:to-neutral-700 rounded-lg text-stone-100 text-sm font-medium transition-all duration-300 relative overflow-hidden group-hover:shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Learn More</span>
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-stone-600 to-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ filter: 'blur(4px)', transform: 'translateZ(0)' }}
                      />
                    </motion.button>
                  </div>
                  
                  {/* Subtle card glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ 
                      background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.2), transparent 70%)',
                      transform: 'translateZ(0)'
                    }}
                  />
                </div>
              </motion.div>
            ))}
            
            {/* Add padding at the end for mobile */}
            <div className="flex-shrink-0 w-4 md:w-6" />
          </motion.div>
        
          {/* Improved arrow indicators with better visibility */}
          <AnimatePresence>
            {showLeftArrow && (
              <motion.div
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black bg-opacity-40 backdrop-blur-md flex items-center justify-center cursor-pointer text-white z-20 border border-white border-opacity-10 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.6)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                onClick={() => scrollToDirection('left')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.div>
            )}
            
            {showRightArrow && (
              <motion.div
                className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black bg-opacity-40 backdrop-blur-md flex items-center justify-center cursor-pointer text-white z-20 border border-white border-opacity-10 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.6)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                onClick={() => scrollToDirection('right')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Subtle scroll indicator using dots */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-1.5">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-stone-500"
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3], 
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.3, 
                    repeat: Infinity,
                    repeatType: 'loop'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Improved Modal with premium glass morphism */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className={`relative max-w-md w-full rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl border border-white border-opacity-15`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Premium glass morphism effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${selectedService.color} opacity-50`} />
              <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-30" />
              
              {/* Modal content with improved layout */}
              <div className="relative z-10 p-6">
                <motion.button 
                  onClick={closePopup}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm text-white hover:bg-opacity-50 transition-colors duration-300 border border-white border-opacity-10 shadow-lg z-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
                
                {/* Image with improved animation and effects */}
                <motion.div 
                  className="relative w-full h-52 rounded-lg overflow-hidden mb-6 shadow-xl"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-stone-700 opacity-20"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.2, 0.25, 0.2],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    }}
                    style={{ filter: 'blur(15px)', transform: 'translateZ(0)' }}
                  />
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                    style={{ transform: 'translateZ(0)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40" />
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-white mb-3"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedService.title}
                </motion.h3>
                
                <motion.p 
                  className="text-stone-200 mb-6 text-sm leading-relaxed"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedService.longDescription}
                </motion.p>
                
                <motion.div 
                  className="flex space-x-3"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-stone-700 to-neutral-700 hover:from-stone-600 hover:to-neutral-600 text-white text-sm font-medium rounded-lg relative overflow-hidden group shadow-lg"
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Contact Us</span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-stone-800 to-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ filter: 'blur(4px)', transform: 'translateZ(0)' }}
                    />
                  </motion.button>
                  
                  <motion.button
                    className="py-3 px-4 border border-white border-opacity-15 bg-white bg-opacity-5 backdrop-blur-sm text-black font-semibold text-sm rounded-lg hover:bg-opacity-10 transition-colors shadow-lg"
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              </div>
              
              {/* Enhanced decorative elements */}
              <motion.div 
                className="absolute top-0 left-0 w-40 h-40 rounded-full bg-stone-600 opacity-10"
                animate={{
                  scale: [1, 1.05, 1],
                  x: [0, 5, 0],
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                style={{ filter: 'blur(30px)', transform: 'translateZ(0)' }}
              />
              
              <motion.div 
                className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-neutral-700 opacity-10"
                animate={{
                  scale: [1, 1.03, 1],
                  x: [0, -5, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                style={{ filter: 'blur(40px)', transform: 'translateZ(0)' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for hiding scrollbars while preserving functionality */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
        
        /* Improve performance with hardware acceleration */
        .hide-scrollbar img, 
        .hide-scrollbar div {
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
          -webkit-transform: translate3d(0, 0, 0);
          -moz-transform: translate3d(0, 0, 0);
        }
      `}</style>
    </section>
  );
};

export default Services;