"use client"; 
import React, { useContext } from 'react';
import { SidebarContext } from '../contexts/sidebarContext';

const Sidebar = () => {
  const { isSidebarOpen,closeSidebar } = useContext(SidebarContext);

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
    className="fixed inset-y-0 z-50 flex-shrink-0 w-64 mt-10 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden transition-transform duration-150 ease-in-out"
    style={{
      transform: isSidebarOpen ? "translateX(0)" : "-translateX(20rem)",
      opacity: isSidebarOpen ? 100 : 0,
    }}
  >
    {/* content */}
  </div>
</div>
  );
};

export default Sidebar;