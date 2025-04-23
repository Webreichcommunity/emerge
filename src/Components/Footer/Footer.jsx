import React from 'react';
import { Linkedin, Instagram, Clock, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        {/* Logo */}
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                                <img src="/logo.png" alt="Emerge Construction" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-stone-200 font-bold text-xl">Emerge Construction</span>
                        </div>

                        <p className="text-gray-300 leading-relaxed mb-6">
                            Building the future with precision and excellence. Emerge Constructions delivers world-class infrastructure solutions with unmatched quality and timely execution.
                        </p>
                        
                        <div className="flex items-center space-x-2 text-gray-300 mb-6">
                            <Clock className="w-5 h-5 text-stone-500" />
                            <span>Mon-Sat: 11:00 AM - 7:00 PM</span>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-5">
                            <a href="https://www.youtube.com/channel/UC7H82Mxei7P9m6Gw3KssINw" 
                               className="hover:scale-110 transition-transform" 
                               aria-label="LinkedIn">
                                <Linkedin className="w-6 h-6 text-blue-400 hover:text-blue-300" />
                            </a>
                            <a href="https://www.instagram.com/emerge_construction" 
                               className="hover:scale-110 transition-transform" 
                               aria-label="Instagram">
                                <Instagram className="w-6 h-6 text-pink-400 hover:text-pink-300" />
                            </a>
                            <a href="https://wa.me/918698165330" 
                               className="hover:scale-110 transition-transform" 
                               aria-label="WhatsApp">
                                <svg className="w-6 h-6 text-green-400 hover:text-green-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="mt-8 md:mt-0">
                        <h3 className="text-stone-500 font-semibold text-lg mb-6 border-b border-gray-800 pb-2">Our Services</h3>
                        <ul className="grid grid-cols-2 gap-y-3 gap-x-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-stone-400 transition-colors flex items-center">
                                    <span className="text-stone-500 mr-2">•</span>
                                    Planning
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-stone-400 transition-colors flex items-center">
                                    <span className="text-stone-500 mr-2">•</span>
                                    Sanctioning
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-stone-400 transition-colors flex items-center">
                                    <span className="text-stone-500 mr-2">•</span>
                                    Construction
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-stone-400 transition-colors flex items-center">
                                    <span className="text-stone-500 mr-2">•</span>
                                    3D Modeling
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-stone-400 transition-colors flex items-center">
                                    <span className="text-stone-500 mr-2">•</span>
                                    Interior Design
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-stone-400 transition-colors flex items-center">
                                    <span className="text-stone-500 mr-2">•</span>
                                    Renovation
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="mt-8 lg:mt-0">
                        <h3 className="text-stone-500 font-semibold text-lg mb-6 border-b border-gray-800 pb-2">Get in Touch</h3>
                        <div className="space-y-5">
                            <div className="bg-gray-900 rounded-lg p-4 shadow-md">
                                <p className="text-gray-300">
                                'Sopinath Bhavan' Mangrulpir Road, Opp. Sagar Furniture<br />
                                    Kaulkhed Chowk, Akola
                                </p>
                            </div>
                            
                            <div className="space-y-3">
                                <p className="text-white font-medium mb-2">Contact Us:</p>
                                <a href="tel:+918698165330" className="flex items-center group">
                                    <div className="bg-gray-800 p-2 rounded-full mr-3 group-hover:bg-stone-600 transition-colors">
                                        <Phone size={16} className="text-stone-400 group-hover:text-white" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-stone-400 transition-colors">+91 8698165330</span>
                                </a>
                                
                                <a href="tel:+917745803646" className="flex items-center group">
                                    <div className="bg-gray-800 p-2 rounded-full mr-3 group-hover:bg-stone-600 transition-colors">
                                        <Phone size={16} className="text-stone-400 group-hover:text-white" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-stone-400 transition-colors">+91 7745803646</span>
                                </a>
                                
                                <a href="mailto:emergeconstructionconsultants@gmail.com" className="flex items-center group">
                                    <div className="bg-gray-800 p-2 rounded-full mr-3 group-hover:bg-stone-600 transition-colors">
                                        <Mail size={16} className="text-stone-400 group-hover:text-white" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-stone-400 transition-colors truncate">emergeconstructionconsultants@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar with Attribution */}
                <div className="mt-12 pt-6 border-t border-gray-800">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="mb-4 sm:mb-0">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} Emerge Construction. All rights reserved.
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">
                                Developed by <a href="https://webreichtech.vercel.app" className="text-stone-500 hover:text-stone-400 transition-colors font-medium">WebReich Technologies</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;