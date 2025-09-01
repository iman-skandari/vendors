'use client';

import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ 
  message, 
  type, 
  onClose, 
  duration = 3000 
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getBgColor = () => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`${getBgColor()} text-white px-6 py-3 rounded-lg shadow-lg flex items-center`}>
      <span className="ml-2">{message}</span>
      <button
        onClick={onClose}
        className="mr-2 text-white hover:text-gray-200"
      >
        &times;
      </button>
    </div>
  );
}
// کامپوننت Skeleton برای loading state
// tsx
// src/components/Skeleton/VendorCardSkeleton.tsx
