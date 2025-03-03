import { ThemeModeContext } from "@/src/contexts/themeMode";
import Footer from "../footer/footer";
import Navbar from "../header/navbar";
import Sidebar from "../sidebar/sidebar";
import {ReactNode, useContext} from "react"
import { colors } from "@/src/styles/theme/colors";

interface MainPageProps{
    _children:ReactNode,
}

export default function MainPage({_children}:MainPageProps) {
    const {theme}=useContext(ThemeModeContext)
    const currentColor=colors[theme]

    return (
        <div dir="rtl" className="min-h-screen flex flex-col" style={{backgroundColor:currentColor.background}}>
            {/* Navbar - Fixed at top */}
            <Navbar />
            
            {/* Sidebar - For mobile menu */}
            <Sidebar />
            
            {/* Main Content - With top padding for navbar */}
            <main className="flex-1 pt-20">
                {_children}
            </main>
            
            {/* Footer */}
            <Footer />
        </div>
    );
}
