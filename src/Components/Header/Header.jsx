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
            { name: "Mr. Arvind Yadav", href: "/ourwork/arvind-yadav" },
            { name: "Mr. Ajay Lagad", href: "/ourwork/ajay-lagad" },
            { name: "Mr. Prathamesh Sakarkar", href: "/ourwork/prathamesh-sakarkar" },
            { name: "Mr. Ganesh Magar", href: "/ourwork/ganesh-magar" },
            { name: "Mr. Saurabh Wakode", href: "/ourwork/saurabh-wakode" },
            { name: "Mr. Aditya Sawalkar", href: "/ourwork/aditya-sawalkar" },
            { name: "D.K. Sakarkar LLP", href: "/ourwork/dk-sakarkar-llp" },
            { name: "Emerge Construction Office", href: "/ourwork/emerge-construction-office" },
            { name: "Mr. Balkrishna Thokal", href: "/ourwork/balkrishna-thokal" },
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
        
        // Prevent body scroll when menu is open
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'auto';
        };
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

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const mobileMenu = document.getElementById('mobile-menu');
            const menuButton = document.getElementById('menu-button');
            
            if (isMenuOpen && mobileMenu && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
                setIsMenuOpen(false);
                document.body.style.overflow = 'auto';
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

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
        document.body.style.overflow = 'auto';
    };

    return (
        <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-black'}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-3">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group z-50">
                        <div className="flex items-center justify-center rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                            <img
                                src="/logo.png"
                                alt="Emerge Construction Logo"
                                className="h-12 object-contain"
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
                        id="menu-button"
                        onClick={toggleMenu}
                        className="lg:hidden text-white hover:text-gray-300 transition-colors p-2 z-50"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
                    isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`} 
                onClick={toggleMenu}
            />

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className={`fixed inset-y-0 left-0 max-w-xs w-4/5 bg-gradient-to-br from-gray-900 to-black shadow-2xl transition-transform duration-300 ease-in-out lg:hidden overflow-hidden z-50 ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="h-full flex flex-col">
                    {/* Mobile Menu Header */}
                    <div className="p-5 border-b border-gray-800">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center rounded-lg overflow-hidden">
                                <img src="/logo.png" alt="Emerge Construction Logo" className="h-10 w-10 object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-white">EMERGE</span>
                                <span className="text-xs text-gray-300 tracking-widest">CONSTRUCTION</span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Content */}
                    <div className="flex-1 overflow-y-auto py-4">
                        <div className="px-5 space-y-6">
                            {menuItems.map((item) => (
                                <div key={item.name} className="border-b border-gray-800 pb-4">
                                    <div
                                        className="flex items-center justify-between text-gray-100 cursor-pointer transition-colors py-2"
                                        onClick={() => item.submenu && setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                                    >
                                        <Link
                                            to={item.href}
                                            className="text-base font-medium uppercase tracking-wider hover:text-white"
                                            onClick={(e) => handleHashClick(e, item.href)}
                                        >
                                            {item.name}
                                        </Link>
                                        {item.submenu && (
                                            <ChevronDown 
                                                className={`w-5 h-5 transition-transform text-gray-400 ${
                                                    activeSubmenu === item.name ? "rotate-180 text-white" : ""
                                                }`} 
                                            />
                                        )}
                                    </div>

                                    {item.submenu && activeSubmenu === item.name && (
                                        <div className="mt-2 ml-4 space-y-1 border-l-2 border-gray-700 pl-4">
                                            {item.submenu.map((subitem) => (
                                                <NavLink
                                                    key={subitem.name}
                                                    to={subitem.href}
                                                    onClick={(e) => handleHashClick(e, subitem.href)}
                                                    className={({ isActive }) =>
                                                        `block py-2 text-sm transition-all hover:translate-x-1 ${
                                                            isActive 
                                                                ? "text-white font-medium" 
                                                                : "text-gray-400 hover:text-white"
                                                        }`
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
                    </div>

                    {/* Search Bar in Mobile Menu */}
                    <div className="px-5 py-4 border-t border-gray-800">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-gray-800 rounded-md py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Mobile Menu Footer */}
                    <div className="px-5 py-4 border-t border-gray-800 mt-auto">
                        <NavLink
                            to="#contact"
                            onClick={(e) => handleHashClick(e, "#contact")}
                            className="block w-full px-4 py-3 text-center font-medium text-black bg-white rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Inquire Now
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
}