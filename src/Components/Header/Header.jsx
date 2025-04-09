import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";

const menuItems = [
    {
        name: "Home",
        href: "#home"
    },
    {
        name: "Services",
        href: "#services",
    },
    {
        name: "Our Work",
        href: "#projects",
        submenu: [
            { name: "TechHub Innovation Center", href: "/ourwork/techhub-innovation-center" },
            { name: "Oceanview Luxury Residences", href: "/ourwork/oceanview-luxury-residences" },
            { name: "Greenfield Corporate Campus", href: "/ourwork/greenfield-corporate-campus" },
            { name: "Heritage Museum Renovation", href: "/ourwork/heritage-museum-renovation" },
            { name: "Urban Wellness Center", href: "/ourwork/urban-wellness-center" }
        ]
    },
    { name: "About Us", href: "#about" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setActiveSubmenu(null);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll to hash element when URL changes
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.getElementById(hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const handleHashClick = (e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.getElementById(href.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', `#${href.substring(1)}`);
            }
        }
        setIsMenuOpen(false);
    };

    return (
        <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-black'}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-3">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="flex items-center justify-center rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                            <img
                                src="/logo.png"
                                alt="Emerge Construction Logo"
                                className="w-12 h-12 object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors">EMERGE</span>
                            <span className="text-xs text-gray-300 tracking-widest">CONSTRUCTION & CONSULTANTS</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-6">
                        {menuItems.map((item) => (
                            <div key={item.name} className="relative group">
                                <NavLink
                                    to={item.href}
                                    onClick={(e) => handleHashClick(e, item.href)}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-1 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors
                                        ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`
                                    }
                                >
                                    <span>{item.name}</span>
                                    {item.submenu && <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />}
                                </NavLink>

                                {item.submenu && (
                                    <div className="absolute top-full left-0 w-64 bg-black/90 backdrop-blur-sm border border-gray-800 shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        {item.submenu.map((subitem) => (
                                            <NavLink
                                                key={subitem.name}
                                                to={subitem.href}
                                                onClick={(e) => handleHashClick(e, subitem.href)}
                                                className={({ isActive }) =>
                                                    `block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors
                                                    ${isActive ? "bg-gray-800 text-white" : ""}`
                                                }
                                            >
                                                {subitem.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right Section */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <button className="text-gray-400 hover:text-white transition-colors p-2">
                            <Search className="w-5 h-5" />
                        </button>
                        <NavLink
                            to="#contact"
                            className="px-6 py-2.5 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors border border-transparent hover:border-white"
                        >
                            Inquire Now
                        </NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden text-white hover:text-gray-300 transition-colors p-2"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed z-40 inset-0 bg-black/80 transition-opacity lg:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={toggleMenu}
            >
                <div
                    className={`fixed inset-y-0 right-0 w-full max-w-sm bg-black/90 backdrop-blur-sm shadow-xl transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-4 border-b border-gray-800">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg overflow-hidden">
                                <img src="/logo.png" alt="Emerge Construction Logo" className="w-10 h-10 object-contain" />
                            </div>
                            <span className="text-lg font-bold text-white">EMERGE</span>
                        </div>
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-white transition-colors p-1"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="px-4 py-6 space-y-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
                        {menuItems.map((item) => (
                            <div key={item.name}>
                                <div
                                    className="flex items-center justify-between text-gray-300 hover:text-white cursor-pointer transition-colors"
                                    onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                                >
                                    <Link
                                        to={item.href}
                                        className="w-full"
                                        onClick={(e) => handleHashClick(e, item.href)}
                                    >
                                        <span className="text-base font-medium uppercase tracking-wider">{item.name}</span>
                                    </Link>
                                    {item.submenu && (
                                        <ChevronDown className={`w-5 h-5 transition-transform ${activeSubmenu === item.name ? "rotate-180" : ""}`} />
                                    )}
                                </div>

                                {item.submenu && activeSubmenu === item.name && (
                                    <div className="mt-2 ml-4 space-y-3 border-l-2 border-gray-700 pl-3">
                                        {item.submenu.map((subitem) => (
                                            <NavLink
                                                key={subitem.name}
                                                to={subitem.href}
                                                onClick={(e) => handleHashClick(e, subitem.href)}
                                                className={({ isActive }) =>
                                                    `block py-2 text-sm ${isActive ? "text-white font-medium" : "text-gray-400 hover:text-white"}`
                                                }
                                            >
                                                {subitem.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-800 p-4">
                        <NavLink
                            to="#contact"
                            className="block w-full px-5 py-3 text-center font-medium text-black bg-white rounded-md hover:bg-gray-200 transition-colors"
                            onClick={toggleMenu}
                        >
                            Inquire Now
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
}