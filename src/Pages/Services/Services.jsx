import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const servicesData = [
  {
    title: "Planning",
    description: "Comprehensive project planning for optimal results",
    image: "https://images.pexels.com/photos/4977404/pexels-photo-4977404.jpeg?auto=compress&cs=tinysrgb&w=600",
    longDescription: "Our planning services include detailed project scoping, timeline development, resource allocation, and risk assessment to ensure your project starts with a solid foundation and clear direction.",
    color: "from-stone-200 to-neutral-100"
  },
  {
    title: "Sanctioning",
    description: "Expert guidance through approval processes",
    image: "https://images.pexels.com/photos/31430679/pexels-photo-31430679/free-photo-of-modern-indoor-wooden-staircase-with-glass-rail.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    longDescription: "We navigate complex approval processes with regulatory bodies, ensuring all permits and sanctions are obtained efficiently and correctly, saving you time and preventing costly delays.",
    color: "from-stone-100 to-neutral-200"
  },
  {
    title: "Building Construction",
    description: "End-to-end construction management",
    image: "https://images.pexels.com/photos/1451416/pexels-photo-1451416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    longDescription: "From groundbreaking to final inspections, our construction services deliver quality craftsmanship, adherence to timelines, and transparent communication throughout the entire build process.",
    color: "from-stone-200 to-neutral-100"
  },
  {
    title: "3D Modeling",
    description: "Realistic 3D visualizations of your project",
    image: "https://images.pexels.com/photos/15764116/pexels-photo-15764116/free-photo-of-architect-working-on-a-computer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    longDescription: "Our advanced 3D modeling creates photorealistic renderings and walkthroughs of your project, allowing you to visualize and refine your space before construction begins.",
    color: "from-stone-100 to-neutral-200"
  },
  {
    title: "Interior Designing",
    description: "Stylish and functional interior solutions",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    longDescription: "Our interior design team creates spaces that balance aesthetics with functionality, incorporating your personal style while optimizing flow, lighting, and spatial relationships.",
    color: "from-stone-200 to-neutral-100"
  },
  {
    title: "Renovation",
    description: "Transforming existing spaces with precision",
    image: "https://images.pexels.com/photos/3990359/pexels-photo-3990359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    longDescription: "We breathe new life into existing structures through careful renovation that preserves character while updating functionality, efficiency, and appearance to modern standards.",
    color: "from-stone-100 to-neutral-200"
  },
  {
    title: "Estimation",
    description: "Accurate cost projections and budgeting",
    image: "https://images.pexels.com/photos/8488033/pexels-photo-8488033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    longDescription: "Our detailed estimation services provide comprehensive cost breakdowns, helping you plan financially with confidence and avoid unexpected expenses during your project.",
    color: "from-stone-200 to-neutral-100"
  },
  {
    title: "Land Sub-division",
    description: "Professional land division services",
    image: "https://images.pexels.com/photos/8082328/pexels-photo-8082328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    longDescription: "We handle the complexities of land subdivision, including surveys, legal requirements, infrastructure planning, and coordination with local authorities to maximize land value and utility.",
    color: "from-stone-100 to-neutral-200"
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  
  // Check if mobile view
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Handle scroll position to show/hide arrows (desktop only)
  const handleScroll = () => {
    if (!scrollContainerRef.current || isMobile) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowArrows(scrollWidth > clientWidth);
  };
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isMobile]);
  
  const openPopup = (service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };
  
  const closePopup = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };
  
  // Handle touch events for mobile scrolling
  const handleTouchStart = (e) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX);
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  const scrollToDirection = (direction) => {
    if (!scrollContainerRef.current || isMobile) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -300 : 300;
    
    container.scrollTo({
      left: container.scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden text-gray-900 bg-gradient-to-br from-white via-stone-50 to-amber-50"
      id='services'
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-amber-100 to-stone-200 opacity-20"
            style={{
              width: Math.random() * 120 + 60,
              height: Math.random() * 120 + 60,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 30],
              y: [0, (Math.random() - 0.5) * 30],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          className="text-center mb-10"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-stone-800 to-stone-600"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>
          
          <motion.div 
            className="w-20 h-1 mx-auto bg-gradient-to-r from-amber-400 to-stone-500 rounded-full mb-4"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          
          <motion.p 
            className="text-stone-600 max-w-2xl mx-auto text-sm md:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Explore our range of professional services designed to make your vision a reality through expert craftsmanship and innovative solutions.
          </motion.p>
        </motion.div>

        {/* Services carousel */}
        <div className="relative mt-6">
          {/* Scroll arrows (desktop only) */}
          {showArrows && !isMobile && (
            <AnimatePresence>
              <motion.button
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer text-stone-800 z-20 border border-stone-200 hover:bg-stone-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToDirection('left')}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <motion.button
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer text-stone-800 z-20 border border-stone-200 hover:bg-stone-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToDirection('right')}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </AnimatePresence>
          )}
          
          {/* Services cards */}
          <motion.div 
            ref={scrollContainerRef}
            className="flex pb-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 px-1"
            style={{ 
              scrollSnapType: 'x mandatory',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onMouseDown={(e) => {
              if (isMobile) return;
              setIsDragging(true);
              setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
              setScrollLeft(scrollContainerRef.current.scrollLeft);
            }}
            onMouseLeave={() => setIsDragging(false)}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={(e) => {
              if (!isDragging || isMobile || !scrollContainerRef.current) return;
              e.preventDefault();
              const x = e.pageX - scrollContainerRef.current.offsetLeft;
              const walk = (x - startX);
              scrollContainerRef.current.scrollLeft = scrollLeft - walk;
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Add padding at the start */}
            <div className="flex-shrink-0 w-2" />
            
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                }}
                viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                className="flex-shrink-0 w-64 sm:w-72 snap-center"
              >
                <div 
                  className={`relative h-full rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer bg-white group`}
                  onClick={() => openPopup(service)}
                >
                  {/* Glass effect background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-70`} />
                  
                  {/* Card content */}
                  <div className="relative z-10 p-5 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative rounded-lg overflow-hidden mb-4 h-36 shadow-sm">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-stone-800 mb-2">{service.title}</h3>
                    
                    <p className="text-stone-600 mb-4 text-sm flex-grow">{service.description}</p>
                    
                    <button
                      className="mt-auto w-full py-2 px-4 bg-gradient-to-r from-stone-50 to-stone-100 hover:from-amber-50 hover:to-stone-200 rounded-lg text-stone-700 text-sm font-medium transition-all duration-300 border border-stone-200 hover:border-stone-300 hover:shadow-sm"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Add padding at the end */}
            <div className="flex-shrink-0 w-2" />
          </motion.div>
        </div>
      </div>

      {/* Service modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm"
            onClick={closePopup}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`relative max-w-md w-full rounded-xl overflow-hidden shadow-2xl bg-white border border-stone-200 max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={closePopup}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm text-stone-700 hover:bg-opacity-100 transition-colors duration-300 border border-stone-200 shadow-sm z-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Modal content */}
              <div className="relative z-10">
                {/* Image */}
                <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent opacity-40" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-800 mb-3">
                    {selectedService.title}
                  </h3>
                  
                  <p className="text-stone-600 mb-6 text-sm leading-relaxed">
                    {selectedService.longDescription}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      className="flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      Contact Us
                    </button>
                    
                    <button
                      className="py-2.5 px-4 border border-stone-300 bg-white text-stone-700 font-medium text-sm rounded-lg hover:bg-stone-50 transition-colors shadow-sm"
                      onClick={closePopup}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global styles */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Services;