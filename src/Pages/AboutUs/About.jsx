import React from 'react';

function About() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Black Background */}
            <div className="relative py-16 md:py-24 bg-black">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">Building Dreams, Crafting Reality</h1>
                    <p className="text-lg md:text-xl text-white opacity-90 max-w-3xl mx-auto">
                        With over 20 years of excellence in construction, we transform visions into lasting structures.
                    </p>
                </div>
                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 w-full h-8 md:h-16 bg-white" style={{
                    clipPath: "polygon(0 100%, 100% 100%, 100% 0)"
                }}></div>
            </div>

            {/* Content Section with Custom Background */}
            <div className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-gray-900" style={{
                background: "radial-gradient(circle at 70% 80%, rgba(255,165,0,0.5) 0%, transparent 25%), linear-gradient(135deg, #ffffff 0%, #fff0f5 50%, #ffebcd 100%)"
            }}>
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        {/* Enhanced Image Section */}
                        <div className="w-full md:w-1/2 relative mb-8 md:mb-0">
                            <div className="absolute inset-0 bg-gradient-to-r from-stone-500 to-stone-800 rounded-xl md:rounded-2xl transform rotate-3 scale-105 shadow-xl"></div>
                            <img
                                src="/nande.JPG"
                                alt="Construction Professional"
                                className="relative w-full rounded-lg md:rounded-xl shadow-xl border-4 md:border-8 border-white hover:scale-105 transition-transform duration-300 z-10"
                            />
                            <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-orange-500 text-white p-2 md:p-4 rounded-lg shadow-lg z-20 text-sm md:text-base">
                                <p className="font-bold">20+ Years Excellence</p>
                            </div>
                        </div>

                        {/* About Text */}
                        <div className="w-full md:w-1/2 space-y-4 md:space-y-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                                <span className="text-orange-500">About</span> Our Company
                            </h2>

                            <p className="text-lg md:text-xl text-gray-700">
                                Founded in 2003, <span className="font-semibold text-red-500">Premier Construction</span> has been at the forefront of construction excellence, delivering high-quality residential and commercial projects across the region.
                            </p>

                            <p className="text-lg md:text-xl text-gray-700">
                                Our team of <span className="text-pink-500 font-medium">certified professionals</span> brings innovation, precision, and dedication to every project, ensuring structures that stand the test of time.
                            </p>

                            <div className="bg-white bg-opacity-80 p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border-l-4 border-orange-500">
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-3">Our Mission</h3>
                                <p className="text-gray-700 text-base md:text-lg">
                                    To build sustainable, safe, and aesthetically pleasing structures while maintaining the highest standards of quality and client satisfaction.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Engineers Section - Improved for mobile */}
                    <div className="mt-16 md:mt-24">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
                            <span className="text-orange-500">Meet</span> Our Lead Engineers
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12">
                            {/* Engineer Card 1 */}
                            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden group">
                                <div className="relative h-64 md:h-80">
                                    <div className="absolute inset-0 bg-gradient-to-r from-white-500 to-stone-300 opacity-90"></div>
                                    <img
                                        src="nande.JPG"
                                        alt="Chief Engineer"
                                        className="w-full h-full object-cover object-center opacity-75 group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2">Er. Purvesh R. Sakarkar</h3>
                                        <p className="text-base md:text-xl font-semibold bg-black bg-opacity-40 inline-block px-2 md:px-3 py-1 rounded-full">
                                            Civil Engineer
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 md:p-8">
                                    <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
                                        <div className="bg-orange-100 p-2 md:p-3 rounded-full text-center">
                                            <span className="font-bold text-orange-600 text-sm md:text-base">5+</span>
                                            <p className="text-orange-800 text-xs md:text-sm">Years Exp.</p>
                                        </div>
                                        <div className="bg-red-100 p-2 md:p-3 rounded-full text-center">
                                            <span className="font-bold text-red-600 text-sm md:text-base">M.E</span>
                                            <p className="text-red-800 text-xs md:text-sm">Civil Eng.</p>
                                        </div>
                                        <div className="bg-pink-100 p-2 md:p-3 rounded-full text-center">
                                            <span className="font-bold text-pink-600 text-sm md:text-base">30+</span>
                                            <p className="text-pink-800 text-xs md:text-sm">Projects</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-base md:text-lg">
                                        With expertise in structural design and analysis, Purvesh brings innovative engineering solutions to our most complex projects. His leadership ensures all structures exceed safety standards while maintaining architectural integrity.
                                    </p>
                                    <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                                        <p className="italic text-gray-600 text-sm md:text-base">
                                            "Engineering isn't just about calculations—it's about creating structures that elevate human experience."
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Engineer Card 2 */}
                            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden group">
                                <div className="relative h-64 md:h-80">
                                    <div className="absolute inset-0 bg-gradient-to-r from-stone-300 to-white-400 opacity-90"></div>
                                    <img
                                        src="/about.JPG"
                                        alt="Civil Engineer"
                                        className="w-full h-full object-cover object-center opacity-75 group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2">Er. Bhushan V. Kale</h3>
                                        <p className="text-base md:text-xl font-semibold bg-black bg-opacity-40 inline-block px-2 md:px-3 py-1 rounded-full">
                                            Civil Engineering
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 md:p-8">
                                    <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
                                        <div className="bg-blue-100 p-2 md:p-3 rounded-full text-center">
                                            <span className="font-bold text-blue-600 text-sm md:text-base">5+</span>
                                            <p className="text-blue-800 text-xs md:text-sm">Years Exp.</p>
                                        </div>
                                        <div className="bg-indigo-100 p-2 md:p-3 rounded-full text-center">
                                            <span className="font-bold text-indigo-600 text-sm md:text-base">B.E</span>
                                            <p className="text-indigo-800 text-xs md:text-sm">Civil</p>
                                        </div>
                                        <div className="bg-purple-100 p-2 md:p-3 rounded-full text-center">
                                            <span className="font-bold text-purple-600 text-sm md:text-base">5+</span>
                                            <p className="text-purple-800 text-xs md:text-sm">Awards</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-base md:text-lg">
                                        Bhushan specializes in sustainable construction practices and eco-friendly design. His innovative approach to civil engineering has earned our company multiple green building certifications and industry recognition.
                                    </p>
                                    <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                                        <p className="italic text-gray-600 text-sm md:text-base">
                                            "The best engineering solutions work with nature, not against it—balancing progress with preservation."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;