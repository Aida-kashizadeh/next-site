/* eslint-disable @next/next/no-img-element */
interface HorizontalBarProps {
    imagePosition: "left" | "right";
    imageSrc: string;
    text:string;
  }
  
  export default function HorizontalBar({
    imagePosition,
    imageSrc,
    text
  }: HorizontalBarProps) {
    return (
      <div className="flex flex-wrap items-center m-10">
        {imagePosition === "right" && (
            <>
          <div className="w-full sm:w-1/2 flex justify-center items-center">
            <img
              src={imageSrc}
              alt="Image on the left"
              className="w-48 p-5 object-cover"
            />
          </div>
        <div className="sm:w-1/2 text-center">
          <p className="text-lg">{text}</p>
        </div>
        </>
        )}
        {imagePosition === "left" && (
         <>
            <div className="sm:w-1/2 text-center">
            <p className="text-lg">{text}</p>
          </div>
          <div className="w-full sm:w-1/2 flex justify-center items-center">
            <img
              src={imageSrc}
              alt="Image on the right"
              className="w-48 p-5 object-cover"
            />
          </div>
          </>
        )}
      </div>
    );
  }
  