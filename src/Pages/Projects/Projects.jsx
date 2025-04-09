import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ourProjects } from '../../Data/OurProjects';
import { Link } from 'react-router-dom';

const Projects = () => {
    // For viewport detection
    const ref = useRef(null);
    const projectsRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const controls = useAnimation();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);

    // State for category filtering
    const [activeCategory, setActiveCategory] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [categories, setCategories] = useState(['all']);

    // Handle animation when in view
    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    // Update max scroll value when projects are filtered
    useEffect(() => {
        if (projectsRef.current) {
            setMaxScroll(projectsRef.current.scrollWidth - projectsRef.current.clientWidth);
        }
    }, [projectsRef, filteredProjects]);

    // Extract categories and set initial filtered projects
    useEffect(() => {
        // Extract unique categories
        const allCategories = ourProjects.map(project => project.category || project.industry);
        const uniqueCategories = ['all', ...new Set(allCategories.filter(Boolean))];
        setCategories(uniqueCategories);

        // Initialize with all projects
        setFilteredProjects(ourProjects);
    }, []);

    // Handle scroll navigation
    const handleScroll = (direction) => {
        if (projectsRef.current) {
            const scrollAmount = window.innerWidth > 768 ? 600 : 300;
            const newPosition = direction === 'right'
                ? Math.min(scrollPosition + scrollAmount, maxScroll)
                : Math.max(scrollPosition - scrollAmount, 0);

            projectsRef.current.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            });
            setScrollPosition(newPosition);
        }
    };

    // Track scroll position for navigation button states
    const handleProjectsScroll = () => {
        if (projectsRef.current) {
            setScrollPosition(projectsRef.current.scrollLeft);
        }
    };

    // Handle category change
    const handleCategoryChange = (category) => {
        setActiveCategory(category);

        // Filter projects based on selected category
        if (category === 'all') {
            setFilteredProjects(ourProjects);
        } else {
            const filtered = ourProjects.filter(project =>
                (project.category === category) || (project.industry === category)
            );
            setFilteredProjects(filtered);
        }

        // Reset scroll position when changing category
        if (projectsRef.current) {
            projectsRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
            setScrollPosition(0);
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
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const buttonVariants = {
        initial: {
            scale: 1,
            backgroundColor: "rgba(120, 113, 108, 0.9)",
            color: "#ffffff",
            boxShadow: "0 0 0 rgba(120, 113, 108, 0.1)"
        },
        hover: {
            scale: 1.03,
            backgroundColor: "#ffffff",
            color: "#78716c",
            boxShadow: "0 0 15px rgba(120, 113, 108, 0.4)",
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        tap: {
            scale: 0.97
        }
    };

    const headingVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const statVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                delay: 0.2 + (i * 0.1),
                type: "spring",
                stiffness: 100
            }
        }),
        hover: {
            scale: 1.05,
            y: -5,
            transition: {
                type: "spring",
                stiffness: 300
            }
        }
    };

    const navButtonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 200
            }
        },
        hover: {
            scale: 1.1,
            boxShadow: "0 0 15px rgba(120, 113, 108, 0.5)",
            transition: {
                type: "spring",
                stiffness: 400
            }
        },
        tap: {
            scale: 0.95
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
            boxShadow: "0 5px 15px rgba(120, 113, 108, 0.5)"
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
                    radial-gradient(circle at 70% 80%, rgba(255,165,0,0.5) 0%, transparent 25%),
                    radial-gradient(circle at 20% 20%, rgba(120,113,108,0.3) 0%, transparent 30%),
                    linear-gradient(135deg, #ffffff 0%, #fff0f5 50%, #ffebcd 100%)
                `
            }}
            id='projects'
            ref={ref}
        >
            <div className="max-w-7xl mx-auto">
                {/* Heading Section with enhanced animation */}
                <motion.div
                    variants={headingVariants}
                    initial="hidden"
                    animate={controls}
                    className="text-center mb-12 sm:mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative inline-block"
                    >
                        <motion.h2 
                                    className="text-3xl md:text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-stone-800 to-stone-600"
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                    viewport={{ once: true }}
                                  >
                                    Our Projects
                                  </motion.h2>
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={isInView ? { width: "100%" } : {}}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="h-1 bg-gradient-to-r from-stone-500 to-stone-300 rounded-full mx-auto mt-1"
                            style={{ maxWidth: "120px" }}
                        />
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mt-4 px-4"
                    >
                        Explore our curated selection of exceptional projects that showcase our expertise and commitment to excellence.
                    </motion.p>
                </motion.div>

                {/* Category Filter Tabs - Enhanced with pill design */}
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
                                whileHover={activeCategory !== category ? { scale: 1.05, backgroundColor: "rgba(120, 113, 108, 0.15)" } : {}}
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

                {/* Projects - With horizontal scroll navigation */}
                {filteredProjects.length > 0 && (
                    <div className="relative -mx-4">
                        {/* Desktop Navigation Buttons */}
                        <div className="hidden sm:block">
                            <motion.button
                                variants={navButtonVariants}
                                initial="hidden"
                                animate={controls}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => handleScroll('left')}
                                disabled={scrollPosition <= 0}
                                className={`absolute left-2 top-1/2 z-10 transform -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg ${scrollPosition <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-label="Scroll left"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </motion.button>
                            <motion.button
                                variants={navButtonVariants}
                                initial="hidden"
                                animate={controls}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => handleScroll('right')}
                                disabled={scrollPosition >= maxScroll}
                                className={`absolute right-2 top-1/2 z-10 transform -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg ${scrollPosition >= maxScroll ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-label="Scroll right"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.button>
                        </div>

                        {/* Project Cards - Horizontal Scrolling Container */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={controls}
                            className="flex overflow-x-auto snap-x snap-mandatory scrolling-touch pb-8 px-4 no-scrollbar"
                            ref={projectsRef}
                            onScroll={handleProjectsScroll}
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none'
                            }}
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    custom={index}
                                    variants={cardVariants}
                                    whileHover="hover"
                                    className="flex-shrink-0 w-[300px] sm:w-[360px] mx-3 sm:mx-4 snap-center bg-white/30 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-white/50"
                                    style={{
                                        scrollSnapAlign: 'center',
                                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.6)'
                                    }}
                                >
                                    {/* Project Image with enhanced overlay */}
                                    <div className="h-52 sm:h-56 overflow-hidden relative">
                                        <motion.img
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.5 }}
                                            src={project.imageUrl || project.mainImage}
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
                                            <span className="bg-stone-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                                                {project.category || project.industry}
                                            </span>
                                        </motion.div>
                                    </div>

                                    {/* Project Details - Enhanced with glass effect */}
                                    <div className="p-5 relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{project.title}</h3>
                                        </div>

                                        <div className="flex items-center text-gray-700 text-xs mb-3">
                                            <span className="mr-3 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {project.location}
                                            </span>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {project.shortDescription || project.summary}
                                        </p>

                                        {/* Project Stats with attractive styling */}
                                        <div className="grid grid-cols-2 gap-3 mt-4 mb-4">
                                            <motion.div
                                                whileHover={{ scale: 1.03 }}
                                                className="bg-white/60 rounded-lg p-3 text-center shadow-sm border border-white/60"
                                            >
                                                <p className="text-xs text-stone-500 font-medium">Total Area</p>
                                                <p className="text-sm font-bold text-gray-900">{project.squareFootage || project.totalSqFt || "N/A"}</p>
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
                                                <p className="text-sm font-medium">{project.date || (project.startDate && project.endDate ? `${project.startDate} - ${project.endDate}` : "N/A")}</p>
                                            </div>
                                        </div>

                                        {/* Enhanced Button with Pulse Effect */}
                                        <Link to={`/ourwork/${project.slug}`} className="block">
                                            <motion.button
                                                variants={buttonVariants}
                                                initial="initial"
                                                whileHover="hover"
                                                whileTap="tap"
                                                className="w-full block text-center border border-stone-600 py-3 px-4 rounded-lg font-medium relative overflow-hidden"
                                            >
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    whileHover={{
                                                        opacity: [0, 0.5, 0],
                                                        scale: [1, 1.5],
                                                        transition: { duration: 1.5, repeat: Infinity, repeatType: "loop" }
                                                    }}
                                                    className="absolute inset-0 bg-stone-400/20 rounded-lg"
                                                />
                                                View Project Details
                                            </motion.button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Extra blank space at end for better UX */}
                            <div className="flex-shrink-0 w-4 sm:w-8 h-1"></div>
                        </motion.div>

                        {/* Scroll Indicator for Mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0.4, 0.8, 0.4],
                                x: [0, 10, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "loop"
                            }}
                            className="flex items-center justify-center mt-2 sm:hidden"
                        >
                            <span className="text-xs text-stone-600 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                Swipe to view more
                            </span>
                        </motion.div>
                    </div>
                )}

                {/* Stats Section with Enhanced Glassmorphism */}
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
                            variants={statVariants}
                            whileHover="hover"
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
                                    className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-stone-600"
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-sm sm:text-base text-gray-800 mt-1">{stat.label}</div>

                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: "60%" } : {}}
                                    transition={{ duration: 0.7, delay: 0.5 + (index * 0.1) }}
                                    className="h-0.5 bg-stone-500/50 mx-auto mt-2 rounded-full"
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section - Enhanced with attractive styling */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <Link to="/contact">
                        <motion.button
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 0 25px rgba(120, 113, 108, 0.4)"
                            }}
                            whileTap={{ scale: 0.97 }}
                            className="bg-gradient-to-r from-stone-700 to-stone-600 text-white font-medium py-4 px-10 rounded-lg inline-flex items-center shadow-lg"
                        >
                            Discuss Your Project
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            {/* Custom styles */}
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </motion.div>
    );
};

export default Projects;