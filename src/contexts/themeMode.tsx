"use client"
import React, { useState, useMemo, ReactNode } from 'react';

interface ThemeModeContextType {
    theme: 'dark' | 'light';
    toggleThemeMode: () => void;
}

export const ThemeModeContext = React.createContext<ThemeModeContextType>({
  theme: 'light', 
  toggleThemeMode: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage on initial render
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("myTheme");
      return savedTheme === "dark";
    }
    return false;
  });
  
  const toggleThemeMode = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      localStorage.setItem("myTheme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };
  
  const value = useMemo<ThemeModeContextType>(
    () => ({
      toggleThemeMode,
      theme: isDark ? 'dark' : 'light', 
    }),
    [isDark]
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
};
