'use client';

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (file: File) => void;
  className?: string;
  width?: number;
  height?: number;
}

export default function ImageUpload({ 
  currentImage, 
  onImageChange, 
  className = "w-24 h-24",
  width = 96,
  height = 96 
}: ImageUploadProps) {
  const [preview, setPreview] = useState(currentImage);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('لطفا فقط فایل تصویری آپلود کنید');
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    onImageChange(file);

    // Cleanup preview URL when component unmounts
    return () => URL.revokeObjectURL(previewUrl);
  };

  return (
    <div className={`relative group ${className}`}>
      <Image
        src={preview}
        alt="Upload preview"
        width={width}
        height={height}
        className="w-full h-full object-cover rounded-full"
      />
      
      <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
        <span>تغییر تصویر</span>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
} 