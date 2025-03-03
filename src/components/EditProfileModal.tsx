'use client';

import { useState, useContext } from 'react';
import { ThemeModeContext } from '../contexts/themeMode';
import { colors } from '../styles/theme/colors';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (profileData: {
    fullName: string;
    email: string;
    phone: string;
  }) => void;
  initialData: {
    fullName: string;
    email: string;
    phone: string;
  };
}

export default function EditProfileModal({ isOpen, onClose, onSubmit, initialData }: EditProfileModalProps) {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];

  const [formData, setFormData] = useState({
    fullName: initialData.fullName,
    email: initialData.email,
    phone: initialData.phone,
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.phone) {
      setError('لطفاً تمام فیلدها را پر کنید');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('لطفاً یک ایمیل معتبر وارد کنید');
      return;
    }

    // Basic phone validation for Iranian phone numbers
    const phoneRegex = /^(0|\+98)9\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('لطفاً یک شماره موبایل معتبر وارد کنید');
      return;
    }

    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50
                   w-full max-w-md rounded-lg shadow-xl p-6"
        style={{ backgroundColor: currentColor.background }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold" style={{ color: currentColor.text }}>
            ویرایش پروفایل
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-opacity-10 transition-colors"
            style={{ backgroundColor: `${currentColor.primary}15` }}
          >
            <i className="fa-solid fa-times" style={{ color: currentColor.text }}></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="fullName" 
              className="block mb-2 text-sm"
              style={{ color: currentColor.text }}
            >
              نام کامل
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg outline-none"
              style={{ 
                backgroundColor: `${currentColor.primary}15`,
                color: currentColor.text,
                borderColor: currentColor.primary
              }}
            />
          </div>

          <div>
            <label 
              htmlFor="email" 
              className="block mb-2 text-sm"
              style={{ color: currentColor.text }}
            >
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg outline-none"
              style={{ 
                backgroundColor: `${currentColor.primary}15`,
                color: currentColor.text,
                borderColor: currentColor.primary
              }}
              dir="ltr"
            />
          </div>

          <div>
            <label 
              htmlFor="phone" 
              className="block mb-2 text-sm"
              style={{ color: currentColor.text }}
            >
              شماره تماس
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg outline-none"
              style={{ 
                backgroundColor: `${currentColor.primary}15`,
                color: currentColor.text,
                borderColor: currentColor.primary
              }}
              dir="ltr"
            />
          </div>

          {error && (
            <p className="text-sm" style={{ color: currentColor.Warning }}>
              {error}
            </p>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg transition-colors"
              style={{ 
                backgroundColor: `${currentColor.primary}15`,
                color: currentColor.text
              }}
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-white transition-colors"
              style={{ backgroundColor: currentColor.primary }}
            >
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
    </>
  );
} 