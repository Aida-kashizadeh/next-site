"use client"; 
import { SidebarContext } from '@/src/contexts/sidebarContext';
import { ThemeModeContext } from '@/src/contexts/themeMode';
import { colors } from '@/src/styles/theme/colors';
import React, { useContext, useState } from 'react';
import Link from 'next/link';

interface MenuItem {
  name: string;
  url: string;
  icon?: string;
  children?: MenuItem[];
  group?: string;
}

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const items: MenuItem[] = [
    {
      name: "داشبورد",
      url: "/",
      icon: "fa-solid fa-gauge-high",
      group: "اصلی"
    },
    {
      name: "درباره ما",
      url: "/about",
      icon: "fa-solid fa-gauge-high",
      group: "اصلی"
    },
    {
      name: "تماس با ما",
      url: "/contact-us",
      icon: "fa-solid fa-gauge-high",
      group: "اصلی"
    },
    {
      name: "خدمات",
      url: "#",
      icon: "fa-solid fa-gear",
      group: "اصلی",
      children: [
        { name: "طراحی وب", url: "/services/web-design" },
        { name: "توسعه نرم‌افزار", url: "/services/software" },
        { name: "هوش مصنوعی", url: "/services/ai" },
      ],
    },
    {
      name: "محصولات",
      url: "/products",
      icon: "fa-solid fa-box",
      group: "اصلی"
    },
    {
      name: "گزارش‌ها",
      url: "/reports",
      icon: "fa-solid fa-chart-line",
      group: "مدیریت"
    },
    {
      name: "کاربران",
      url: "/users",
      icon: "fa-solid fa-users",
      group: "مدیریت"
    },
    {
      name: "تنظیمات",
      url: "/settings",
      icon: "fa-solid fa-cog",
      group: "سیستم"
    },
    {
      name: "راهنما",
      url: "/help",
      icon: "fa-solid fa-circle-question",
      group: "سیستم"
    }
  ];

  // Group items by their group property
  const groupedItems = items.reduce((acc, item) => {
    const group = item.group || 'سایر';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <>
      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className={`
            fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-40 lg:hidden
            ${isSidebarOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 right-0 w-[280px] shadow-2xl z-50 lg:hidden
          transform transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ backgroundColor: currentColor.background }}
      >
        <div className="h-full flex flex-col">
          {/* Profile Section */}
          <div 
            className="p-6 border-b mt-20"
            style={{ borderColor: `${currentColor.primary}15` }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full overflow-hidden"
                style={{ border: `2px solid ${currentColor.primary}` }}
              >
                <img 
                  src="https://ui-avatars.com/api/?name=User&background=random" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold" style={{ color: currentColor.text }}>کاربر تست</h3>
                <p className="text-sm opacity-70" style={{ color: currentColor.text }}>مدیر سیستم</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {Object.entries(groupedItems).map(([group, items]) => (
              <div key={group} className="mb-6">
                <h4 
                  className="text-xs font-medium mb-2 px-6 uppercase tracking-wider"
                  style={{ color: `${currentColor.text}80` }}
                >
                  {group}
                </h4>
                <ul>
                  {items.map((item, index) => (
                    <li key={index} className="px-3">
                      <div className="relative">
                        <Link
                          href={item.url}
                          className={`
                            flex items-center gap-3 py-2.5 px-3 rounded-lg
                            transition-all duration-200
                            hover:bg-white/5
                          `}
                          style={{ color: currentColor.text }}
                          onClick={(e) => {
                            if (item.children) {
                              e.preventDefault();
                              setActiveGroup(activeGroup === group ? null : group);
                            } else {
                              closeSidebar();
                            }
                          }}
                        >
                          {item.icon && (
                            <i 
                              className={`${item.icon} text-lg`}
                              style={{ color: currentColor.primary }}
                            ></i>
                          )}
                          <span>{item.name}</span>
                          {item.children && (
                            <i 
                              className={`
                                fa-solid fa-chevron-down text-xs mr-auto
                                transition-transform duration-200
                                ${activeGroup === group ? 'rotate-180' : ''}
                              `}
                              style={{ color: currentColor.primary }}
                            ></i>
                          )}
                        </Link>

                        {item.children && (
                          <ul 
                            className={`
                              overflow-hidden transition-all duration-200
                              ${activeGroup === group ? 'max-h-48' : 'max-h-0'}
                            `}
                          >
                            {item.children.map((child, childIndex) => (
                              <li key={childIndex}>
                                <Link
                                  href={child.url}
                                  className={`
                                    block py-2 px-11 rounded-lg
                                    transition-all duration-200
                                    hover:bg-white/5
                                  `}
                                  style={{ color: currentColor.text }}
                                  onClick={closeSidebar}
                                >
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;