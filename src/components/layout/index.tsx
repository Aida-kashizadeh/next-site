"use client";
import { SidebarProvider } from "@/src/contexts/sidebarContext";
import { ReactNode } from "react"; 
import { ThemeProvider } from "@/src/contexts/themeMode";
import MainPage from "../MainPage";


type LayoutProps = {
  children: ReactNode; 
};

export default function Layout({ children }: LayoutProps) {
  
  return (
    <SidebarProvider>
    <ThemeProvider>
      <MainPage _children={children}/>
      </ThemeProvider>
    </SidebarProvider>
  );
}