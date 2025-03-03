import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Header1 from "../../assets/images/blueHeader.jpg";
import { Pagination } from "swiper/modules";
import { useContext } from "react";
import { ThemeModeContext } from "@/src/contexts/themeMode";
import { colors } from "@/src/styles/theme/colors";
import { TypeAnimation } from "react-type-animation";

export default function Header() {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];

  return (
    <header
      style={{ backgroundColor: currentColor.background }}
      className="flex justify-center items-center w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-screen"
    >
      <Swiper
        spaceBetween={30}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Pagination]}
        className="w-full h-full"
      >
        <SwiperSlide>
          <div 
            style={{backgroundColor: currentColor.background}} 
            className="w-full h-full flex justify-center items-center relative"
          >
            <img
              src={Header1.src}
              alt="Header Image 1"
              className="w-full h-full object-cover [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)40%,rgba(0,0,0,0)100%)]"
            />

            <div
              style={{
                color: currentColor.text,
                animation: "myAnim 2s ease 0s 1 normal forwards"
              }}
              className="hidden sm:block absolute left-4 sm:left-8 md:left-12 lg:left-16 
                         top-1/2 transform -translate-y-1/2
                         w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]
                         text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl
                         font-bold"
            >
              <TypeAnimation
                sequence={["متن تستی اول هست", 1000, "متن تستی دوم هست", 1000]}
                wrapper="span"
                speed={30}
                repeat={Infinity}
              />
            </div>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>
          <div className="w-full h-full flex justify-center items-center bg-blue-500">
            Slide 2
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex justify-center items-center bg-green-500">
            Slide 3
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex justify-center items-center bg-yellow-500">
            Slide 4
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex justify-center items-center bg-red-500">
            Slide 5
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex justify-center items-center bg-purple-500">
            Slide 6
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex justify-center items-center bg-pink-500">
            Slide 7
          </div>
        </SwiperSlide> */}
      </Swiper>
    </header>
  );
}
