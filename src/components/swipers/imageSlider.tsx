'use client';

import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import Image1 from "../../assets/images/header-min.png"
import Image2 from "../../assets/images/blueHeader.jpg"
import Image3 from "../../assets/images/learning.jpg"
import { ThemeModeContext } from '@/src/contexts/themeMode';
import { colors } from '@/src/styles/theme/colors';

const images = [
    Image1.src,
    Image2.src,
    Image3.src
];

export default function ScrollingImageBar() {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{backgroundColor:currentColor.background}} className="overflow-hidden relative w-full py-4 mt-9">
      <motion.div
        className="flex w-max"
        animate={{ x: isHovered ? 0 : ['0%', '-100%'] }}
        transition={{
          ease: 'linear',
          duration: 20,
          repeat: Infinity,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {[...images, ...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index}`}
            className="w-40 h-40 object-cover mx-2 rounded-lg shadow-md"
          />
        ))}
      </motion.div>
    </div>
  );
}

