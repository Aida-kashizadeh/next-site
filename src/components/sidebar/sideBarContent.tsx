"use client";
import { ThemeModeContext } from '@/src/contexts/themeMode';
import { colors } from '@/src/styles/theme/colors';
import React, { useContext, useState } from 'react';

interface MenuItem {
  name: string;
  url: string;
  children?: MenuItem[];
}

const SidebarContent: React.FC = () => {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const items: MenuItem[] = [
    {
      name: "Item 1",
      url: "#",
      children: [
        { name: "Subitem 1.1", url: "#", children: [] },
        { name: "Subitem 1.2", url: "#", children: [] },
      ],
    },
    {
      name: "Item 2",
      url: "#",
    },
  ];

  return (
    <div style={{ backgroundColor: currentColor.background, padding: '10px',fontSize:"20px" }}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <button onClick={() => toggleItem(index)} style={{ background: 'none', border: 'none', cursor: 'pointer',color:currentColor.text}}>
              {item.name}
            </button>
            {openItems[index] && item.children && item.children.length > 0 && (
              <ul>
                {item.children.map((child, childIndex) => (
                  <li key={childIndex}>
                    <a href={child.url} style={{color:currentColor.text}}>{child.name}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarContent;
