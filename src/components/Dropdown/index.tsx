'use client';

import { useContext, useEffect, useRef } from 'react';
import { ThemeModeContext } from '@/src/contexts/themeMode';
import { colors } from '@/src/styles/theme/colors';
import Link from 'next/link';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  items: {
    label: string;
    icon: string;
    href?: string;
    onClick?: () => void;
    color?: string;
  }[];
}

export default function Dropdown({ isOpen, onClose, items }: DropdownProps) {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg transition-all duration-300 ease-in-out transform origin-top-left
        ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
      style={{ backgroundColor: currentColor.background }}
    >
      <div className="rounded-md ring-1 ring-black ring-opacity-5">
        <div className="py-1">
          {items.map((item, index) => (
            item.href ? (
              <Link 
                key={index}
                href={item.href}
                className="block px-4 py-2 text-sm hover:opacity-80 transition-all duration-200 hover:translate-x-1"
                style={{ color: item.color || currentColor.text }}
                onClick={() => {
                  onClose();
                  item.onClick?.();
                }}
              >
                <i className={`${item.icon} ml-2`}></i>
                {item.label}
              </Link>
            ) : (
              <button
                key={index}
                className="block w-full text-right px-4 py-2 text-sm hover:opacity-80 transition-all duration-200 hover:translate-x-1"
                style={{ color: item.color || currentColor.text }}
                onClick={() => {
                  onClose();
                  item.onClick?.();
                }}
              >
                <i className={`${item.icon} ml-2`}></i>
                {item.label}
              </button>
            )
          ))}
        </div>
      </div>
    </div>
  );
} 