import { ThemeModeContext } from "@/src/contexts/themeMode";
import { colors } from "@/src/styles/theme/colors";
import { useContext } from "react";

export default function Footer() {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];

  return (
    <footer style={{ backgroundColor: currentColor.primary }} className="w-full pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-8">
          <div className="w-full lg:w-1/3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: currentColor.text }}>لوگوی شرکت</h2>
              <p className="text-sm leading-relaxed" style={{ color: currentColor.text }}>
                توضیحات کوتاه درباره شرکت یا کسب و کار شما در این قسمت قرار می‌گیرد.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-75" style={{ color: currentColor.text }}>
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" className="hover:opacity-75" style={{ color: currentColor.text }}>
                <i className="fab fa-telegram text-2xl"></i>
              </a>
              <a href="#" className="hover:opacity-75" style={{ color: currentColor.text }}>
                <i className="fab fa-whatsapp text-2xl"></i>
              </a>
              <a href="#" className="hover:opacity-75" style={{ color: currentColor.text }}>
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <h3 className="text-xl font-bold mb-4" style={{ color: currentColor.text }}>دسترسی سریع</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:opacity-75" style={{ color: currentColor.text }}>درباره ما</a>
              </li>
              <li>
                <a href="/contact-us" className="hover:opacity-75" style={{ color: currentColor.text }}>تماس با ما</a>
              </li>
              <li>
                <a href="#" className="hover:opacity-75" style={{ color: currentColor.text }}>خدمات</a>
              </li>
              <li>
                <a href="#" className="hover:opacity-75" style={{ color: currentColor.text }}>بلاگ</a>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-1/3">
            <h3 className="text-xl font-bold mb-4" style={{ color: currentColor.text }}>موقعیت ما</h3>
            <div className="w-full h-[200px] bg-gray-200 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207371.97277245773!2d51.678970265625!3d35.69699570000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0b3697c567024bc!2sTehran%2C%20Tehran%20Province%2C%20Iran!5e0!3m2!1sen!2s!4v1645509426873!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <hr className="border-t border-opacity-20" style={{ borderColor: currentColor.text }} />

        <div className="text-center pt-6">
          <p className="text-sm" style={{ color: currentColor.text }}>
            © {new Date().getFullYear()} تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}