"use client"; 
import { SidebarContext } from '@/src/contexts/sidebarContext';
import { ThemeModeContext } from '@/src/contexts/themeMode';
import { colors } from '@/src/styles/theme/colors';
import React, { useContext } from 'react';

const Sidebar = () => {
  const { isSidebarOpen,closeSidebar } = useContext(SidebarContext);
  const {theme}=useContext(ThemeModeContext)
  const currentColor=colors[theme]

  return (
    <div>
  {/* Backdrop */}
  {isSidebarOpen && (
    <div
      className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-150 ease-in-out"
      style={{
        opacity: isSidebarOpen ? 100 : 0,
      }}
      onClick={closeSidebar}
    />
  )}

  {/* Sidebar */}
  <div
    className="fixed inset-y-0 z-50 flex-shrink-0 w-64 mt-10 overflow-y-auto dark:bg-gray-800 lg:hidden transition-transform duration-150 ease-in-out"
    style={{
      transform: isSidebarOpen ? "translateX(0)" : "-translateX(20rem)",
      opacity: isSidebarOpen ? 100 : 0,
      backgroundColor:currentColor.background
    }}
  >
    {/* content */}
  </div>
</div>
  );
};

export default Sidebar;