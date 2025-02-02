"use client"; 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/effect-cube'; 
import 'swiper/css/pagination'; 
import { EffectCube, Pagination } from 'swiper/modules';


export default function CubeSwiper(){
  return (
    <div className="w-full h-screen">
      <Swiper
        effect={'cube'} 
        grabCursor={true}
        cubeEffect={{
          shadow: true, 
          slideShadows: true, 
          shadowOffset: 20, 
          shadowScale: 0.94,
        }}
        modules={[EffectCube, Pagination]}
        pagination={true} 
        className="mySwiper" 
      >
        <SwiperSlide>
          <div className="w-full h-full flex justify-center items-center bg-blue-500">
            Slide 1
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex justify-center items-center bg-green-500">
            Slide 2
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex justify-center items-center bg-yellow-500">
            Slide 3
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex justify-center items-center bg-red-500">
            Slide 4
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};





