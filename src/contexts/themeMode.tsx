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
  const [isDark, setIsDark] = useState(false);
  
  const toggleThemeMode = () => {
    setIsDark(!isDark);
    localStorage.setItem("myTheme", isDark?"light":"dark")
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
