import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    FiHome, FiCheckCircle, FiCompass,
    FiWind, FiDroplet, FiSun,
    FiMap, FiAnchor, FiSunset, FiCloud,
} from 'react-icons/fi';
import { FaRuler } from 'react-icons/fa';
import { FireExtinguisher } from 'lucide-react';

const Stats = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [hoverDirection, setHoverDirection] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    // Vastu directions data with Marathi names and proper icons
    const vastuDirections = [
        { id: 1, name: 'उत्तर', angle: 0, color: '#60a5fa', element: 'Air', icon: <FiWind className="inline" /> },
        { id: 2, name: 'ईशान्य', angle: 45, color: '#34d399', element: 'Water', icon: <FiDroplet className="inline" /> },
        { id: 3, name: 'पूर्व', angle: 90, color: '#fbbf24', element: 'Sun', icon: <FiSun className="inline" /> },
        { id: 4, name: 'आग्नेय', angle: 135, color: '#f87171', element: 'Fire', icon: <FireExtinguisher className="inline" /> },
        { id: 5, name: 'दक्षिण', angle: 180, color: '#fb923c', element: 'Mars', icon: <FiMap className="inline" /> },
        { id: 6, name: 'नैऋत्य', angle: 225, color: '#a78bfa', element: 'Earth', icon: <FiAnchor className="inline" /> },
        { id: 7, name: 'पश्चिम', angle: 270, color: '#818cf8', element: 'Saturn', icon: <FiSunset className="inline" /> },
        { id: 8, name: 'वायव्य', angle: 315, color: '#7dd3fc', element: 'Wind', icon: <FiCloud className="inline" /> },
    ];

    // Pulsing animation for chakra points
    const pulseVariants = {
        pulse: {
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const stats = [
        {
            value: "35K+",
            label: "Total Square Foot Completed",
            description: "Vastu-compliant construction delivered",
            icon: <FaRuler className="text-2xl sm:text-3xl text-amber-400" />
        },
        {
            value: "10+",
            label: "Ongoing Projects",
            description: "Currently under development",
            icon: <FiHome className="text-2xl sm:text-3xl text-amber-400" />
        },
        {
            value: "20+",
            label: "Completed Projects",
            description: "Successfully delivered",
            icon: <FiCheckCircle className="text-2xl sm:text-3xl text-amber-400" />
        },
        {
            value: "100%",
            label: "Vastu Compliant",
            description: "All designs follow Vastu principles",
            icon: <FiCompass className="text-2xl sm:text-3xl text-amber-400" />
        },
    ];

    return (
        <div className="bg-black text-stone-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Vastu Chakra Section */}
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="flex flex-col items-center mb-16 sm:mb-20"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 py-2 text-transparent bg-clip-text bg-gradient-to-r from-stone-300 via-gray-200 to-stone-300 bg-[length:200%_auto] animate-gradient-shift"
                    >
                        Vastu-Compliant Design & Construction
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-sm sm:text-base text-amber-100 mb-12 text-center max-w-3xl"
                    >
                        Harmonizing spaces with ancient Vastu principles for prosperity and well-being
                    </motion.p>

                    <div className="relative w-full flex justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 120,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mb-10"
                        >
                            {/* Background Circle with subtle pattern */}
                            <div className="absolute inset-0 rounded-full bg-gray-900 border border-gray-800 shadow-lg" style={{
                                backgroundImage: `radial-gradient(circle at center, rgba(251, 191, 36, 0.05) 0%, transparent 70%)`
                            }}></div>

                            {/* Inner decorative rings */}
                            <div className="absolute inset-3 sm:inset-4 rounded-full border border-amber-900/30"></div>
                            <div className="absolute inset-6 sm:inset-8 rounded-full border border-amber-800/20"></div>

                            {/* Center Dot with pulsing animation */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 w-6 h-6 sm:w-8 sm:h-8 -mt-3 sm:-mt-4 -ml-3 sm:-ml-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 z-20"
                                variants={pulseVariants}
                                animate="pulse"
                            ></motion.div>

                            {/* Directions */}
                            {vastuDirections.map((direction) => (
                                <div key={direction.id}>
                                    <motion.div
                                        onMouseEnter={() => !isMobile && setHoverDirection(direction.id)}
                                        onMouseLeave={() => !isMobile && setHoverDirection(null)}
                                        onTouchStart={() => isMobile && setHoverDirection(direction.id)}
                                        onTouchEnd={() => isMobile && setHoverDirection(null)}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="absolute top-1/2 left-1/2 w-40 h-1 origin-left"
                                        style={{ transform: `rotate(${direction.angle}deg)` }}
                                    >
                                        <div
                                            className="absolute right-0 w-24 sm:w-32 h-0.5 transition-all duration-300"
                                            style={{
                                                background: `linear-gradient(to right, transparent, ${direction.color})`,
                                                opacity: hoverDirection === direction.id ? 1 : 0.7,
                                                height: hoverDirection === direction.id ? '2px' : '1px'
                                            }}
                                        ></div>

                                        <motion.div
                                            className="absolute right-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full -mt-1.5 sm:-mt-2 flex items-center justify-center"
                                            style={{ backgroundColor: direction.color }}
                                            variants={pulseVariants}
                                            animate="pulse"
                                        >
                                            {direction.icon}
                                        </motion.div>

                                        <div
                                            className={`absolute right-0 -mt-8 sm:-mt-10 text-xs sm:text-sm font-medium text-center w-24 sm:w-32 transition-all duration-300`}
                                            style={{
                                                color: direction.color,
                                                transform: `rotate(-${direction.angle}deg)`,
                                                opacity: hoverDirection === direction.id ? 1 : 0.8,
                                                fontWeight: hoverDirection === direction.id ? 'bold' : 'normal'
                                            }}
                                        >
                                            <div className="whitespace-nowrap">{direction.name}</div>
                                            <div className="text-[0.65rem] sm:text-xs opacity-80 mt-0.5">{direction.element} {direction.icon}</div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Outer rotating ring - only show on larger screens */}
                        {!isMobile && (
                            <motion.div
                                animate={{ rotate: -180 }}
                                transition={{
                                    duration: 180,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute inset-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border border-amber-900/30 pointer-events-none"
                                style={{
                                    backgroundImage: `repeating-conic-gradient(from 0deg, transparent 0deg 30deg, rgba(251, 191, 36, 0.02) 30deg 60deg)`
                                }}
                            ></motion.div>
                        )}
                    </div>

                    {/* <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-center max-w-3xl mt-8 text-stone-300 px-4"
          >
            Our architectural designs strictly adhere to ancient Vastu Shastra principles, creating spaces that
            harmonize with natural energies to promote health, prosperity, and positive energy flow.
          </motion.p> */}
                </motion.div>

                {/* Stats Highlights - Horizontal scroll on mobile */}
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                y: isMobile ? 0 : -5,
                                boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.2)",
                                backdropFilter: "blur(8px)"
                            }}
                            className={`
        bg-gradient-to-br from-gray-900/80 to-gray-800/90
        p-4 sm:p-5 rounded-xl shadow-lg
        border border-gray-700/50 group
        backdrop-blur-sm
        transition-all duration-300
        hover:border-amber-400/30 hover:from-gray-900/70 hover:to-gray-800/80
        ${isMobile ? 'h-full' : ''}
      `}
                        >
                            {/* Glassy overlay effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-amber-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="mb-2 sm:mb-3 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-400/10 group-hover:bg-amber-400/20 transition-colors duration-300">
                                    {React.cloneElement(stat.icon, {
                                        className: `${stat.icon.props.className} text-amber-400/90 group-hover:text-amber-300`
                                    })}
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-amber-100 transition-colors">
                                    {stat.value}
                                </h3>
                                <p className="text-sm sm:text-base font-medium text-stone-100 mb-1 leading-tight">
                                    {stat.label}
                                </p>
                                <p className="text-xs sm:text-sm text-stone-400/90 leading-snug">
                                    {stat.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Stats;