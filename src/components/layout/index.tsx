"use client";
import { SidebarProvider } from "@/src/contexts/sidebarContext";
import { ReactNode } from "react"; 
import {  ThemeProvider } from "@/src/contexts/themeMode";
import Navbar from "../header/navbar";
import Footer from "../footer/footer";
import Sidebar from "../sidebar/sidebar";

type LayoutProps = {
  children: ReactNode; 
};

export default function Layout({ children }: LayoutProps) {
    
  return (
    <SidebarProvider>
    <ThemeProvider>
      <div dir="rtl">
        <Navbar/>
        <Sidebar />
        {children}
        <Footer />
      </div>
      </ThemeProvider>
    </SidebarProvider>
  );
}