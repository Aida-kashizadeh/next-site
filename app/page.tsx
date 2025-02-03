"use client";
import HorizontalBar from "@/src/components/horizontalBar";
import Layout from "@/src/components/layout";
import montainImage from "@/public/globe.svg";
import IntroduceCard from "@/src/components/introduceCard";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from "@/src/components/header/header";
import CreativeSwiper from "@/src/components/swipers/creativeSwiper";



export default function Home() {
 
 
  return (
    <>
      <Layout>
      <Header />
      <HorizontalBar imageSrc={montainImage.src} imagePosition={"right"} text={"در این تصویر عکس باید در سمت راست قرار کیرد"}/>
      <HorizontalBar imageSrc={montainImage.src} imagePosition={"left"} text={"در این تصویر عکس باید در سمت چپ قرار کیرد"}/>
      <CreativeSwiper/>
      <IntroduceCard/>
        it is home page
      </Layout>
    </>
  );
}
