"use client";
import { SidebarProvider } from "@/src/contexts/sidebarContext";
import { ReactNode } from "react"; 
import MainPage from "../MainPage";


type LayoutProps = {
  children: ReactNode; 
};

export default function Layout({ children }: LayoutProps) {
  
  return (
    <SidebarProvider>
      <MainPage _children={children}/>
    </SidebarProvider>
  );
}