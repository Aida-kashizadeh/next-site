'use client';

import { ThemeModeContext } from "@/src/contexts/themeMode";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { colors } from "@/src/styles/theme/colors";

function RegisterContent() {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle registration logic
    if (formData.password !== formData.confirmPassword) {
      alert('رمز عبور و تکرار آن مطابقت ندارند');
      return;
    }
    console.log('Registration attempt:', formData);
    router.push('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: currentColor.background }}>
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg" style={{ backgroundColor: currentColor.background }}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: `${currentColor.primary}22` }}>
            <i className="fa-solid fa-user-plus text-4xl" style={{ color: currentColor.primary }}></i>
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: currentColor.text }}>ثبت نام</h1>
          <p className="text-sm" style={{ color: `${currentColor.text}80` }}>لطفا اطلاعات خود را وارد کنید</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: currentColor.text }}>
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border outline-none transition-colors"
              style={{ 
                backgroundColor: `${currentColor.primary}10`,
                borderColor: `${currentColor.primary}30`,
                color: currentColor.text
              }}
              placeholder="نام و نام خانوادگی"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: currentColor.text }}>
              ایمیل
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border outline-none transition-colors"
              style={{ 
                backgroundColor: `${currentColor.primary}10`,
                borderColor: `${currentColor.primary}30`,
                color: currentColor.text
              }}
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: currentColor.text }}>
              رمز عبور
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border outline-none transition-colors"
              style={{ 
                backgroundColor: `${currentColor.primary}10`,
                borderColor: `${currentColor.primary}30`,
                color: currentColor.text
              }}
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: currentColor.text }}>
              تکرار رمز عبور
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border outline-none transition-colors"
              style={{ 
                backgroundColor: `${currentColor.primary}10`,
                borderColor: `${currentColor.primary}30`,
                color: currentColor.text
              }}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg text-white font-medium transition duration-200 hover:opacity-90"
            style={{ backgroundColor: currentColor.primary }}
          >
            ثبت نام
          </button>

          <div className="text-center mt-6">
            <p className="text-sm" style={{ color: currentColor.text }}>
              قبلاً ثبت نام کرده‌اید؟{' '}
              <Link
                href="/login"
                className="hover:underline"
                style={{ color: currentColor.primary }}
              >
                وارد شوید
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Register() {
  return (
    <RegisterContent />
  );
} 