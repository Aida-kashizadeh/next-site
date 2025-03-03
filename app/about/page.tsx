"use client";
import Layout from "@/src/components/layout";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ThemeModeContext } from "@/src/contexts/themeMode";
import { colors } from "@/src/styles/theme/colors";
import { useContext } from "react";

export default function About() {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];

  return (
    <Layout>
      <div className="h-[50px]"></div>
      
      <div className="container mx-auto px-4 py-12">
        <h1 style={{ color: currentColor.text }} className="text-4xl font-bold text-center mb-8">درباره ما</h1>
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p style={{ color: currentColor.text }} className="text-lg leading-relaxed">
            ما یک تیم متخصص و با تجربه هستیم که با تمرکز بر نوآوری و کیفیت، خدمات برتر را به مشتریان خود ارائه می‌دهیم.
            هدف ما ایجاد راه‌حل‌های هوشمند و کارآمد برای نیازهای کسب و کار شماست.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div style={{ backgroundColor: currentColor.background, boxShadow: `1px 1px 10px 3px ${currentColor.primary}` }} className="p-6 rounded-lg text-center">
            <div style={{ color: currentColor.primary }} className="text-4xl mb-4">
              <i className="fas fa-users"></i>
            </div>
            <h3 style={{ color: currentColor.text }} className="text-xl font-semibold mb-2">تیم متخصص</h3>
            <p style={{ color: currentColor.text }} className="text-gray-600">متشکل از بهترین متخصصان در حوزه‌های مختلف</p>
          </div>
          
          <div style={{ backgroundColor: currentColor.background, boxShadow: `1px 1px 10px 3px ${currentColor.primary}` }} className="p-6 rounded-lg text-center">
            <div style={{ color: currentColor.primary }} className="text-4xl mb-4">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3 style={{ color: currentColor.text }} className="text-xl font-semibold mb-2">نوآوری</h3>
            <p style={{ color: currentColor.text }} className="text-gray-600">استفاده از جدیدترین تکنولوژی‌ها و روش‌ها</p>
          </div>
          
          <div style={{ backgroundColor: currentColor.background, boxShadow: `1px 1px 10px 3px ${currentColor.primary}` }} className="p-6 rounded-lg text-center">
            <div style={{ color: currentColor.primary }} className="text-4xl mb-4">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 style={{ color: currentColor.text }} className="text-xl font-semibold mb-2">رشد پایدار</h3>
            <p style={{ color: currentColor.text }} className="text-gray-600">تمرکز بر توسعه و پیشرفت مداوم</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}