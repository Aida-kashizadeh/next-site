'use client';

import { ThemeModeContext } from "@/src/contexts/themeMode";
import { colors } from "@/src/styles/theme/colors";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginContent() {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle login logic
    console.log('Login attempt:', formData);
    router.push('/profile');
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
            <i className="fa-solid fa-user text-4xl" style={{ color: currentColor.primary }}></i>
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: currentColor.text }}>ورود به حساب کاربری</h1>
          <p className="text-sm" style={{ color: `${currentColor.text}80` }}>لطفا اطلاعات خود را وارد کنید</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: currentColor.text }}>
              ایمیل یا نام کاربری
            </label>
            <input
              type="text"
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
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-300"
                style={{ accentColor: currentColor.primary }}
              />
              <label htmlFor="remember" className="mr-2 text-sm" style={{ color: currentColor.text }}>
                مرا به خاطر بسپار
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm hover:underline"
              style={{ color: currentColor.primary }}
            >
              فراموشی رمز عبور؟
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg text-white font-medium transition duration-200 hover:opacity-90"
            style={{ backgroundColor: currentColor.primary }}
          >
            ورود
          </button>

          <div className="text-center mt-6">
            <p className="text-sm" style={{ color: currentColor.text }}>
              حساب کاربری ندارید؟{' '}
              <Link
                href="/register"
                className="hover:underline"
                style={{ color: currentColor.primary }}
              >
                ثبت نام کنید
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Login() {
  return (
      <LoginContent />
  );
}