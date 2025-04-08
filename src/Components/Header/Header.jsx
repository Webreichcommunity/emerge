import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";

const menuItems = [
    {
        name: "Home",
        href: "/#home"  // Added hash link
    },
    {
        name: "Services",
        href: "#services",  // Added hash
        submenu: [
            { name: "Planning", href: "/services#planning" },
            { name: "Sanctioning", href: "/services#sanctioning" },
            { name: "Building Construction", href: "/services#buildingconstruction" },
            { name: "3D Modeling", href: "/services#3dmodeling" },
            { name: "Interior Designing", href: "/services#interiordesigning" },
            { name: "Renovation", href: "/services#renovation" },
            { name: "Estimation", href: "/services#estimation" },
            { name: "Land Sub-division", href: "/services#landsubdivision" }
        ]
    },
    {
        name: "Our Work",
        href: "#projects",
        submenu: [
            { name: "Skyline Towers", href: "/ourwork#skylinetowers" },
            { name: "Greenfield Residences", href: "/ourwork#greenfieldresidences" },
            { name: "Metro Bridge Project", href: "/ourwork#metrobridgeproject" },
            { name: "Sunrise Commercial Complex", href: "/ourwork#sunrisecommercial" },
            { name: "Elite Villas", href: "/ourwork#elitevillas" },
            { name: "Urban Road Development", href: "/ourwork#urbanroaddevelopment" },
            { name: "Blue Ridge Apartments", href: "/ourwork#blueridgeapartments" },
            { name: "Grand Central Mall", href: "/ourwork#grandcentralmall" },
            { name: "Evergreen Township", href: "/ourwork#evergreentownship" }
        ]
    },
    { name: "About Us", href: "/about#top" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setActiveSubmenu(null);
    };

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
        // If it's a hash link on the same page
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.getElementById(href.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', `#${href.substring(1)}`);
            }
        }
        // Close mobile menu after click
        setIsMenuOpen(false);
    };

    return (
        <div className="w-full bg-black text-stone-300 shadow-md sticky top-0 z-50">
            <div className="container mx-auto">
                <div className="flex items-center justify-between px-4 bg-black">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 px-6 py-4">
                        <div className="flex items-center justify-center  rounded-lg">
                            <img src="/logo.png" alt="Emerge Construction Logo" className="w-12 h-14" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-stone-300">Emerge Construction</span>
                            <span className="text-sm text-stone-300">Builders & Developers</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <div key={item.name} className="relative group">
                                <NavLink
                                    to={item.href}
                                    onClick={(e) => handleHashClick(e, item.href)}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-1 px-1 py-2 text-base font-medium transition-colors
                                    ${isActive ? "text-gray-300 font-semibold" : "text-stone-500 hover:text-gray-300"}`
                                    }
                                >
                                    <span>{item.name}</span>
                                    {item.submenu && <ChevronDown className="w-4 h-4 text-stone-500 group-hover:text-gray-300" />}
                                </NavLink>

                                {item.submenu && (
                                    <div className="absolute top-full left-0 w-64 bg-black border border-stone-700 shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        {item.submenu.map((subitem) => (
                                            <NavLink
                                                key={subitem.name}
                                                to={subitem.href}
                                                onClick={(e) => handleHashClick(e, subitem.href)}
                                                className={({ isActive }) =>
                                                    `block px-4 py-2 text-sm text-stone-800 hover:bg-stone-800 hover:text-gray-300
                                                ${isActive ? "text-gray-800 bg-stone-800" : ""}`
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
                    <div className="hidden lg:flex items-center space-x-6">
                        <button className="text-stone-800 hover:text-gray-800 transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <Link
                            to="/inquire"
                            className="px-6 py-3 bg-gray-300 text-black font-medium rounded-lg hover:bg-stone-500 hover:text-gray-300 transition-colors"
                        >
                            Inquiries
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden text-gray-800 hover:text-stone-500 transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed z-40 inset-0 bg-black/70 transition-opacity lg:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={toggleMenu}
            >
                <div
                    className={`fixed inset-y-0 right-0 w-full max-w-sm bg-black shadow-xl transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-4 border-b border-stone-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <img src="/logo.png" alt="Emerge Construction Logo" className="w-10 h-10" />
                            </div>
                            <span className="text-lg font-bold text-stone-400">Emerge Construction</span>
                        </div>
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-stone-500 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="px-4 py-6 space-y-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
                        {menuItems.map((item) => (
                            <div key={item.name}>
                                <div
                                    className="flex items-center justify-between text-gray-300 hover:text-stone-500 cursor-pointer transition-colors"
                                    onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                                >
                                    <Link 
                                        to={item.href} 
                                        className="w-full"
                                        onClick={(e) => handleHashClick(e, item.href)}
                                    >
                                        <span className="text-base font-medium">{item.name}</span>
                                    </Link>
                                    {item.submenu && (
                                        <ChevronDown className={`w-5 h-5 transition-transform ${activeSubmenu === item.name ? "rotate-180" : ""}`} />
                                    )}
                                </div>

                                {item.submenu && activeSubmenu === item.name && (
                                    <div className="mt-2 ml-4 space-y-3 border-l-2 border-stone-400 pl-3">
                                        {item.submenu.map((subitem) => (
                                            <NavLink
                                                key={subitem.name}
                                                to={subitem.href}
                                                onClick={(e) => handleHashClick(e, subitem.href)}
                                                className={({ isActive }) =>
                                                    `block py-2 text-sm ${isActive ? "text-gray-300 font-medium" : "text-stone-500 hover:text-gray-300"}`
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

                    <div className="border-t border-stone-700 p-4">
                        <Link
                            to="/inquire"
                            className="block w-full px-5 py-3 text-center font-medium text-black bg-gray-300 rounded-lg hover:bg-stone-500 hover:text-gray-300 transition-colors"
                            onClick={toggleMenu}
                        >
                            Inquiries
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}