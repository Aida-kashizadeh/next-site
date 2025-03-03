"use client";
import HorizontalBar from "@/src/components/horizontalBar";
import Layout from "@/src/components/layout";
import montainImage from "@/src/assets/images/learning.jpg";
import IntroduceCard from "@/src/components/introduceCard";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "@/src/components/header/header";
// import CreativeSwiper from "@/src/components/swipers/creativeSwiper";
import IntroduceCompany from "@/src/components/introduceCompany";
import ScrollingImageBar from "@/src/components/swipers/imageSlider";
import image1 from "../src/assets/images/learning.jpg"
import image2 from "../src/assets/images/learning.jpg"
import image3 from "../src/assets/images/learning.jpg"

export default function Home() {
  return (
    <>
      <Layout>
        <Header />
        <div className="h-[200px]"></div>
        <IntroduceCompany />
        <ScrollingImageBar />
        <HorizontalBar
          imageSrc={montainImage.src}
          imagePosition={"right"}
          text={
            "تصویر عکس باید در سمت راست قرارتصویر عکس باید در سمت راست قرارتصویر عکس باید در سمت راست قرارتصویر عکس باید در سمت راست قراردر این تصویر عکس باید در سمت راست قرار گیرد"
          }
        />
        <HorizontalBar
          imageSrc={montainImage.src}
          imagePosition={"left"}
          text={
            "تصویر عکس باید در سمت راست قرارتصویر عکس باید در سمت راست قرارتصویر عکس باید در سمت راست قرارتصویر عکس باید در سمت راست قرارتصویر عکس باید در سمت راست قراردر این تصویر عکس باید در سمت چپ قرار گیرد"
          }
        />
        {/* <CreativeSwiper/> */}
        <IntroduceCard
          items={[
            { img: image1.src, text: "Item 1" },
            { img: image2.src, text: "Item 2" },
            { img: image3.src, text: "Item 3" },
          ]}
        />
      </Layout>
    </>
  );
}
