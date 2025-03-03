'use client';

import { ThemeModeContext } from "@/src/contexts/themeMode";
import { colors } from "@/src/styles/theme/colors";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/src/components/ImageUpload";
import DefaultAvatar from '@/src/assets/images/userr.png';

export default function EditProfile() {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: "نام و نام خانوادگی",
    email: "user@example.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    avatar: DefaultAvatar.src
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log(formData);
    router.push('/profile');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (file: File) => {
    // Here you would typically upload the file to your backend/storage
    // For now, we'll just create a local URL
    const imageUrl = URL.createObjectURL(file);
    setFormData({
      ...formData,
      avatar: imageUrl
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: currentColor.background }}>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: currentColor.background }}>
          <h1 className="text-2xl font-bold mb-6" style={{ color: currentColor.text }}>ویرایش پروفایل</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-4">
              <ImageUpload
                currentImage={formData.avatar}
                onImageChange={handleImageChange}
                className="w-24 h-24"
                width={96}
                height={96}
              />
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2" style={{ color: currentColor.text }}>
                  نام کامل
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: currentColor.primary }}
                />
              </div>

              <div>
                <label className="block mb-2" style={{ color: currentColor.text }}>
                  ایمیل
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: currentColor.primary }}
                />
              </div>

              <div>
                <label className="block mb-2" style={{ color: currentColor.text }}>
                  شماره تماس
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: currentColor.primary }}
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/profile')}
                className="px-6 py-2 rounded-lg"
                style={{ backgroundColor: currentColor.background, color: currentColor.text }}
              >
                انصراف
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg text-white"
                style={{ backgroundColor: currentColor.primary }}
              >
                ذخیره تغییرات
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 