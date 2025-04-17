import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

// Sample project data based on your format
const sampleProjects = [
  {
    id: 1,
    slug: "techhub-innovation-center",
    title: "TechHub Innovation Center",
    shortDescription: "A state-of-the-art innovation center for tech startups and research teams.",
    client: "TechCorp Solutions",
    year: "2023",
    category: "Commercial",
    totalArea: "4,050 Sq.Ft.",
    budget: "₹62,00,000",
    totalSqFt: "50,000",
    totalCost: "$10M",
    mainImage: "/nande.JPG",
  },
  {
    id: 2,
    slug: "luxury-villa-retreat",
    title: "Luxury Villa Retreat",
    shortDescription: "An exclusive residential villa with premium amenities and sustainable design.",
    client: "Private Owner",
    year: "2022",
    category: "Residential",
    totalArea: "6,200 Sq.Ft.",
    budget: "₹95,00,000",
    totalSqFt: "6,200",
    totalCost: "$2.5M",
    mainImage: "https://images.pexels.com/photos/1624990/pexels-photo-1624990.jpeg",
  },
  {
    id: 3,
    slug: "urban-loft-apartments",
    title: "Urban Loft Apartments",
    shortDescription: "Modern urban living spaces with innovative space utilization and luxury finishes.",
    client: "Metropolitan Developers",
    year: "2023",
    category: "Residential",
    totalArea: "12,500 Sq.Ft.",
    budget: "₹1,80,00,000",
    totalSqFt: "12,500",
    totalCost: "$4.8M",
    mainImage: "https://images.pexels.com/photos/5506051/pexels-photo-5506051.jpeg",
  },
  {
    id: 4,
    slug: "corporate-headquarters",
    title: "Corporate Headquarters",
    shortDescription: "A sustainable corporate campus with cutting-edge facilities and green spaces.",
    client: "Global Enterprises",
    year: "2022",
    category: "Commercial",
    totalArea: "75,000 Sq.Ft.",
    budget: "₹12,50,00,000",
    totalSqFt: "75,000",
    totalCost: "$15M",
    mainImage: "https://images.pexels.com/photos/30083651/pexels-photo-30083651/free-photo-of-modern-architectural-marvel-in-daylight.jpeg",
  }
];

