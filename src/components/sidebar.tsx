"use client"; 
import React, { useContext } from 'react';
import { SidebarContext } from '../contexts/sidebarContext';

const Sidebar = () => {
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <aside className='z-10 absolute'>
        {isSidebarOpen && <p className='bg-red-100 md:hidden'>Sidebar Content</p>}
    </aside>
  );
};

export default Sidebar;