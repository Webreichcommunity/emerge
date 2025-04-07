import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ourProjects } from '../../Data/OurProjects';

const ProjectDetail = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Find the project that matches the slug
        const foundProject = ourProjects.find(p => p.slug === slug);
        
        if (foundProject) {
            setProject(foundProject);
        }
        
        setLoading(false);
        
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-black">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
                <p className="mb-8">We couldn't find the project you're looking for.</p>
                <Link to="/ourwork">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium"
                    >
                        Back to Projects
                    </motion.button>
                </Link>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    // Handle gallery navigation
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === (project.gallery?.length - 1) ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? (project.gallery?.length - 1) : prevIndex - 1
        );
    };

    const gallery = project.gallery || [project.mainImage];

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-16 pb-24 px-4 sm:px-8 lg:px-16"
        >
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <Link to="/ourwork">
                    <motion.button
                        whileHover={{ x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center text-gray-300 hover:text-white mb-8"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Projects
                    </motion.button>
                </Link>

                {/* Hero Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-16"
                >
                    <motion.h1 
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                    >
                        {project.title}
                    </motion.h1>
                    
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-wrap gap-2 mb-8"
                    >
                        {project.tags && project.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                                {tag}
                            </span>
                        ))}
                        {project.category && (
                            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                                {project.category}
                            </span>
                        )}
                    </motion.div>

                    <motion.p 
                        variants={itemVariants}
                        className="text-lg text-gray-300 mb-8 max-w-3xl"
                    >
                        {project.shortDescription}
                    </motion.p>
                </motion.div>

                {/* Image Gallery */}
                <motion.div 
                    variants={itemVariants}
                    className="mb-16 relative overflow-hidden rounded-xl shadow-2xl"
                >
                    <div className="relative w-full h-64 sm:h-96 md:h-[500px] bg-gray-800">
                        {gallery.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: index === currentImageIndex ? 1 : 0,
                                    x: index === currentImageIndex ? 0 : (index < currentImageIndex ? -20 : 20)
                                }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <img 
                                    src={image} 
                                    alt={`${project.title} - Image ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        ))}
                        
                        {/* Navigation Controls */}
                        {gallery.length > 1 && (
                            <>
                                <button 
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                        
                        {/* Image Counter */}
                        {gallery.length > 1 && (
                            <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 px-3 py-1 rounded-full text-sm">
                                {currentImageIndex + 1} / {gallery.length}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Project Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* Left Column - Project Description */}
                    <motion.div 
                        variants={itemVariants}
                        className="md:col-span-2"
                    >
                        <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                        <div className="prose prose-invert max-w-none">
                            {project.description.split('\n\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-4 text-gray-300">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Project Metadata */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-gray-800 p-6 rounded-xl"
                    >
                        <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Project Details</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm text-gray-400">Client</h3>
                                <p className="font-medium">{project.client}</p>
                            </div>
                            
                            <div>
                                <h3 className="text-sm text-gray-400">Year</h3>
                                <p className="font-medium">{project.date}</p>
                            </div>
                            
                            <div>
                                <h3 className="text-sm text-gray-400">Category</h3>
                                <p className="font-medium">{project.category}</p>
                            </div>
                            
                            {project.location && (
                                <div>
                                    <h3 className="text-sm text-gray-400">Location</h3>
                                    <p className="font-medium">{project.location}</p>
                                </div>
                            )}
                            
                            {project.squareFootage && (
                                <div>
                                    <h3 className="text-sm text-gray-400">Size</h3>
                                    <p className="font-medium">{project.squareFootage}</p>
                                </div>
                            )}
                            
                            {project.website && (
                                <div>
                                    <h3 className="text-sm text-gray-400">Website</h3>
                                    <a 
                                        href={project.website} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300"
                                    >
                                        Visit Site
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Testimonial Section */}
                {project.testimonial && (
                    <motion.div 
                        variants={itemVariants}
                        className="mb-16 bg-gradient-to-r from-blue-900 to-purple-900 p-8 rounded-xl relative overflow-hidden"
                    >
                        <div className="absolute -right-20 -top-20 text-9xl opacity-10">
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 11H6C3.79086 11 2 9.20914 2 7V6C2 3.79086 3.79086 2 6 2H7C9.20914 2 11 3.79086 11 6V10C11 16.0751 6.07513 21 0 21V20C5.52285 20 10 15.5228 10 10V11ZM23 11H19C16.7909 11 15 9.20914 15 7V6C15 3.79086 16.7909 2 19 2H20C22.2091 2 24 3.79086 24 6V10C24 16.0751 19.0751 21 13 21V20C18.5228 20 23 15.5228 23 10V11Z"/>
                            </svg>
                        </div>
                        
                        <blockquote className="text-xl z-10 relative">
                            <p className="mb-4">"{project.testimonial.quote}"</p>
                            <footer className="font-medium">
                                — {project.testimonial.author}
                                {project.testimonial.position && (
                                    <span className="block text-sm text-gray-300">{project.testimonial.position}</span>
                                )}
                            </footer>
                        </blockquote>
                    </motion.div>
                )}

                {/* Call to Action */}
                <motion.div 
                    variants={itemVariants}
                    className="text-center"
                >
                    <h2 className="text-2xl font-bold mb-6">Ready to start your project?</h2>
                    <Link to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                        >
                            Contact Us Today
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ProjectDetail;