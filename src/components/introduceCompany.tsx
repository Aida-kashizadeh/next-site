import { useContext } from "react";
import { ThemeModeContext } from "../contexts/themeMode";
import { colors } from "../styles/theme/colors";



export default function IntroduceCompany() {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];

  return (
    <div className="flex flex-col items-center m-5 sm:m-10" style={{animation: "myAnim 3s ease 0s 1 normal forwards"}}>
    <div className="flex flex-col sm:flex-row items-center w-full">
      <div className="hidden lg:block lg:w-1/4"></div>
  
      <div className="sm:w-2/3 lg:w-1/2 w-full text-center sm:text-right">
        <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: currentColor.text }}>
          تایتل مهم تستی
        </h1>
        <hr className="mt-4 mb-6 w-1/3 mx-auto sm:mx-0 border-t-4 border-gray-500" />
        <p className="text-lg mb-3 sm:mb-5" style={{ color: currentColor.text }}>
          لورم ایپسوملورم ایپسوملورم ایپسوملورم ایپسوملورم ایپسوم
          لورم ایپسوملورم ایپسوملورم ایپسوم
        </p>
        <p className="text-lg mb-5 sm:mb-8" style={{ color: currentColor.text }}>
          لورم ایپسوملورم ایپسوملورم ایپسوملورم ایپسوملورم ایپسوملورم ایپسوملورم ایپسوم
          لورم ایپسوملورم ایپسوملورم ایپسوم
        </p>
      </div>
  
      <div className="w-full sm:w-1/3 flex justify-center sm:justify-end">
      <button
  className="w-3/4 sm:w-full h-[80px] sm:h-[100px] text-xl sm:text-2xl font-bold tracking-wider rounded-[50px] 
             shadow-[1px_1px_40px_8px_#62b6cb] hover:shadow-none transition-shadow"
  style={{ backgroundColor: currentColor.Warning }}
>


          کلیک کن ...!
        </button>
        <div className="sm:w-3/4 "></div>
      </div>
    </div>
  </div>
  
  );
}
