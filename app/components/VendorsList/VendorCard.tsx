'use client';

import React from 'react';
import { Vendor } from '../../Types/index';

interface VendorCardProps {
  vendor: Vendor;
  onEdit: (vendor: Vendor) => void;
  onDelete: (vendor: Vendor) => void;
  onSelect: (vendor: Vendor) => void;
}

export default function VendorCard({ vendor, onEdit, onDelete, onSelect }: VendorCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onSelect(vendor)}
    >
      <div className="flex items-start gap-4">
        <img
          src={vendor.logo}
          alt={vendor.brandName}
          className="w-16 h-16 object-contain rounded text-gray-500"
        />
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{vendor.brandName}</h3>
          <p className="text-gray-600">{vendor.ownerName}</p>
          <p className="text-gray-500">{vendor.phoneNumber}</p>
          <p className="text-gray-500 text-sm">{vendor.location.address}</p>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(vendor);
          }}
          className="px-3 py-1 bg-blue-500 text-black rounded hover:bg-blue-600"
        >
          ویرایش
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(vendor);
          }}
          className="px-3 py-1 bg-red-500 text-black rounded hover:bg-red-600"
        >
          حذف
        </button>
      </div>
    </div>
  );
}