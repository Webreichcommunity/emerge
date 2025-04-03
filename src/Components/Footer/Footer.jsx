import React from 'react';
import { Github, Twitter, Youtube, Instagram, Linkedin, Clock, Phone, } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-black text-white border-t border-gray-100 pt-16 pb-8">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                <img src="/logo.png" alt="webreich" />
                            </div>
                            <span className="text-stone-400 font-bold text-xl">Emerge Construction</span>
                        </div>

                        <p className="text-sm leading-relaxed">
                            Building the future with precision and excellence. Emerge Constructions delivers world-class infrastructure solutions with unmatched quality and timely execution.
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>Mon-Sat: 8:00 AM - 6:00 PM</span>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            <a href="https://www.youtube.com/channel/UC7H82Mxei7P9m6Gw3KssINw" className="hover:text-orange-600 transition-colors" aria-label="YouTube">
                                <Youtube className="w-6 h-6 text-red-500" />
                            </a>
                            <a href="https://www.instagram.com/akshay_bhaltilak/?utm_source=ig_web_button_share_sheet" className="hover:text-orange-600 transition-colors" aria-label="Instagram">
                                <Instagram className="w-5 h-5 text-pink-500" />
                            </a>
                            <a href="https://www.linkedin.com/in/shriyash-rulhe-655a9422a/" className="hover:text-orange-600 transition-colors" aria-label="LinkedIn">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
                            </a>
                        </div>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h3 className="text-stone-400 font-semibold text-lg mb-4">Solutions</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="hover:text-stone
                                stone-600 transition-colors">
                                    Enterprise Software
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-stone
                                stone-600 transition-colors">
                                    Web Development
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-stone
                                stone-600 transition-colors">
                                    AI & Machine Learning
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-stone
                                stone-600 transition-colors">
                                    Business Intelligence
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-stone
                                stone-600 transition-colors">
                                    Data Management
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-stone-400 font-semibold text-lg mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/case-studies/webreich-business-solutions" className="hover:text-stone-600 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/case-studies" className="hover:text-stone-600 transition-colors">
                                    Case Studies
                                </Link>
                            </li>
                            <li>
                                <Link to="/ourwork" className="hover:text-stone-600 transition-colors">
                                    Our Work
                                </Link>
                            </li>
                            <li>
                                <Link to="/ourwork/webreichcommunity" className="hover:text-stone-600 transition-colors">
                                    WebReich Education
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-stone-400 font-semibold text-lg mb-4">Get in Touch</h3>
                        <div className="space-y-3">
                            <p className="text-sm">
                                <span className="text-stone-100 font-medium">Headquarters:</span><br />
                                444-00-4<br />
                                Akola, Maharashtra India
                            </p>
                            <p className="text-sm">
                                <span className="text-stone-100 font-medium">Contact:</span><br />
                                <a href="tel:+1-555-123-4567" className="hover:text-orange-600 transition-colors">
                                    +91 86687 22207 / 98341 53020
                                </a>
                                <br />
                                <a href="mailto:contact@techflow.com" className="hover:text-orange-600 transition-colors">
                                    contact webreichcommunity@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-stone-400">
                            © 2025 Emerge Construction. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="hover:text-orange-600 transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="hover:text-orange-600 transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="hover:text-orange-600 transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;