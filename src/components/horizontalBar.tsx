import { useContext } from "react";
import { ThemeModeContext } from "../contexts/themeMode";
import { colors } from "../styles/theme/colors";

/* eslint-disable @next/next/no-img-element */
interface HorizontalBarProps {
  imagePosition: "left" | "right";
  imageSrc: string;
  text: string;
}

export default function HorizontalBar({
  imagePosition,
  imageSrc,
  text,
}: HorizontalBarProps) {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];

  const gradientColor =  currentColor.background;

  return (
    <div
      className="w-full flex flex-col items-center text-center py-8 sm:py-12 md:py-16 relative"
      style={{ backgroundColor: currentColor.primary }}
    >
      {/* گرادینت‌های بالا و پایین */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent"
        style={{ 
          background: `linear-gradient(to left, ${gradientColor}, ${gradientColor}, transparent)`,
          opacity: 0.1
        }}
      />
      
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent"
        style={{ 
          background: `linear-gradient(to ${imagePosition === "left"?"bottom":"top"}, transparent, ${gradientColor}, ${gradientColor})`,
          opacity: 0.99
        }}
      />

      {/* محتوای اصلی */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`flex flex-col ${imagePosition === "right" ? "sm:flex-row" : "sm:flex-row-reverse"} gap-8 sm:gap-12 items-center`}>
          {/* تصویر */}
          <div className="w-full sm:w-1/2">
            <div
              className="relative aspect-square max-w-[300px] sm:max-w-[350px] md:max-w-[400px] mx-auto overflow-hidden"
              style={{
                boxShadow: `1px 1px 30px 1px ${currentColor.primary}`,
                borderRadius: "9999px",
              }}
            >
              <img
                src={imageSrc}
                alt="تصویر"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* متن */}
          <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start">
            <p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed"
              style={{ color: currentColor.text }}
            >
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
