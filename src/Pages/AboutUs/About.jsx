import React, { useState } from 'react';
import { motion } from 'framer-motion';

function About() {
    const [showFullMission, setShowFullMission] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);
    
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };
    
    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };
    
    // Engineer data
    const engineers = [
        {
            id: 1,
            name: "Er. Purvesh R. Sakarkar",
            title: "Civil Engineer",
            image: "nande.JPG",
            shortBio: "Structural design expert bringing innovative engineering solutions to complex projects.",
            fullBio: "With expertise in structural design and analysis, Purvesh brings innovative engineering solutions to our most complex projects. His leadership ensures all structures exceed safety standards while maintaining architectural integrity.",
            quote: "Engineering isn't just about calculations—it's about creating structures that elevate human experience.",
            stats: [
                { value: "5+", label: "Years Exp.", color: "orange" },
                { value: "M.E", label: "Civil Eng.", color: "red" },
                { value: "30+", label: "Projects", color: "pink" }
            ]
        },
        {
            id: 2,
            name: "Er. Bhushan V. Kale",
            title: "Civil Engineering",
            image: "nande.JPG",
            shortBio: "Sustainable construction specialist with focus on eco-friendly design practices.",
            fullBio: "Bhushan specializes in sustainable construction practices and eco-friendly design. His innovative approach to civil engineering has earned our company multiple green building certifications and industry recognition.",
            quote: "The best engineering solutions work with nature, not against it—balancing progress with preservation.",
            stats: [
                { value: "5+", label: "Years Exp.", color: "blue" },
                { value: "B.E", label: "Civil", color: "indigo" },
                { value: "5+", label: "Awards", color: "purple" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50" id='about'>
            {/* Hero Section with Modern Design */}
            <motion.div 
                className="relative py-12 md:py-16 bg-black overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
            >
                <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                    <motion.h1 
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4"
                        variants={fadeIn}
                    >
                        Building Dreams, Crafting Reality
                    </motion.h1>
                    <motion.p 
                        className="text-base md:text-lg text-white opacity-90 max-w-2xl mx-auto"
                        variants={fadeIn}
                    >
                        With over 20 years of excellence in construction, we transform visions into lasting structures.
                    </motion.p>
                </div>
                
                {/* Abstract background elements */}
                <motion.div 
                    className="absolute top-0 right-0 w-64 h-64 rounded-full bg-stone-500 opacity-20 -mr-32 -mt-32"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                
                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 w-full h-6 md:h-12 bg-gray-50" style={{
                    clipPath: "polygon(0 100%, 100% 100%, 100% 0)"
                }}></div>
            </motion.div>

            {/* Content Section with Clean Design */}
            <div className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="container mx-auto max-w-6xl">
                    <motion.div 
                        className="flex flex-col md:flex-row items-center gap-6 md:gap-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerChildren}
                    >
                        {/* Image Section */}
                        <motion.div 
                            className="w-full md:w-5/12 relative mb-6 md:mb-0"
                            variants={fadeIn}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg transform rotate-2 scale-105 shadow-lg"></div>
                            <img
                                src="/nande.JPG"
                                alt="Construction Professional"
                                className="relative w-full h-full object-cover rounded-lg border-2 border-white shadow-lg z-10"
                            />
                            <motion.div 
                                className="absolute -bottom-2 -right-2 bg-stone-500 text-white p-2 rounded-lg shadow-lg z-20 text-sm"
                                whileHover={{ scale: 1.05 }}
                            >
                                <p className="font-bold">20+ Years Excellence</p>
                            </motion.div>
                        </motion.div>

                        {/* About Text */}
                        <motion.div 
                            className="w-full md:w-7/12 space-y-4"
                            variants={fadeIn}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                                <span className="text-stone-500">About</span> Our Company
                            </h2>

                            <p className="text-base md:text-lg text-gray-700">
                                Founded in 2003, <span className="font-semibold text-stone-400">Premier Construction</span> has been at the forefront of construction excellence, delivering high-quality residential and commercial projects across the region.
                            </p>

                            {/* Mission & Vision with Read More */}
                            <motion.div 
                                className="bg-white backdrop-filter backdrop-blur-sm bg-opacity-70 p-4 rounded-lg shadow-md border-l-4 border-stone-500"
                                whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission & Vision</h3>
                                <p className="text-gray-700 text-sm md:text-base">
                                    {showFullMission ? (
                                        <>
                                            To build sustainable, safe, and aesthetically pleasing structures while maintaining the highest standards of quality and client satisfaction. We aim to be the region's most trusted construction partner, known for integrity, innovation, and excellence in every project we undertake. Our vision encompasses creating spaces that positively impact communities while embracing cutting-edge construction technologies.
                                        </>
                                    ) : (
                                        <>
                                            To build sustainable, safe, and aesthetically pleasing structures while maintaining the highest standards of quality and client satisfaction...
                                        </>
                                    )}
                                </p>
                                <motion.button
                                    className="mt-2 text-stone-600 text-sm font-medium flex items-center hover:text-stone-700"
                                    onClick={() => setShowFullMission(!showFullMission)}
                                    whileHover={{ scale: 1.03 }}
                                >
                                    {showFullMission ? 'Show Less' : 'Read More'}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {showFullMission ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        )}
                                    </svg>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Engineers Section - Modern Card Design */}
                    <motion.div 
                        className="mt-12 md:mt-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerChildren}
                    >
                        <motion.h2 
                            className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-8"
                            variants={fadeIn}
                        >
                            <span className="text-stone-500">Meet</span> Our Lead Engineers
                        </motion.h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {engineers.map((engineer) => (
                                <motion.div 
                                    key={engineer.id}
                                    className="relative bg-white bg-opacity-50 backdrop-filter backdrop-blur-md rounded-xl shadow-lg overflow-hidden group"
                                    variants={fadeIn}
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative h-52">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                                        <img
                                            src={engineer.image}
                                            alt={engineer.name}
                                            className="w-full h-full object-cover object-center"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                            <h3 className="text-xl font-bold mb-1 drop-shadow-md">{engineer.name}</h3>
                                            <p className="text-sm font-medium bg-black bg-opacity-40 inline-block px-2 py-1 rounded-full">
                                                {engineer.title}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="p-4">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {engineer.stats.map((stat, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`bg-${stat.color}-100 p-1.5 rounded-md text-center w-22`}
                                                >
                                                    <span className={`font-bold text-${stat.color}-600 text-xs`}> {stat.value}  <p className={`text-${stat.color}-800 text-xs`}>  {stat.label}</p></span>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <p className="text-gray-700 text-sm">
                                            {expandedCard === engineer.id ? engineer.fullBio : engineer.shortBio}
                                        </p>
                                        
                                        {expandedCard === engineer.id && (
                                            <motion.div 
                                                className="mt-3 pt-3 border-t border-gray-200"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <p className="italic text-gray-600 text-xs">
                                                    "{engineer.quote}"
                                                </p>
                                            </motion.div>
                                        )}
                                        
                                        <motion.button
                                            className="mt-3 text-orange-600 text-xs font-medium flex items-center hover:text-orange-700"
                                            onClick={() => setExpandedCard(expandedCard === engineer.id ? null : engineer.id)}
                                            whileHover={{ scale: 1.03 }}
                                        >
                                            {expandedCard === engineer.id ? 'Show Less' : 'Read More'}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                {expandedCard === engineer.id ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                )}
                                            </svg>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default About;