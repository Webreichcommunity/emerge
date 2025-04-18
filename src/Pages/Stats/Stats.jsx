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
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
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
            icon: <FaRuler className="text-2xl sm:text-3xl" />
        },
        {
            value: "10+",
            label: "Ongoing Projects",
            description: "Currently under development",
            icon: <FiHome className="text-2xl sm:text-3xl" />
        },
        {
            value: "20+",
            label: "Completed Projects",
            description: "Successfully delivered",
            icon: <FiCheckCircle className="text-2xl sm:text-3xl" />
        },
        {
            value: "100%",
            label: "Vastu Compliant",
            description: "All designs follow Vastu principles",
            icon: <FiCompass className="text-2xl sm:text-3xl" />
        },
    ];

    return (
        <div className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-gray-900 bg-white" >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-gradient-to-r from-stone-100 to-stone-50 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-gradient-to-r from-gray-100 to-gray-100 rounded-full opacity-10 blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Title Section */}
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mb-12 lg:mb-16"
                >
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-stone-800 to-stone-600"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Vastu-Compliant Design & Construction
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-gray-600 max-w-3xl mx-auto"
                    >
                        Harmonizing spaces with ancient Vastu principles for prosperity and well-being
                    </motion.p>
                </motion.div>

                {/* Main Content - Desktop Layout */}
                <div className="hidden lg:flex flex-row items-center justify-between gap-12">
                    {/* left Side - Vastu Chakra */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="w-1/2 flex justify-center"
                    >
                        <div className="relative w-full max-w-md">
                            {/* Main Chakra */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 120,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="relative w-full aspect-square"
                            >
                                {/* Background Circle with subtle pattern */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-lg"></div>

                                {/* Inner decorative rings */}
                                <div className="absolute inset-4 rounded-full border-2 border-amber-300/30"></div>
                                <div className="absolute inset-8 rounded-full border border-amber-400/20"></div>

                                {/* Center Dot with pulsing animation */}
                                <motion.div
                                    className="absolute top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30 z-20"
                                    variants={pulseVariants}
                                    animate="pulse"
                                ></motion.div>

                                {/* Directions */}
                                {vastuDirections.map((direction) => (
                                    <div key={direction.id}>
                                        <motion.div
                                            onMouseEnter={() => setHoverDirection(direction.id)}
                                            onMouseLeave={() => setHoverDirection(null)}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="absolute top-1/2 left-1/2 w-1/2 h-1 origin-left"
                                            style={{ transform: `rotate(${direction.angle}deg)` }}
                                        >
                                            <div
                                                className="absolute right-0 w-1/2 h-1 transition-all duration-300"
                                                style={{
                                                    background: `linear-gradient(to right, transparent, ${direction.color})`,
                                                    opacity: hoverDirection === direction.id ? 1 : 0.7,
                                                    height: hoverDirection === direction.id ? '3px' : '2px'
                                                }}
                                            ></div>

                                            <motion.div
                                                className="absolute right-0 w-5 h-5 rounded-full -mt-2 flex items-center justify-center shadow-md"
                                                style={{ backgroundColor: direction.color }}
                                                variants={pulseVariants}
                                                animate={hoverDirection === direction.id ? "pulse" : "pulse"}
                                            >
                                                {direction.icon}
                                            </motion.div>

                                            <div
                                                className={`absolute right-0 -mt-12 text-sm font-medium text-center w-32 transition-all duration-300`}
                                                style={{
                                                    color: direction.color,
                                                    transform: `rotate(-${direction.angle}deg)`,
                                                    opacity: hoverDirection === direction.id ? 1 : 0.8,
                                                    fontWeight: hoverDirection === direction.id ? 'bold' : 'normal'
                                                }}
                                            >
                                                <div className="whitespace-nowrap">{direction.name}</div>
                                                <div className="text-xs opacity-80 mt-1">{direction.element} {direction.icon}</div>
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Outer rotating ring */}
                            <motion.div
                                animate={{ rotate: -180 }}
                                transition={{
                                    duration: 180,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute inset-0 rounded-full border-2 border-amber-300/20 pointer-events-none"
                                style={{
                                    backgroundImage: `repeating-conic-gradient(from 0deg, transparent 0deg 30deg, rgba(251, 191, 36, 0.05) 30deg 60deg)`
                                }}
                            ></motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side - Stats Cards */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="w-1/2 grid grid-cols-2 gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{
                                    y: -5,
                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                }}
                                className={`
                                    bg-white p-6 rounded-xl shadow-md
                                    border border-gray-200 group
                                    transition-all duration-300
                                    hover:border-amber-300 hover:shadow-lg
                                    ${index < 2 ? 'mb-6' : ''}
                                `}
                            >
                                <div className="relative z-10">
                                    <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 group-hover:bg-amber-200 transition-colors duration-300">
                                        {React.cloneElement(stat.icon, {
                                            className: `${stat.icon.props.className} text-amber-600 group-hover:text-amber-700`
                                        })}
                                    </div>

                                    <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                                        {stat.value}
                                    </h3>
                                    <p className="text-lg font-medium text-gray-800 mb-2 leading-tight">
                                        {stat.label}
                                    </p>
                                    <p className="text-sm text-gray-600 leading-snug">
                                        {stat.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden">
                    {/* Vastu Chakra Section */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="flex justify-center mb-12"
                    >
                        <div className="relative w-full max-w-xs">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 120,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="relative w-full aspect-square"
                            >
                                {/* Background Circle with subtle pattern */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-lg"></div>

                                {/* Inner decorative rings */}
                                <div className="absolute inset-3 rounded-full border border-amber-300/30"></div>
                                <div className="absolute inset-6 rounded-full border border-amber-400/20"></div>

                                {/* Center Dot with pulsing animation */}
                                <motion.div
                                    className="absolute top-1/2 left-1/2 w-6 h-6 -mt-3 -ml-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30 z-20"
                                    variants={pulseVariants}
                                    animate="pulse"
                                ></motion.div>

                                {/* Directions */}
                                {vastuDirections.map((direction) => (
                                    <div key={direction.id}>
                                        <motion.div
                                            onTouchStart={() => setHoverDirection(direction.id)}
                                            onTouchEnd={() => setHoverDirection(null)}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="absolute top-1/2 left-1/2 w-1/2 h-1 origin-left"
                                            style={{ transform: `rotate(${direction.angle}deg)` }}
                                        >
                                            <div
                                                className="absolute right-0 w-1/2 h-1 transition-all duration-300"
                                                style={{
                                                    background: `linear-gradient(to right, transparent, ${direction.color})`,
                                                    opacity: hoverDirection === direction.id ? 1 : 0.7,
                                                    height: hoverDirection === direction.id ? '2px' : '1px'
                                                }}
                                            ></div>

                                            <motion.div
                                                className="absolute right-0 w-4 h-4 rounded-full -mt-2 flex items-center justify-center shadow-md"
                                                style={{ backgroundColor: direction.color }}
                                                variants={pulseVariants}
                                                animate={hoverDirection === direction.id ? "pulse" : "pulse"}
                                            >
                                                {direction.icon}
                                            </motion.div>

                                            <div
                                                className={`absolute right-0 -mt-10 text-xs font-medium text-center w-24 transition-all duration-300`}
                                                style={{
                                                    color: direction.color,
                                                    transform: `rotate(-${direction.angle}deg)`,
                                                    opacity: hoverDirection === direction.id ? 1 : 0.8,
                                                    fontWeight: hoverDirection === direction.id ? 'bold' : 'normal'
                                                }}
                                            >
                                                <div className="whitespace-nowrap">{direction.name}</div>
                                                <div className="text-[0.65rem] opacity-80 mt-0.5">{direction.element} {direction.icon}</div>
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Stats Cards - Mobile */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="grid grid-cols-2 gap-4"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                            >
                                <div className="mb-3 flex items-center justify-center w-10 h-10 rounded-full bg-amber-100">
                                    {React.cloneElement(stat.icon, {
                                        className: `${stat.icon.props.className} text-amber-600`
                                    })}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                    {stat.value}
                                </h3>
                                <p className="text-sm font-medium text-gray-800 mb-1 leading-tight">
                                    {stat.label}
                                </p>
                                <p className="text-xs text-gray-600 leading-snug">
                                    {stat.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Stats;