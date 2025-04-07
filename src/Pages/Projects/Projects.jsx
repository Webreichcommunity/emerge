import React from 'react';
import { motion } from 'framer-motion';
import { ourProjects } from '../../Data/OurProjects';
import { Link } from 'react-router-dom';

const Projects = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        hover: {
            y: -15,
            scale: 1.03,
            transition: {
                duration: 0.4,
                ease: "easeInOut"
            }
        }
    };

    const buttonVariants = {
        initial: {
            scale: 1,
            backgroundColor: "rgba(0, 0, 0, 0)",
            color: "#ffffff",
            boxShadow: "0 0 0 rgba(255, 255, 255, 0.3)"
        },
        hover: {
            scale: 1.05,
            backgroundColor: "#ffffff",
            color: "#000000",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        tap: {
            scale: 0.95
        }
    };

    const headingVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-b from-black to-gray-900 text-white py-16 px-4 sm:px-8 lg:px-16"
        >
            <div className="max-w-7xl mx-auto">
                {/* Heading Section */}
                <motion.div
                    variants={headingVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-stone-400 to-stone-600">Our Portfolio</h2>
                    </motion.div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="text-lg text-gray-300 max-w-3xl mx-auto"
                    >
                        Explore our curated selection of exceptional projects that showcase our expertise and commitment to excellence.
                    </motion.p>
                </motion.div>

                {/* Projects Horizontal Scroll */}
                <div className="relative">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory"
                    >
                        {ourProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                variants={cardVariants}
                                whileHover="hover"
                                className="flex-shrink-0 w-80 sm:w-96 mx-2 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-2xl snap-center"
                            >
                                {/* Project Image with overlay gradient */}
                                <div className="h-48 bg-gray-800 overflow-hidden relative">
                                    <img
                                        src={project.imageUrl || project.mainImage}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        className="absolute bottom-0 left-0 p-3"
                                    >
                                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                            {project.category || project.industry}
                                        </span>
                                    </motion.div>
                                </div>

                                {/* Project Details */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-bold">{project.title}</h3>
                                        {project.squareFootage && (
                                            <span className="text-sm bg-gray-700 px-2 py-1 rounded">
                                                {project.squareFootage}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center text-gray-300 text-sm mb-4">
                                        <span className="mr-4">{project.location}</span>
                                        <span>{project.category || project.industry}</span>
                                    </div>

                                    <p className="text-gray-300 text-sm mb-6 line-clamp-2">
                                        {project.shortDescription || project.summary}
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-xs text-gray-400">Client</p>
                                            <p className="text-sm font-medium">{project.client}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Year</p>
                                            <p className="text-sm font-medium">{project.date || (project.startDate && project.endDate ? `${project.startDate} - ${project.endDate}` : "")}</p>
                                        </div>
                                    </div>

                                    {/* View Project Button */}
                                    <Link to={`/ourwork/${project.slug}`}>
                                        <motion.button
                                            variants={buttonVariants}
                                            initial="initial"
                                            whileHover="hover"
                                            whileTap="tap"
                                            className="mt-6 w-full block text-center border-2 border-white py-3 px-4 rounded-lg font-medium transition-all duration-300"
                                        >
                                            View Project
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Gradient Fade Effects */}
                    {/* <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none"></div> */}
                </div>

                {/* Stats Section with Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center"
                >
                    {[
                        { value: "50+", label: "Projects Completed" },
                        { value: "25", label: "Happy Clients" },
                        { value: "15", label: "Industry Awards" },
                        { value: "100%", label: "Client Satisfaction" }
                    ].map((stat, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            viewport={{ once: true }}
                            className="p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg"
                        >
                            <motion.div 
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-gray-300">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Projects;