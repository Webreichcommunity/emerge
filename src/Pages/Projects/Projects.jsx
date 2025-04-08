import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ourProjects } from '../../Data/OurProjects';
import { Link } from 'react-router-dom';

const Projects = () => {
    // For viewport detection
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    // Enhanced animation variants
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
            scale: 1.03,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const buttonVariants = {
        initial: {
            scale: 1,
            backgroundColor: "rgba(0, 0, 0, 0)",
            color: "#ffffff",
            boxShadow: "0 0 0 rgba(255, 255, 255, 0.1)"
        },
        hover: {
            scale: 1.03,
            backgroundColor: "#ffffff",
            color: "#000000",
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.4)",
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

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
            id='projects'
            ref={ref}
        >
            <div className="max-w-7xl mx-auto">
                {/* Heading Section with enhanced animation */}
                <motion.div
                    variants={headingVariants}
                    initial="hidden"
                    animate={controls}
                    className="text-center mb-10 sm:mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative inline-block"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold mb-2 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-stone-300 via-stone-500 to-stone-400">
                            Our Portfolio
                        </h2>
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
                        className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mt-4 px-4"
                    >
                        Explore our curated selection of exceptional projects that showcase our expertise and commitment to excellence.
                    </motion.p>
                </motion.div>

                {/* Projects - Improved for mobile with snap scrolling */}
                <div className="relative -mx-4">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={controls}
                        className="flex overflow-x-auto snap-x snap-mandatory scrolling-touch pb-8 px-4 no-scrollbar"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {ourProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                custom={index}
                                variants={cardVariants}
                                whileHover="hover"
                                className="flex-shrink-0 w-[280px] sm:w-[340px] mx-2 sm:mx-3 snap-center bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 shadow-lg shadow-stone-900/20"
                                style={{ scrollSnapAlign: 'center' }}
                            >
                                {/* Project Image with enhanced overlay */}
                                <div className="h-44 sm:h-48 overflow-hidden relative">
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        src={project.imageUrl || project.mainImage}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.2 }}
                                        className="absolute bottom-3 left-3"
                                    >
                                        <span className="bg-stone-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                                            {project.category || project.industry}
                                        </span>
                                    </motion.div>
                                </div>

                                {/* Project Details - Enhanced for mobile */}
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold line-clamp-1">{project.title}</h3>
                                        {project.squareFootage && (
                                            <span className="text-xs bg-gray-800 px-2 py-1 rounded ml-2 whitespace-nowrap">
                                                {project.squareFootage}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center text-gray-400 text-xs mb-3">
                                        <span className="mr-3">{project.location}</span>
                                        <span className="truncate">{project.category || project.industry}</span>
                                    </div>

                                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                        {project.shortDescription || project.summary}
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-xs text-stone-500">Client</p>
                                            <p className="text-sm font-medium text-stone-300">{project.client}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-stone-500">Year</p>
                                            <p className="text-sm font-medium text-stone-300">{project.date || (project.startDate && project.endDate ? `${project.startDate} - ${project.endDate}` : "")}</p>
                                        </div>
                                    </div>

                                    {/* Enhanced Button with Pulse Effect */}
                                    <Link to={`/ourwork/${project.slug}`} className="mt-5 block">
                                        <motion.button
                                            variants={buttonVariants}
                                            initial="initial"
                                            whileHover="hover"
                                            whileTap="tap"
                                            className="w-full block text-center border border-stone-500 py-3 px-4 rounded-lg font-medium relative overflow-hidden"
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
                                            View Project
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
                        <span className="text-xs text-stone-400 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            Swipe to view more
                        </span>
                    </motion.div>
                </div>

                {/* Stats Section with Enhanced Mobile Animation */}
                <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                    className="mt-14 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
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
                                animate={{ opacity: 0.06 }}
                                className="absolute inset-0 bg-stone-400 rounded-xl"
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
                                    className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-stone-300 to-stone-500"
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-sm sm:text-base text-stone-300 mt-1">{stat.label}</div>
                                
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

                {/* CTA Section - New addition for better mobile engagement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-14 text-center"
                >
                    <Link to="/contact">
                        <motion.button
                            whileHover={{ 
                                scale: 1.03,
                                boxShadow: "0 0 20px rgba(214, 211, 209, 0.3)" 
                            }}
                            whileTap={{ scale: 0.97 }}
                            className="bg-gradient-to-r from-stone-600 to-stone-500 text-white font-medium py-3 px-8 rounded-lg inline-flex items-center"
                        >
                            Discuss Your Project
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
            
            {/* Mobile-specific styles */}
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