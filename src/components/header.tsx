import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Header1 from "../assets/images/header-min.png"; 
import { Pagination } from 'swiper/modules';

export default function Header() {
  return (
    <>
      <header className="bg-gray-200 flex h-96 justify-center items-center w-full text-sm md:text-base lg:text-lg xl:text-xl">
        <Swiper
          spaceBetween={30}
          pagination={{
            dynamicBullets: true,
            clickable: true, // Allow clicking on pagination bullets
          }}
          modules={[Pagination]}
          className="w-full h-full"
        >
          <SwiperSlide>
            <img
              src={Header1.src}
              alt="Header Image 1"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
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
          </SwiperSlide>
        </Swiper>
      </header>
    </>
  );
}