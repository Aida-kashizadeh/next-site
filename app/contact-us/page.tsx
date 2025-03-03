"use client";

import { useContext, useState } from "react";
import Layout from "@/src/components/layout";
import { ThemeModeContext } from "@/src/contexts/themeMode";
import { colors } from "@/src/styles/theme/colors";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { motion } from "framer-motion";

export default function ContactUs() {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4" style={{ color: currentColor.text }}>
              تماس با ما
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: currentColor.text }}>
              ما همیشه آماده کمک به شما هستیم. لطفاً از طریق فرم زیر یا اطلاعات تماس با ما در ارتباط باشید.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <motion.div 
                style={{ 
                  backgroundColor: currentColor.background,
                  boxShadow: `1px 1px 10px 3px ${currentColor.primary}`,
                }} 
                className="p-6 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-semibold mb-6" style={{ color: currentColor.text }}>اطلاعات تماس</h2>
                
                <motion.div className="space-y-4" variants={staggerChildren} initial="initial" animate="animate">
                  <motion.div className="flex items-center" variants={fadeInUp}>
                    <i className="fas fa-map-marker-alt text-xl w-8" style={{ color: currentColor.primary }}></i>
                    <span style={{ color: currentColor.text }}>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
                  </motion.div>
                  
                  <motion.div className="flex items-center" variants={fadeInUp}>
                    <i className="fas fa-phone text-xl w-8" style={{ color: currentColor.primary }}></i>
                    <span style={{ color: currentColor.text }}>۰۲۱-۱۲۳۴۵۶۷۸</span>
                  </motion.div>
                  
                  <motion.div className="flex items-center" variants={fadeInUp}>
                    <i className="fas fa-envelope text-xl w-8" style={{ color: currentColor.primary }}></i>
                    <span style={{ color: currentColor.text }}>info@example.com</span>
                  </motion.div>
                </motion.div>

                {/* Social Media Links */}
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-semibold mb-4" style={{ color: currentColor.text }}>ما را در شبکه‌های اجتماعی دنبال کنید</h3>
                  <div className="flex space-x-4">
                    {['instagram', 'telegram', 'whatsapp', 'linkedin'].map((social, index) => (
                      <motion.a
                        key={social}
                        href="#"
                        className="hover:opacity-75"
                        style={{ color: currentColor.primary }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <i className={`fab fa-${social} text-2xl`}></i>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Map */}
              <motion.div 
                style={{ 
                  backgroundColor: currentColor.background,
                  boxShadow: `1px 1px 10px 3px ${currentColor.primary}`,
                }} 
                className="p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-6" style={{ color: currentColor.text }}>موقعیت ما</h2>
                <div className="w-full h-[300px] rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207371.97277245773!2d51.678970265625!3d35.69699570000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0b3697c567024bc!2sTehran%2C%20Tehran%20Province%2C%20Iran!5e0!3m2!1sen!2s!4v1645509426873!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div 
              style={{ 
                backgroundColor: currentColor.background,
                boxShadow: `1px 1px 10px 3px ${currentColor.primary}`,
              }} 
              className="p-6 rounded-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-6" style={{ color: currentColor.text }}>ارسال پیام</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {['name', 'email', 'subject'].map((field, index) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <label htmlFor={field} className="block mb-2" style={{ color: currentColor.text }}>
                      {field === 'name' ? 'نام و نام خانوادگی' : field === 'email' ? 'ایمیل' : 'موضوع'}
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg"
                      style={{ 
                        backgroundColor: `${currentColor.primary}15`,
                        color: currentColor.text,
                        border: `1px solid ${currentColor.primary}30`
                      }}
                      required
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="message" className="block mb-2" style={{ color: currentColor.text }}>پیام</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg resize-none"
                    style={{ 
                      backgroundColor: `${currentColor.primary}15`,
                      color: currentColor.text,
                      border: `1px solid ${currentColor.primary}30`
                    }}
                    required
                  ></motion.textarea>
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full py-3 rounded-lg font-semibold transition-all duration-200"
                  style={{ backgroundColor: currentColor.primary, color: currentColor.text }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  ارسال پیام
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
