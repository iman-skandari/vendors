'use client';

import React from 'react';
import { Vendor } from '../../Types/index';
import VendorCard from './VendorCard';
import VendorCardSkeleton from '../Skeleton/VendorCardSkelton';

interface VendorListProps {
  vendors: Vendor[];
  onEdit: (vendor: Vendor) => void;
  onDelete: (vendor: Vendor) => void;
  onSelect: (vendor: Vendor) => void;
  isLoading?: boolean;
  searchQuery?: string;
}

export default function VendorList({ 
  vendors, 
  onEdit, 
  onDelete, 
  onSelect, 
  isLoading = false,
  searchQuery = '' 
}: VendorListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <VendorCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-black text-6xl mb-4">📋</div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          {searchQuery ? 'همکاری یافت نشد' : 'هنوز همکاری اضافه نکرده‌اید'}
        </h3>
        <p className="text-black">
          {searchQuery 
            ? `نتیجه‌ای برای "${searchQuery}" یافت نشد`
            : 'برای شروع اولین همکار خود را اضافه کنید'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-black mb-2">
        نمایش {vendors.length} همکار
        {searchQuery && ` برای "${searchQuery}"`}
      </div>
      
      {vendors.map(vendor => (
        <VendorCard
          key={vendor.id}
          vendor={vendor}
          onEdit={onEdit}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}