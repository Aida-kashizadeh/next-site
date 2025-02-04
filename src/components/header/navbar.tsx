import { SidebarContext } from "@/src/contexts/sidebarContext";
import { ThemeModeContext } from "@/src/contexts/themeMode";
import { colors } from "@/src/styles/theme/colors";
import { useContext } from "react";
import Menu from "../menu";
import useScroll from "@/src/hooks/useScroll";

export default function Navbar (){
    const { isSidebarOpen,toggleSidebar } = useContext(SidebarContext);
    const { theme,toggleThemeMode } = useContext(ThemeModeContext);
    const currentColor=colors[theme]

    const isScrolled=useScroll()
    
    return(
        <>
        <div style={{color:currentColor.text,backgroundColor:isScrolled?"#00000022":""}} className="flex h-10 text-xl justify-between fixed w-full z-50">
        <button onClick={toggleSidebar} style={{borderColor:currentColor.text}} className='md:hidden border-2 rounded-lg w-10 m-1'>
        {isSidebarOpen ? '-' : <i className="fa-solid fa-bars"></i>}
        </button>
        
         <div className="pr-10 pt-1">logo</div>
         <div className="hidden md:block pt-1">
          <Menu/>
         </div>
         <div className="flex justify-evenly">
         <button className="md:block"
          onClick={()=>{
              toggleThemeMode()
            }}
            >{theme === "light" ?        
                <i className="fa-solid fa-moon"></i>
                : 
                <i className="fa-solid fa-sun"></i>
                }</button>
                <div className="w-5"></div>
         <div className="pl-10 pt-1"><i className="fa-solid fa-user"></i></div>
         </div>
        </div>
        </>
    )
}