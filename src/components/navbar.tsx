import { useContext } from "react";
import { SidebarContext } from "../contexts/sidebarContext";

export default function Navbar (){
    const { isSidebarOpen,toggleSidebar } = useContext(SidebarContext);
    return(
        <>
        <div className="flex bg-blue-950 text-white h-10 text-xl justify-between">
        <button onClick={toggleSidebar} className='md:hidden border-2 border-gray-300 rounded-lg w-10 m-1'>
        {isSidebarOpen ? '-' : '+'}
        </button>
         <div className="pr-10 pt-1">logo</div>
         <div className="hidden md:block pt-1">menu</div>
         <div className="pl-10 pt-1">profile</div>
        </div>
        </>
    )
}