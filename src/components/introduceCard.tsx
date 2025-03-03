import { useContext } from "react";
import Img from "../assets/images/header-min.png";
import { ThemeModeContext } from "../contexts/themeMode";
import { colors } from "../styles/theme/colors";
import Image from "next/image";

interface IntroduceCardProps {
  items: { img?: string; text?: string }[];
}

export default function IntroduceCard({ items }: IntroduceCardProps) {
   const { theme } = useContext(ThemeModeContext);
    const currentColor = colors[theme];
  
  const defaultText = "متن تستی";
  const defaultImg = Img.src;

  return (
    <div className="w-full flex justify-center p-4 ">
      <div style={{boxShadow:`1px 1px 10px 3px ${currentColor.primary}`}}  className="w-4/5 flex flex-wrap justify-center sm:justify-evenly rounded-2xl shadow-md p-4 mt-[100px]">
        {items?.map((item, index) => (
          <div key={index} className="flex flex-col items-center m-4">
            <div style={{boxShadow:`1px 1px 10px 3px ${currentColor.primary}`}}  className="w-36 h-36 rounded-full border border-black overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                src={item.img || defaultImg}
                alt={`item-${index}`}
                width={144}
                height={144}
              />
            </div>
            <div style={{color:currentColor.text, fontSize:'22px'}} className="mt-6 text-center">{item.text || defaultText}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
