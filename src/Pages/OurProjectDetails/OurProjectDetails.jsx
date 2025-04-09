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
            <div className="flex flex-col items-center justify-center min-h-screen" style={{
                background: `radial-gradient(circle at 70% 80%, rgba(255,165,0,0.5) 0%, transparent 25%),
                linear-gradient(135deg, #ffffff 0%, #fff0f5 50%, #ffebcd 100%)`
            }}>
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
                    <div className="absolute inset-0 rounded-full border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent"></div>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-stone-700 font-medium"
                >
                    Loading project...
                </motion.p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{
                background: `radial-gradient(circle at 70% 80%, rgba(255,165,0,0.5) 0%, transparent 25%),
                linear-gradient(135deg, #ffffff 0%, #fff0f5 50%, #ffebcd 100%)`
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-md w-full bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/40"
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
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">Project Not Found</h2>
                    <p className="mb-8 text-stone-500">We couldn't find the project you're looking for.</p>
                    <Link to="/ourwork">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-lg font-medium shadow-lg shadow-orange-500/20 w-full"
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
            className="relative min-h-screen overflow-hidden text-gray-900"
            style={{
                background: `radial-gradient(circle at 70% 80%, rgba(255,165,0,0.5) 0%, transparent 25%),
                linear-gradient(135deg, #ffffff 0%, #fff0f5 50%, #ffebcd 100%)`
            }}
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
                        backgroundImage: `url(${project.mainImage})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                    initial={{ scale: 1.1, y: 0 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent z-10" />
                
                {/* Back Button - Floating Style */}
                <div className="absolute top-4 left-4 z-20">
                    <Link to="/ourwork">
                        <motion.button
                            whileHover={{ x: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center bg-white/80 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full shadow-lg border border-white/40"
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
                    className="absolute inset-x-0 bottom-0 px-6 py-4 sm:py-6 z-20" // Reduced padding for better alignment
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                        {project.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 mt-2"> {/* Added margin-top for spacing */}
                        {project.category && (
                            <span className="bg-orange-500 px-3 py-1 rounded-full text-xs text-white font-medium shadow-md">
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
                            className="bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-stone-700 border border-white/40"
                        >
                            {tag}
                        </span>
                    ))}
                </motion.div>

                {/* Short Description */}
                <motion.p 
                    className="text-lg text-stone-700 mb-8 max-w-3xl border-l-2 border-orange-400 pl-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    {project.shortDescription}
                </motion.p>

                {/* Image Gallery - Full Width for Mobile with improved glass styling */}
                <motion.div 
                    ref={galleryRef}
                    className="mb-12 relative overflow-hidden rounded-2xl shadow-2xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <div className="relative w-full h-64 sm:h-80 md:h-96 bg-stone-100 overflow-hidden">
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
                            </motion.div>
                        </AnimatePresence>
                        
                        {/* Navigation Controls - Improved */}
                        {gallery.length > 1 && (
                            <>
                                <button 
                                    onClick={prevImage}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/80 backdrop-blur-sm p-3 rounded-full z-10 shadow-lg border border-white/40"
                                    aria-label="Previous image"
                                >
                                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={nextImage}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/80 backdrop-blur-sm p-3 rounded-full z-10 shadow-lg border border-white/40"
                                    aria-label="Next image"
                                >
                                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                        
                        {/* Image Counter with Progress Bar - Enhanced */}
                        {gallery.length > 1 && (
                            <div className="absolute bottom-4 w-full flex justify-center z-10">
                                <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
                                    <span className="text-xs font-medium text-gray-900">
                                        {currentImageIndex + 1}/{gallery.length}
                                    </span>
                                    <div className="flex space-x-1">
                                        {gallery.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`w-2 h-2 rounded-full transition-all ${
                                                    idx === currentImageIndex 
                                                    ? 'bg-orange-500 w-6' 
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

                {/* Mobile-optimized compact grid layout */}
                <AnimatePresence>
                    {showDetails && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {/* Project Metadata Card - Glass effect */}
                            <motion.div 
                                className="bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/40 md:col-span-1 h-fit"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h2 className="text-xl font-bold mb-6 border-b border-stone-200 pb-2 text-gray-900">
                                    Project Details
                                </h2>
                                
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-xs uppercase tracking-wider text-stone-500 mb-1">Client</h3>
                                        <p className="font-medium text-gray-900">{project.client}</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-xs uppercase tracking-wider text-stone-500 mb-1">Timeline</h3>
                                        <p className="font-medium text-gray-900">{project.date}</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-xs uppercase tracking-wider text-stone-500 mb-1">Category</h3>
                                        <p className="font-medium text-gray-900">{project.category}</p>
                                    </div>
                                    
                                    {project.totalSqFt && (
                                        <div>
                                            <h3 className="text-xs uppercase tracking-wider text-stone-500 mb-1">Total Area</h3>
                                            <p className="font-medium text-gray-900">{project.totalSqFt}</p>
                                        </div>
                                    )}
                                    
                                    {project.totalCost && (
                                        <div>
                                            <h3 className="text-xs uppercase tracking-wider text-stone-500 mb-1">Budget</h3>
                                            <p className="font-medium text-gray-900">{project.totalCost}</p>
                                        </div>
                                    )}
                                    
                                    {project.website && (
                                        <div className="pt-2">
                                            <h3 className="text-xs uppercase tracking-wider text-stone-500 mb-1">Website</h3>
                                            <a 
                                                href={project.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
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

                            {/* Project Description and Testimonial - Combined for better layout */}
                            <div className="md:col-span-2 space-y-6">
                                {/* Project Description - Enhanced with glass effect */}
                                <motion.div 
                                    className="bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/40"
                                    whileHover={{ y: -3 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-stone-200 pb-2">
                                        Project Overview
                                    </h2>
                                    <div className="prose max-w-none">
                                        {project.description.split('\n\n').map((paragraph, idx) => (
                                            <motion.p 
                                                key={idx} 
                                                className="mb-4 text-stone-700 leading-relaxed"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                                            >
                                                {paragraph}
                                            </motion.p>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Testimonial Section - Elegant glass effect */}
                                {project.testimonial && (
                                    <motion.div 
                                        className="overflow-hidden"
                                        whileInView={{ scale: [0.98, 1] }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <div className="bg-gradient-to-r from-orange-100 to-amber-100 backdrop-blur-md p-6 rounded-2xl relative overflow-hidden shadow-lg border border-orange-200">
                                            <div className="absolute -right-10 -top-10 text-8xl opacity-10 text-orange-500">
                                                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 11H6C3.79086 11 2 9.20914 2 7V6C2 3.79086 3.79086 2 6 2H7C9.20914 2 11 3.79086 11 6V10C11 16.0751 6.07513 21 0 21V20C5.52285 20 10 15.5228 10 10V11ZM23 11H19C16.7909 11 15 9.20914 15 7V6C15 3.79086 16.7909 2 19 2H20C22.2091 2 24 3.79086 24 6V10C24 16.0751 19.0751 21 13 21V20C18.5228 20 23 15.5228 23 10V11Z"/>
                                                </svg>
                                            </div>
                                            
                                            <blockquote className="text-lg z-10 relative">
                                                <motion.p 
                                                    className="mb-4 text-gray-900 italic"
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    transition={{ duration: 1 }}
                                                >
                                                    "{project.testimonial.quote}"
                                                </motion.p>
                                                <footer className="font-medium flex items-center mt-4">
                                                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center mr-3 text-lg font-bold">
                                                        {project.testimonial.author.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <span className="block text-gray-900 font-semibold">— {project.testimonial.author}</span>
                                                        {project.testimonial.position && (
                                                            <span className="block text-sm text-stone-500">{project.testimonial.position}</span>
                                                        )}
                                                    </div>
                                                </footer>
                                            </blockquote>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Call to Action - Full width with elegant gradient */}
                            <motion.div 
                                className="text-center bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl shadow-lg border border-orange-100 md:col-span-3 mt-2"
                                whileInView={{ y: [10, 0], opacity: [0, 1] }}
                                transition={{ duration: 0.6 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                    className="max-w-2xl mx-auto"
                                >
                                    <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                        Ready to start your project?
                                    </h2>
                                    <p className="text-stone-500 mb-6">
                                        Let's bring your vision to life. Reach out to discuss your ideas.
                                    </p>
                                    <Link to="/contact">
                                        <motion.button
                                            whileHover={{ 
                                                scale: 1.05, 
                                                boxShadow: "0 0 15px rgba(245, 158, 11, 0.5)" 
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium shadow-lg shadow-orange-500/20"
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