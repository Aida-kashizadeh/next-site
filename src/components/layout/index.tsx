"use client";
import Footer from "@/src/components/footer";
import Header from "@/src/components/header";
import Sidebar from "@/src/components/sidebar";
import { SidebarProvider } from "@/src/contexts/sidebarContext";
import { ReactNode } from "react"; 

type LayoutProps = {
  children: ReactNode; 
};

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div dir="rtl">
        <Sidebar />
        <Header />
        {children}
        <Footer />
      </div>
    </SidebarProvider>
  );
}