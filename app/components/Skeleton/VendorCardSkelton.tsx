'use client';

import React from 'react';

export default function VendorCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gray-300 rounded"></div>
        
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-3 bg-gray-300 rounded w-4/5"></div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end gap-2">
        <div className="w-16 h-8 bg-gray-300 rounded"></div>
        <div className="w-16 h-8 bg-gray-300 rounded"></div>
      </div>
      
    </div>
  );
}