const Projects = () => {
  // For viewport detection
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  // State for category filtering
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const categories = ['all', 'Residential', 'Commercial'];

  // Handle animation when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Set initial filtered projects
  useEffect(() => {
    setFilteredProjects(sampleProjects);
  }, []);

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    // Filter projects based on selected category
    if (category === 'all') {
      setFilteredProjects(sampleProjects);
    } else {
      const filtered = sampleProjects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: i * 0.1
      }
    }),
    hover: {
      y: -10,
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const filterContainerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const filterItemVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    active: {
      scale: 1.05,
      backgroundColor: "#000000",
      color: "#ffffff",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)"
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-gray-900"
      style={{
        background: `
          radial-gradient(circle at 70% 80%, rgba(0,0,0,0.2) 0%, transparent 25%),
          radial-gradient(circle at 20% 20%, rgba(120,113,108,0.3) 0%, transparent 30%),
          linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 50%, #d6d3d1 100%)
        `
      }}
      id='projects'
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-stone-800 to-stone-600"
          >
            Our Projects
          </motion.h2>
          <motion.div
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-stone-500 to-black rounded-full mx-auto mt-1"
            style={{ maxWidth: "120px" }}
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-stone-700 max-w-3xl mx-auto mt-4 px-4"
          >
            Explore our curated selection of exceptional projects that showcase our expertise and commitment to excellence.
          </motion.p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          variants={filterContainerVariants}
          initial="hidden"
          animate={controls}
          className="mb-12"
        >
          <div className="w-full text-center mb-5">
            <h3 className="text-lg font-medium text-gray-800">Browse by category</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3 px-2 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                variants={filterItemVariants}
                initial="hidden"
                animate={activeCategory === category ? "active" : "visible"}
                whileHover={activeCategory !== category ? { scale: 1.05, backgroundColor: "rgba(0, 0, 0, 0.1)" } : {}}
                whileTap="tap"
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2.5 text-sm rounded-full border transition-all duration-300 backdrop-blur-sm ${
                  activeCategory === category
                    ? 'bg-stone-700 text-white border-stone-700 shadow-md font-medium'
                    : 'bg-white/40 text-gray-800 border-stone-200 hover:border-stone-400'
                }`}
              >
                {category === 'all' ? 'All Projects' : category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Empty state for when no projects match the filter */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 px-4"
          >
            <div className="bg-white/40 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto shadow-lg border border-white/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-stone-500 mx-auto mb-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-5">We couldn't find any projects matching this category.</p>
              <button
                onClick={() => handleCategoryChange('all')}
                className="px-5 py-2.5 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition-colors shadow-md"
              >
                View all projects
              </button>
            </div>
          </motion.div>
        )}

        {/* Projects Grid - 2x2 Layout */}
        {filteredProjects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
          >
            {filteredProjects.slice(0, 4).map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white/30 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-white/50"
                style={{
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.6)'
                }}
              >
                {/* Project Image with enhanced overlay */}
                <div className="h-52 sm:h-56 overflow-hidden relative">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={project.mainImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="absolute bottom-3 left-3 flex gap-2"
                  >
                    <span className="bg-stone-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                      {project.category}
                    </span>
                  </motion.div>
                </div>

                {/* Project Details */}
                <div className="p-5 relative">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{project.title}</h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  {/* Project Stats */}
                  <div className="grid grid-cols-2 gap-3 mt-4 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="bg-white/60 rounded-lg p-3 text-center shadow-sm border border-white/60"
                    >
                      <p className="text-xs text-stone-500 font-medium">Total Area</p>
                      <p className="text-sm font-bold text-gray-900">{project.totalSqFt || project.totalArea || "N/A"}</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="bg-white/60 rounded-lg p-3 text-center shadow-sm border border-white/60"
                    >
                      <p className="text-xs text-stone-500 font-medium">Budget</p>
                      <p className="text-sm font-bold text-gray-900">{project.budget || project.totalCost || "N/A"}</p>
                    </motion.div>
                  </div>

                  <div className="flex justify-between items-center text-gray-800 mb-5">
                    <div>
                      <p className="text-xs text-stone-500 font-medium">Client</p>
                      <p className="text-sm font-medium">{project.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-stone-500 font-medium">Year</p>
                      <p className="text-sm font-medium">{project.year}</p>
                    </div>
                  </div>

                  {/* View Project Button */}
                  <Link to={`/ourwork/${project.slug}`} className="block">
                    <motion.button
                      whileHover={{
                        scale: 1.03,
                        backgroundColor: "#ffffff",
                        color: "#78716c",
                        boxShadow: "0 0 15px rgba(0, 0, 0, 0.4)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full block text-center border border-stone-500 bg-stone-500 text-white py-3 px-4 rounded-lg font-medium relative overflow-hidden"
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileHover={{
                          opacity: [0, 0.5, 0],
                          scale: [1, 1.5],
                          transition: { duration: 1.5, repeat: Infinity, repeatType: "loop" }
                        }}
                        className="absolute inset-0 bg-black/20 rounded-lg"
                      />
                      View Project Details
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link to="/ourwork">
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.4)"
              }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-black to-stone-700 text-white font-medium py-4 px-10 rounded-lg inline-flex items-center shadow-lg"
            >
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mt-16 sm:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            { value: "50+", label: "Projects Completed", icon: "📊" },
            { value: "25", label: "Happy Clients", icon: "🤝" },
            { value: "15", label: "Industry Awards", icon: "🏆" },
            { value: "100%", label: "Client Satisfaction", icon: "⭐" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="p-4 rounded-xl relative overflow-hidden group"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-xl border border-white/50"
                style={{
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.7)'
                }}
              />

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.3 + (index * 0.1) }}
                className="relative z-10 text-center"
              >
                <span className="block text-2xl mb-1 sm:hidden">{stat.icon}</span>
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-stone-600"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm sm:text-base text-gray-800 mt-1">{stat.label}</div>

                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "60%" } : {}}
                  transition={{ duration: 0.7, delay: 0.5 + (index * 0.1) }}
                  className="h-0.5 bg-stone-500 mx-auto mt-2 rounded-full"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;