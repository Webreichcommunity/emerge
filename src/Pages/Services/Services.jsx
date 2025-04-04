import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Updated service data with new color scheme
const servicesData = [
  {
    title: "Planning",
    description: "Comprehensive project planning for optimal results",
    image: "https://images.pexels.com/photos/4977404/pexels-photo-4977404.jpeg?auto=compress&cs=tinysrgb&w=600", // Replace with actual image URL in production
    longDescription: "Our planning services include detailed project scoping, timeline development, resource allocation, and risk assessment to ensure your project starts with a solid foundation and clear direction.",
    color: "from-stone-900 to-gray-900"
  },
  {
    title: "Sanctioning",
    description: "Expert guidance through approval processes",
    image: "/api/placeholder/400/320", // Replace with actual image URL in production
    longDescription: "We navigate complex approval processes with regulatory bodies, ensuring all permits and sanctions are obtained efficiently and correctly, saving you time and preventing costly delays.",
    color: "from-stone-800 to-gray-800"
  },
  {
    title: "Building Construction",
    description: "End-to-end construction management",
    image: "/api/placeholder/400/320", // Replace with actual image URL in production
    longDescription: "From groundbreaking to final inspections, our construction services deliver quality craftsmanship, adherence to timelines, and transparent communication throughout the entire build process.",
    color: "from-stone-900 to-gray-900"
  },
  {
    title: "3D Modeling",
    description: "Realistic 3D visualizations of your project",
    image: "/api/placeholder/400/320", // Replace with actual image URL in production
    longDescription: "Our advanced 3D modeling creates photorealistic renderings and walkthroughs of your project, allowing you to visualize and refine your space before construction begins.",
    color: "from-stone-800 to-gray-800"
  },
  {
    title: "Interior Designing",
    description: "Stylish and functional interior solutions",
    image: "/api/placeholder/400/320", // Replace with actual image URL in production
    longDescription: "Our interior design team creates spaces that balance aesthetics with functionality, incorporating your personal style while optimizing flow, lighting, and spatial relationships.",
    color: "from-stone-900 to-gray-900"
  },
  {
    title: "Renovation",
    description: "Transforming existing spaces with precision",
    image: "/api/placeholder/400/320", // Replace with actual image URL in production
    longDescription: "We breathe new life into existing structures through careful renovation that preserves character while updating functionality, efficiency, and appearance to modern standards.",
    color: "from-stone-800 to-gray-800"
  },
  {
    title: "Estimation",
    description: "Accurate cost projections and budgeting",
    image: "/api/placeholder/400/320", // Replace with actual image URL in production
    longDescription: "Our detailed estimation services provide comprehensive cost breakdowns, helping you plan financially with confidence and avoid unexpected expenses during your project.",
    color: "from-stone-900 to-gray-900"
  },
  {
    title: "Land Sub-division",
    description: "Professional land division services",
    image: "/api/placeholder/400/320", // Replace with actual image URL in production
    longDescription: "We handle the complexities of land subdivision, including surveys, legal requirements, infrastructure planning, and coordination with local authorities to maximize land value and utility.",
    color: "from-stone-800 to-gray-800"
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const openPopup = (service) => {
    if (isDragging) return;
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };
  
  const closePopup = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

  // Custom scroll indicator component with reduced size
  const ScrollIndicator = () => (
    <div className="flex justify-center mt-4">
      <motion.div 
        className="flex space-x-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-stone-400"
            animate={{ 
              opacity: [0.3, 1, 0.3], 
              scale: [1, 1.2, 1] 
            }}
            transition={{ 
              duration: 1.5, 
              delay: i * 0.3, 
              repeat: Infinity,
              repeatType: 'loop'
            }}
          />
        ))}
      </motion.div>
    </div>
  );

  return (
    <section className="relative py-16 bg-black overflow-hidden">
      {/* Subtle animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-stone-500 to-gray-500 opacity-10 blur-xl"
            style={{
              width: Math.random() * 150 + 50,
              height: Math.random() * 150 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              opacity: [0.05, 0.15, 0.05],
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
      
      {/* Subtle gray light effect */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-64 bg-stone-700 rounded-full opacity-5 blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', damping: 15 }}
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          className="text-center mb-10"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-stone-300 to-gray-100"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ backgroundSize: '200% auto' }}
          >
            Our Premium Services
          </motion.h2>
          
          <motion.div 
            className="w-24 h-0.5 mx-auto bg-gradient-to-r from-stone-500 to-gray-300 rounded-full mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
          
          <p className="text-stone-400 max-w-2xl mx-auto text-base">
            Explore our range of professional services designed to make your vision a reality through expert craftsmanship and innovative solutions.
          </p>
        </motion.div>

        {/* Scroll indicator for horizontal scrolling */}
        <ScrollIndicator />

        {/* Horizontal scrolling container with enhanced scrollbar */}
        <div className="relative mt-6">
          <motion.div 
            className="flex pb-4 overflow-x-auto custom-scrollbar"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            style={{
              scrollSnapType: 'x mandatory',
              scrollPadding: '0 1rem',
            }}
          >
            {/* Add padding at the start for mobile */}
            <div className="flex-shrink-0 w-4 md:w-6" />
            
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.07,
                  type: 'spring',
                  stiffness: 120,
                  damping: 15
                }}
                viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                className="flex-shrink-0 w-72 h-[400px] mx-2 snap-start"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3, type: 'spring', stiffness: 300 }
                }}
                onClick={() => openPopup(service)}
              >
                <div className={`relative h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer group`}>
                  {/* Glassy background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-30 backdrop-blur-sm`} />
                  
                  {/* Subtle border effect */}
                  <div className="absolute inset-0 rounded-xl border border-white border-opacity-10" />
                  
                  {/* Subtle shine effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-gray-500 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    }}
                  />
                  
                  {/* Card content */}
                  <div className="relative z-10 p-5 h-full flex flex-col">
                    {/* Image with subtle animated shadow */}
                    <div className="relative rounded-lg overflow-hidden mb-4 h-40">
                      <motion.div
                        className="absolute inset-0 bg-stone-500 opacity-20 blur-md"
                        animate={{
                          scale: [1, 1.03, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'easeInOut',
                        }}
                      />
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white mb-2">
                      {service.title}
                    </h3>
                    
                    <p className="text-stone-400 mb-4 flex-grow text-sm leading-relaxed">{service.description}</p>
                    
                    <motion.button
                      className="mt-auto w-full py-2 px-4 bg-gradient-to-r from-stone-700 to-gray-700 hover:from-stone-600 hover:to-gray-600 rounded-lg text-gray-200 text-sm font-medium transition-all duration-300 relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Learn More</span>
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-stone-500 to-gray-500 opacity-0 group-hover:opacity-100"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: 'loop',
                          ease: 'linear',
                        }}
                        style={{
                          filter: 'blur(8px)',
                        }}
                      />
                    </motion.button>
                  </div>
                  
                  {/* Subtle floating light effect */}
                  <motion.div
                    className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-stone-500 opacity-5"
                    animate={{
                      y: [-3, 3, -3],
                      x: [3, -3, 3],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    }}
                    style={{
                      filter: 'blur(30px)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
            
            {/* Add padding at the end for mobile */}
            <div className="flex-shrink-0 w-4 md:w-6" />
          </motion.div>
        
          {/* Arrow indicators */}
          <div className="hidden md:block">
            <motion.div
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white bg-opacity-5 backdrop-blur-md flex items-center justify-center cursor-pointer text-white z-20 border border-white border-opacity-10"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              onClick={() => {
                const container = document.querySelector('.custom-scrollbar');
                container.scrollBy({ left: -280, behavior: 'smooth' });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.div>
            
            <motion.div
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white bg-opacity-5 backdrop-blur-md flex items-center justify-center cursor-pointer text-white z-20 border border-white border-opacity-10"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              onClick={() => {
                const container = document.querySelector('.custom-scrollbar');
                container.scrollBy({ left: 280, behavior: 'smooth' });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal with refined glass morphism */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className={`relative max-w-md w-full rounded-xl overflow-hidden shadow-xl backdrop-blur-xl border border-white border-opacity-10`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glass morphism effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${selectedService.color} opacity-40`} />
              <div className="absolute inset-0 bg-gradient-to-tr from-stone-800 to-transparent opacity-10" />
              
              {/* Modal content */}
              <div className="relative z-10 p-6">
                <button 
                  onClick={closePopup}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white bg-opacity-5 backdrop-blur-sm text-white hover:bg-opacity-10 transition-colors duration-300 border border-white border-opacity-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Image with subtle animated glow */}
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6">
                  <motion.div
                    className="absolute inset-0 bg-stone-800 opacity-20"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.25, 0.2],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    }}
                    style={{ filter: 'blur(15px)' }}
                  />
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white mb-3">{selectedService.title}</h3>
                <p className="text-stone-300 mb-6 text-sm leading-relaxed">{selectedService.longDescription}</p>
                
                <div className="flex space-x-3">
                  <motion.button
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-stone-800 to-gray-800 text-white text-sm font-medium rounded-lg relative overflow-hidden group"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Contact Us</span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-stone-700 to-gray-700 opacity-0 group-hover:opacity-100"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'linear',
                      }}
                      style={{ filter: 'blur(8px)' }}
                    />
                  </motion.button>
                  
                  <motion.button
                    className="py-3 px-4 border border-white border-opacity-10 bg-white bg-opacity-5 backdrop-blur-sm text-white text-sm rounded-lg hover:bg-opacity-10 transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
              
              {/* Subtle decorative elements */}
              <motion.div 
                className="absolute top-0 left-0 w-32 h-32 rounded-full bg-stone-800 opacity-15"
                animate={{
                  scale: [1, 1.1, 1],
                  x: [0, 5, 0],
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                style={{ filter: 'blur(30px)' }}
              />
              
              <motion.div 
                className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-gray-800 opacity-10"
                animate={{
                  scale: [1, 1.05, 1],
                  x: [0, -5, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                style={{ filter: 'blur(40px)' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom CSS for enhanced scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(214, 211, 209, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(214, 211, 209, 0.5);
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(214, 211, 209, 0.3) rgba(255, 255, 255, a0.03);
          padding-bottom: 16px;
        }
      `}</style>
    </section>
  );
};

export default Services;