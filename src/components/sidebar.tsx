"use client"; 
import React, { useContext } from 'react';
import { SidebarContext } from '../contexts/sidebarContext';

const Sidebar = () => {
  const { isSidebarOpen,toggleSidebar } = useContext(SidebarContext);

  return (
    <aside>
      <button onClick={toggleSidebar}>
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
      {isSidebarOpen && <p>Sidebar Content</p>}
    </aside>
  );
};

export default Sidebar;