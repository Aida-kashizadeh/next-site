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
    <>
      <div dir="rtl" style={{backgroundColor:currentColor.background}}>
        <Navbar />
        <Sidebar />
        {_children}
        <Footer />
      </div>
    </>
  );
}
