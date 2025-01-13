"use client";
import Footer from "@/src/components/footer";
import Header from "@/src/components/header";
import Sidebar from "@/src/components/sidebar";
import { SidebarProvider } from "@/src/contexts/sidebarContext";
import { ReactNode } from "react"; 
import Navbar from "../navbar";

type LayoutProps = {
  children: ReactNode; 
};

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div dir="rtl">
        <Navbar/>
        <Sidebar />
        <Header />
        {children}
        <Footer />
      </div>
    </SidebarProvider>
  );
}