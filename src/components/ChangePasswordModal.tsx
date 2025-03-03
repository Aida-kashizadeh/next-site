'use client';

import { useState, useContext } from 'react';
import { ThemeModeContext } from '../contexts/themeMode';
import { colors } from '../styles/theme/colors';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (oldPassword: string, newPassword: string) => void;
}

export default function ChangePasswordModal({ isOpen, onClose, onSubmit }: ChangePasswordModalProps) {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('لطفاً تمام فیلدها را پر کنید');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('رمز عبور جدید و تکرار آن مطابقت ندارند');
      return;
    }

    if (newPassword.length < 8) {
      setError('رمز عبور جدید باید حداقل 8 کاراکتر باشد');
      return;
    }

    onSubmit(oldPassword, newPassword);
    resetForm();
  };

  const resetForm = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword(''); 
    setError('');
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
            تغییر رمز عبور
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
              htmlFor="oldPassword" 
              className="block mb-2 text-sm"
              style={{ color: currentColor.text }}
            >
              رمز عبور فعلی
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
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
              htmlFor="newPassword" 
              className="block mb-2 text-sm"
              style={{ color: currentColor.text }}
            >
              رمز عبور جدید
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              htmlFor="confirmPassword" 
              className="block mb-2 text-sm"
              style={{ color: currentColor.text }}
            >
              تکرار رمز عبور جدید
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              تغییر رمز عبور
            </button>
          </div>
        </form>
      </div>
    </>
  );
} 