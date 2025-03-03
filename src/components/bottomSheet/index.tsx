'use client';

import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { useState } from 'react';

export default function MyBottomSheet() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button 
        onClick={() => setOpen(true)} 
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        باز کردن BottomSheet
      </button>

      <BottomSheet open={open} onDismiss={() => setOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold">عنوان</h2>
          <p className="text-gray-600">این یک BottomSheet ساده است!</p>
        </div>
      </BottomSheet>
    </div>
  );
}
