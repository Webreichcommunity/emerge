import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ourProjects } from '../../Data/OurProjects';

const ProjectDetail = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const galleryRef = useRef(null);

    useEffect(() => {
        // Find the project that matches the slug
        const foundProject = ourProjects.find(p => p.slug === slug);
        
        if (foundProject) {
            setProject(foundProject);
            // Add slight delay before showing content for better animation effect
            setTimeout(() => {
                setLoading(false);
                setTimeout(() => setShowDetails(true), 300);
            }, 800);
        } else {
            setLoading(false);
        }
        
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, [slug]);

    // Handle image swipe for mobile
    useEffect(() => {
        if (!galleryRef.current) return;
        
        let startX, endX;
        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
        };
        
        const handleTouchEnd = (e) => {
            endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) { // Swipe left
                nextImage();
            } else if (endX - startX > 50) { // Swipe right
                prevImage();
            }
        };
        
        const element = galleryRef.current;
        element.addEventListener('touchstart', handleTouchStart);
        element.addEventListener('touchend', handleTouchEnd);
        
        return () => {
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchend', handleTouchEnd);
        };
    }, [project]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center bg-black text-white">
                <motion.div
                    animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="w-16 h-16 mb-4 relative"
                >
                    <div className="absolute inset-0 rounded-full border-4 border-stone-500 opacity-30"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent"></div>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-stone-400 font-medium"
                >
                    Loading project...
                </motion.p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className=" bg-black text-white flex flex-col items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-md w-full bg-stone-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg"
                >
                    <motion.div
                        animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-5xl mb-6 mx-auto"
                    >
                        😕
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-stone-300 to-white bg-clip-text text-transparent">Project Not Found</h2>
                    <p className="mb-8 text-stone-400">We couldn't find the project you're looking for.</p>
                    <Link to="/ourwork">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg font-medium shadow-lg shadow-blue-700/20 w-full"
                        >
                            Back to Projects
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    const gallery = project.gallery || [project.mainImage];

    // Handle gallery navigation
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === (gallery.length - 1) ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? (gallery.length - 1) : prevIndex - 1
        );
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-black text-white"
        >
            {/* Hero Header with Parallax */}
            <motion.div 
                className="relative h-72 sm:h-96 w-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div 
                    className="absolute inset-0 z-0"
                    style={{ 
                        backgroundImage: `url(${gallery[0]})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                    initial={{ scale: 1.1, y: 0 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
                
                {/* Back Button - Floating Style */}
                <div className="absolute top-4 left-4 z-20">
                    <Link to="/ourwork">
                        <motion.button
                            whileHover={{ x: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-full shadow-lg"
                        >
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-medium">Back</span>
                        </motion.button>
                    </Link>
                </div>
                
                {/* Title Overlay */}
                <motion.div 
                    className="absolute inset-x-0 bottom-0 px-6 py-6 sm:py-8 z-20"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-300 drop-shadow-lg">
                        {project.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-1">
                        {project.category && (
                            <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-medium shadow-md">
                                {project.category}
                            </span>
                        )}
                    </div>
                </motion.div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tags */}
                <motion.div 
                    className="flex flex-wrap gap-2 mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    {project.tags && project.tags.map((tag, index) => (
                        <span 
                            key={index} 
                            className="bg-stone-800 bg-opacity-50 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-stone-300"
                        >
                            {tag}
                        </span>
                    ))}
                </motion.div>

                {/* Short Description */}
                <motion.p 
                    className="text-lg text-stone-300 mb-8 max-w-3xl border-l-2 border-stone-500 pl-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    {project.shortDescription}
                </motion.p>

                {/* Image Gallery - Full Width for Mobile */}
                <motion.div 
                    ref={galleryRef}
                    className="mb-12 relative overflow-hidden rounded-lg shadow-2xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <div className="relative w-full h-64 sm:h-80 md:h-[500px] bg-stone-900">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <img 
                                    src={gallery[currentImageIndex]} 
                                    alt={`${project.title} - Image ${currentImageIndex + 1}`} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </motion.div>
                        </AnimatePresence>
                        
                        {/* Navigation Controls */}
                        {gallery.length > 1 && (
                            <>
                                <button 
                                    onClick={prevImage}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 p-2 rounded-full z-10 shadow-lg"
                                    aria-label="Previous image"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={nextImage}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 p-2 rounded-full z-10 shadow-lg"
                                    aria-label="Next image"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                        
                        {/* Image Counter with Progress Bar */}
                        {gallery.length > 1 && (
                            <div className="absolute bottom-4 w-full flex justify-center z-10">
                                <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <span className="text-xs font-medium">
                                        {currentImageIndex + 1}/{gallery.length}
                                    </span>
                                    <div className="flex space-x-1">
                                        {gallery.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`w-2 h-2 rounded-full transition-all ${
                                                    idx === currentImageIndex 
                                                    ? 'bg-blue-500 w-4' 
                                                    : 'bg-stone-400'
                                                }`}
                                                aria-label={`Go to image ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Mobile-optimized grid layout */}
                <AnimatePresence>
                    {showDetails && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-12"
                        >
                            {/* Project Metadata Card - Mobile First */}
                            <motion.div 
                                className="bg-stone-900/70 backdrop-blur-sm p-6 rounded-2xl mb-8 shadow-lg border border-stone-800"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h2 className="text-xl font-bold mb-6 border-b border-stone-700 pb-2 text-stone-200">
                                    Project Details
                                </h2>
                                
                                <div className="grid grid-cols-2 gap-y-4">
                                    <div>
                                        <h3 className="text-xs uppercase tracking-wider text-stone-500 mb-1">Client</h3>
                                        <p className="font-medium text-white">{project.client}</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-xs uppercase tracking-wider text-stone-500 mb-1">Year</h3>
                                        <p className="font-medium text-white">{project.date}</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-xs uppercase tracking-wider text-stone-500 mb-1">Category</h3>
                                        <p className="font-medium text-white">{project.category}</p>
                                    </div>
                                    
                                    {project.location && (
                                        <div>
                                            <h3 className="text-xs uppercase tracking-wider text-stone-500 mb-1">Location</h3>
                                            <p className="font-medium text-white">{project.location}</p>
                                        </div>
                                    )}
                                    
                                    {project.squareFootage && (
                                        <div className="col-span-2">
                                            <h3 className="text-xs uppercase tracking-wider text-stone-500 mb-1">Size</h3>
                                            <p className="font-medium text-white">{project.squareFootage}</p>
                                        </div>
                                    )}
                                    
                                    {project.website && (
                                        <div className="col-span-2 mt-2">
                                            <h3 className="text-xs uppercase tracking-wider text-stone-500 mb-1">Website</h3>
                                            <a 
                                                href={project.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                                            >
                                                Visit Site
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Project Description */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-stone-300 bg-clip-text text-transparent">
                                    Project Overview
                                </h2>
                                <div className="prose prose-invert prose-stone max-w-none">
                                    {project.description.split('\n\n').map((paragraph, idx) => (
                                        <motion.p 
                                            key={idx} 
                                            className="mb-4 text-stone-300 leading-relaxed"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * idx, duration: 0.5 }}
                                        >
                                            {paragraph}
                                        </motion.p>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial Section - Enhanced */}
                            {project.testimonial && (
                                <motion.div 
                                    className="mb-12 overflow-hidden"
                                    whileInView={{ scale: [0.98, 1] }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="bg-gradient-to-r from-blue-900/70 to-indigo-900/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-lg border border-blue-800/30">
                                        <div className="absolute -right-10 -top-10 text-8xl opacity-10">
                                            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 11H6C3.79086 11 2 9.20914 2 7V6C2 3.79086 3.79086 2 6 2H7C9.20914 2 11 3.79086 11 6V10C11 16.0751 6.07513 21 0 21V20C5.52285 20 10 15.5228 10 10V11ZM23 11H19C16.7909 11 15 9.20914 15 7V6C15 3.79086 16.7909 2 19 2H20C22.2091 2 24 3.79086 24 6V10C24 16.0751 19.0751 21 13 21V20C18.5228 20 23 15.5228 23 10V11Z"/>
                                            </svg>
                                        </div>
                                        
                                        <blockquote className="text-lg sm:text-xl z-10 relative">
                                            <motion.p 
                                                className="mb-4 text-white"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                transition={{ duration: 1 }}
                                            >
                                                "{project.testimonial.quote}"
                                            </motion.p>
                                            <footer className="font-medium flex items-center mt-4">
                                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-lg font-bold">
                                                    {project.testimonial.author.charAt(0)}
                                                </div>
                                                <div>
                                                    <span className="block text-white">— {project.testimonial.author}</span>
                                                    {project.testimonial.position && (
                                                        <span className="block text-sm text-stone-300">{project.testimonial.position}</span>
                                                    )}
                                                </div>
                                            </footer>
                                        </blockquote>
                                    </div>
                                </motion.div>
                            )}

                            {/* Call to Action - Enhanced for Mobile */}
                            <motion.div 
                                className="text-center bg-gradient-to-b from-black to-stone-900 p-6 rounded-2xl border border-stone-800"
                                whileInView={{ y: [10, 0], opacity: [0, 1] }}
                                transition={{ duration: 0.6 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-stone-300 bg-clip-text text-transparent">
                                        Ready to start your project?
                                    </h2>
                                    <p className="text-stone-400 mb-6">
                                        Let's bring your vision to life. Reach out to discuss your ideas.
                                    </p>
                                    <Link to="/contact">
                                        <motion.button
                                            whileHover={{ 
                                                scale: 1.05, 
                                                boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" 
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-medium shadow-lg shadow-blue-700/20"
                                        >
                                            <span className="flex items-center justify-center">
                                                Contact Us Today
                                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default ProjectDetail;