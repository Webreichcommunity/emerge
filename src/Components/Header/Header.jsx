import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";

const menuItems = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "Services",
        href: "/services",
        submenu: [
            { name: "Architectural Design", href: "/ourwork/architecturaldesign" },
            { name: "Residential Construction", href: "/ourwork/residentialconstruction" },
            { name: "Commercial Building Construction", href: "/ourwork/commercialconstruction" },
            { name: "Road & Highway Development", href: "/ourwork/roaddevelopment" },
            { name: "Bridge & Flyover Construction", href: "/ourwork/bridgeconstruction" },
            { name: "Industrial Infrastructure Development", href: "/ourwork/industrialinfrastructure" },
            { name: "Renovation & Remodeling", href: "/ourwork/renovationremodeling" },
            { name: "Landscaping & Urban Planning", href: "/ourwork/landscapingurbanplanning" },
            { name: "Water Supply & Drainage Systems", href: "/ourwork/watersupplydrainage" }
        ]

    },
    {
        name: "Our Work",
        href: "/ourwork",
        submenu: [
            { name: "Skyline Towers", href: "/ourwork/skylinetowers" },
            { name: "Greenfield Residences", href: "/ourwork/greenfieldresidences" },
            { name: "Metro Bridge Project", href: "/ourwork/metrobridgeproject" },
            { name: "Sunrise Commercial Complex", href: "/ourwork/sunrisecommercial" },
            { name: "Elite Villas", href: "/ourwork/elitevillas" },
            { name: "Urban Road Development", href: "/ourwork/urbanroaddevelopment" },
            { name: "Blue Ridge Apartments", href: "/ourwork/blueridgeapartments" },
            { name: "Grand Central Mall", href: "/ourwork/grandcentralmall" },
            { name: "Evergreen Township", href: "/ourwork/evergreentownship" }
        ]
    },
    { name: "About Us", href: "/about" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setActiveSubmenu(null);
    };

    return (
        <div className="w-full bg-black">
            <div className="container mx-auto">
                <div className="flex items-center justify-between px-4 py-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center ">
                            <img src="/logo.png" alt="Emerge Construction Logo" className="w-10 h-10" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-stone-400">Emerge Construction</span>
                            <span className="text-sm text-stone-500">Builders & Developers</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <div key={item.name} className="relative group">
                                <NavLink
                                    to={item.href}
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
                                                className={({ isActive }) =>
                                                    `block px-4 py-2 text-sm text-stone-500 hover:bg-stone-800 hover:text-gray-300
                                                ${isActive ? "text-gray-300 bg-stone-800" : ""}`
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
                        <button className="text-stone-500 hover:text-gray-300 transition-colors">
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
                        className="lg:hidden text-gray-300 hover:text-stone-500 transition-colors"
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
                                    <Link to={item.href} className="w-full">
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
                                                className={({ isActive }) =>
                                                    `block py-2 text-sm ${isActive ? "text-gray-300 font-medium" : "text-stone-500 hover:text-gray-300"}`
                                                }
                                                onClick={toggleMenu}
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