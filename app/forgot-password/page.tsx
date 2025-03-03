'use client';

import { ThemeModeContext } from "@/src/contexts/themeMode";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { colors } from "@/src/styles/theme/colors";

function ForgotPasswordContent() {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle password reset logic
    console.log('Password reset requested for:', email);
    // Show success message or redirect
    alert('اگر این ایمیل در سیستم ثبت شده باشد، لینک بازیابی رمز عبور برای شما ارسال خواهد شد.');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: currentColor.background }}>
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg" style={{ backgroundColor: currentColor.background }}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: `${currentColor.primary}22` }}>
            <i className="fa-solid fa-key text-4xl" style={{ color: currentColor.primary }}></i>
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: currentColor.text }}>بازیابی رمز عبور</h1>
          <p className="text-sm" style={{ color: `${currentColor.text}80` }}>لطفا ایمیل خود را وارد کنید</p>
        </div>

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium" style={{ color: currentColor.text }}>
              ایمیل
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg text-white font-medium transition duration-200 hover:opacity-90"
            style={{ backgroundColor: currentColor.primary }}
          >
            ارسال لینک بازیابی
          </button>

          <div className="text-center mt-6">
            <p className="text-sm" style={{ color: currentColor.text }}>
              به یاد آوردید؟{' '}
              <Link
                href="/login"
                className="hover:underline"
                style={{ color: currentColor.primary }}
              >
                بازگشت به صفحه ورود
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ForgotPassword() {
  return (
    <ForgotPasswordContent />
  );
} 