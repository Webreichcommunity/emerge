import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  const servicesData = [
    {
      title: "Planning",
      description: "Comprehensive project planning for optimal results",
      image: "https://images.pexels.com/photos/4977404/pexels-photo-4977404.jpeg?auto=compress&cs=tinysrgb&w=600",
      longDescription: "Our planning services include detailed project scoping, timeline development, resource allocation, and risk assessment to ensure your project starts with a solid foundation and clear direction.",
      icon: "📐"
    },
    {
      title: "Sanctioning",
      description: "Expert guidance through approval processes",
      image: "https://www.freshbooks.com/wp-content/uploads/2022/03/approve-an-invoice-payment.jpg",
      longDescription: "We navigate complex approval processes with regulatory bodies, ensuring all permits and sanctions are obtained efficiently and correctly, saving you time and preventing costly delays.",
      icon: "📝"
    },
    {
      title: "Building Construction",
      description: "End-to-end construction management",
      image: "https://images.pexels.com/photos/1451416/pexels-photo-1451416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      longDescription: "From groundbreaking to final inspections, our construction services deliver quality craftsmanship, adherence to timelines, and transparent communication throughout the entire build process.",
      icon: "🏗️"
    },
    {
      title: "3D Modeling",
      description: "Realistic 3D visualizations of your project",
      image: "https://img.freepik.com/free-photo/view-3d-house-model_23-2150761166.jpg?t=st=1744894707~exp=1744898307~hmac=cd83b8e9c868b1338cebb026bc3b93d8d6bf463d0b8698c111ffe3087258368d&w=826",
      longDescription: "Our advanced 3D modeling creates photorealistic renderings and walkthroughs of your project, allowing you to visualize and refine your space before construction begins.",
      icon: "🖥️"
    },
    {
      title: "Interior Designing",
      description: "Stylish and functional interior solutions",
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      longDescription: "Our interior design team creates spaces that balance aesthetics with functionality, incorporating your personal style while optimizing flow, lighting, and spatial relationships.",
      icon: "🛋️"
    },
    {
      title: "Renovation",
      description: "Transforming existing spaces with precision",
      image: "https://images.pexels.com/photos/3990359/pexels-photo-3990359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      longDescription: "We breathe new life into existing structures through careful renovation that preserves character while updating functionality, efficiency, and appearance to modern standards.",
      icon: "🔨"
    },
    {
      title: "Estimation",
      description: "Accurate cost projections and budgeting",
      image: "https://images.pexels.com/photos/5466809/pexels-photo-5466809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      longDescription: "Our detailed estimation services provide comprehensive cost breakdowns, helping you plan financially with confidence and avoid unexpected expenses during your project.",
      icon: "💰"
    },
    {
      title: "Land Sub-division",
      description: "Professional land division services",
      image: "https://images.pexels.com/photos/7937301/pexels-photo-7937301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      longDescription: "We handle the complexities of land subdivision, including surveys, legal requirements, infrastructure planning, and coordination with local authorities to maximize land value and utility.",
      icon: "🏞️"
    }
  ];

  const openServiceDetails = (service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeServiceDetails = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

  const goToContact = () => {
    navigate('/contact');
    closeServiceDetails();
  };

  return (
    <div className="relative bg-white min-h-screen w-full overflow-x-hidden" id="services">
      {/* Header Section */}
      <div className="container mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-stone-500"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-stone-400 to-stone-600 mb-8 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          <motion.p
            className="text-lg md:text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            From initial concept to final construction, we offer a complete range of architectural and design services
            to bring your vision to life with precision and excellence.
          </motion.p>
        </motion.div>
      </div>

      {/* Services Grid Section */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Gradient fade effects on sides */}
          {/* <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" /> */}
          {/* <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" /> */}

          {/* Scrollable cards container */}
          <div className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-6 pb-4" style={{ minWidth: `${servicesData.length * 320}px` }}>
              {servicesData.map((service, index) => (
                <div key={index} className="flex-shrink-0 w-72">
                  <ServiceCard
                    service={service}
                    index={index}
                    onClick={() => openServiceDetails(service)}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeServiceDetails}
          >
            <motion.div
              className="bg-white rounded-xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80 overflow-hidden">
                <motion.img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <motion.h3
                    className="text-3xl font-bold text-white"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedService.title}
                  </motion.h3>
                  <motion.p
                    className="text-white/90 mt-1"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {selectedService.description}
                  </motion.p>
                </div>
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/90 rounded-full text-2xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {selectedService.icon}
                </motion.div>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto flex-grow">
                <motion.p
                  className="text-gray-700 mb-8 text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {selectedService.longDescription}
                </motion.p>
              </div>

              <div className="p-6 border-t border-gray-200">
                <div className="flex gap-4">
                  <motion.button
                    className="flex-1 py-3 px-4 bg-stone-100 hover:bg-stone-200 rounded-lg font-medium text-stone-800 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeServiceDetails}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    Close
                  </motion.button>
                  <motion.button
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-stone-600 to-stone-800 hover:from-stone-700 hover:to-stone-900 rounded-lg font-medium text-white transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={goToContact}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    Contact Us
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ service, index, onClick }) => {
  return (
    <motion.div
      className="relative h-96 rounded-xl overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
    >
      {/* Image with proper display */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

      {/* Icon badge */}
      <motion.div
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/90 rounded-full text-xl z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        {service.icon}
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-stone-100 transition-colors">
            {service.title}
          </h3>
          <p className="text-stone-200 text-base group-hover:text-stone-300 transition-colors">
            {service.description}
          </p>

          <motion.div
            className="w-full mt-6 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <motion.span
              className="text-white text-base font-medium flex items-center gap-2 group-hover:text-stone-200 transition-colors"
              whileHover={{ x: 5 }}
            >
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
    </motion.div>
  );
};

export default Services;