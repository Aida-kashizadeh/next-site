'use client';

import { SidebarContext } from "@/src/contexts/sidebarContext";
import { ThemeModeContext } from "@/src/contexts/themeMode";
import { colors } from "@/src/styles/theme/colors";
import { useContext, useState } from "react";
import useScroll from "@/src/hooks/useScroll";
import Dropdown from "../Dropdown";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { mockCartItems } from "@/src/data/mockData";

// Define valid paths at the top level
const VALID_PATHS = ['/', '/products', '/services', '/reports', '/users', '/profile', '/about', '/contact-us', '/cart'];

// Function to check if the current path is valid
const isValidPath = (pathname: string) => {
    // Check exact matches first
    if (VALID_PATHS.includes(pathname)) return true;
    // Check if it's a product detail page
    if (pathname.startsWith('/products/')) return true;
    return false;
};

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);
    const { theme, toggleThemeMode } = useContext(ThemeModeContext);
    const currentColor = colors[theme];
    const [showDropdown, setShowDropdown] = useState(false);
    const isScrolled = useScroll();
    
    // Don't render navbar on unknown paths
    if (!isValidPath(pathname)) {
        return null;
    }

    const dropdownItems = [
        {
            label: "پروفایل",
            icon: "fa-regular fa-user",
            href: "/profile"
        },
        {
            label: "خروج",
            icon: "fa-solid fa-right-from-bracket",
            color: currentColor.Warning,
            onClick: () => {
                router.push("/login");
                console.log("Signing out...");
            }
        }
    ];

    const menuItems = [
        { name: "داشبورد", url: "/" },
        { name: "محصولات", url: "/products" },
        { name: "خدمات", url: "/services" },
        { name: "درباره ما", url: "/about" },
        { name: "تماس با ما", url: "/contact-us" },
    ];

    return (
        <nav 
            style={{ 
                color: currentColor.text, 
                backgroundColor: isScrolled ? `${currentColor.background}dd` : `${currentColor.primary}`,
                borderBottom: isScrolled ? `1px solid ${currentColor.primary}22` : 'none'
            }} 
            className="flex h-20 justify-between fixed top-0 left-0 right-0 z-[100] items-center px-4 lg:px-8 transition-all duration-300"
        >
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button 
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                    <i className={`fa-solid ${isSidebarOpen ? 'fa-xmark' : 'fa-bars'} text-xl`} 
                       style={{ color: currentColor.text }}></i>
                </button>
                <div className="text-2xl font-bold">
                <Link 
                        href={"/"} 
                        className="hover:text-primary transition-colors"
                        style={{ color: currentColor.text }}
                    >
                        Logo
                    </Link>
                </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
                {menuItems.map((item, index) => (
                    <Link 
                        key={index}
                        href={item.url} 
                        className="hover:text-primary transition-colors"
                        style={{ color: currentColor.text }}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <Link
                    href="/cart"
                    className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                    <i className="fa-solid fa-shopping-cart text-lg"></i>
                    {mockCartItems.length > 0 && (
                        <span 
                            className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs rounded-full"
                            style={{ backgroundColor: currentColor.primary === '#ffffff' ? '#ff0000' : currentColor.primary, color: 'white' }}
                        >
                            {mockCartItems.length}
                        </span>
                    )}
                </Link>
                <button
                    onClick={toggleThemeMode}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                    <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'} text-lg`}></i>
                </button>
                
                <div className="relative">
                    <button 
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <i className="fa-solid fa-user text-lg"></i>
                    </button>
                    
                    <Dropdown
                        isOpen={showDropdown}
                        onClose={() => setShowDropdown(false)}
                        items={dropdownItems}
                    />
                </div>
            </div>
        </nav>
    );
}