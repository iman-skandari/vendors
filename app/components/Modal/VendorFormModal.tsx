// src/components/Modal/VendorFormModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useVendor } from '../../context/VendorContext';
import { Vendor } from '../../Types/index';
// import { MapPicker } from '../Map/map';

interface VendorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor?: Vendor | null;
  onSuccess: (message: string) => void;
}

interface FormData {
  brandName: string;
  ownerName: string;
  logo: string;
  phoneNumber: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
}

const VendorFormModal: React.FC<VendorFormModalProps> = ({ 
  isOpen, 
  onClose, 
  vendor, 
  onSuccess 
}) => {
  const { addVendor, editVendor } = useVendor();
  const [formData, setFormData] = useState<FormData>({
    brandName: '',
    ownerName: '',
    logo: '',
    phoneNumber: '',
    location: {
      address: '',
      lat: 35.715298,
      lng: 51.404343
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (vendor) {
      setFormData({
        brandName: vendor.brandName,
        ownerName: vendor.ownerName,
        logo: vendor.logo,
        phoneNumber: vendor.phoneNumber,
        location: vendor.location
      });
    } else {
      setFormData({
        brandName: '',
        ownerName: '',
        logo: '',
        phoneNumber: '',
        location: {
          address: '',
          lat: 35.715298,
          lng: 51.404343
        }
      });
    }
    setErrors({});
  }, [vendor, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.brandName.trim()) {
      newErrors.brandName = 'نام برند الزامی است';
    }

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'نام مسئول الزامی است';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'شماره تماس الزامی است';
    } else if (!/^09[0-9]{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'شماره تماس معتبر نیست';
    }

    if (!formData.location.address.trim()) {
      newErrors.address = 'آدرس الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (vendor) {
      editVendor(vendor.id, formData);
      onSuccess('همکار با موفقیت ویرایش شد');
    } else {
      addVendor(formData);
      onSuccess('همکار جدید با موفقیت افزوده شد');
    }
    
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'address') {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          address: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        lat,
        lng
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {vendor ? 'ویرایش همکار' : 'افزودن همکار جدید'}
            </h2>
            <button
              onClick={onClose}
              className="text-black hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-black border-b pb-2">
                  اطلاعات همکار
                </h3>
                
     
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نام برند *
                  </label>
                  <input
                    type="text"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400 ${
                      errors.brandName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="مثال: شرکت تجارت پارسیان"
                  />
                  {errors.brandName && (
                    <p className="text-red-500 text-xs mt-1">{errors.brandName}</p>
                  )}
                </div>

             
                <div>
                  <label className="block text-sm font-medium text-black mb-1 ">
                    نام و نام خانوادگی مسئول *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-gray-400 focus:ring-blue-500 ${
                      errors.ownerName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="مثال: محمد رضایی"
                  />
                  {errors.ownerName && (
                    <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>
                  )}
                </div>

         
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    آدرس تصویر لوگو
                  </label>
                  <input
                    type="url"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/logo.jpg"
                  />
                </div>

     
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    شماره تماس *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="09123456789"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

          
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    آدرس *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.location.address}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="مثال: تهران، میدان انقلاب"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                  )}
                </div>

     
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      عرض جغرافیایی
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={formData.location.lat}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        location: {
                          ...prev.location,
                          lat: parseFloat(e.target.value) || 0
                        }
                      }))}
                      className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      طول جغرافیایی
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={formData.location.lng}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        location: {
                          ...prev.location,
                          lng: parseFloat(e.target.value) || 0
                        }
                      }))}
                      className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* ستون سمت راست - نقشه */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
                  انتخاب موقعیت روی نقشه
                </h3>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-3">
                    برای انتخاب موقعیت، روی نقشه کلیک کنید. موقعیت انتخاب شده به صورت خودکار در فیلدهای مختصات ثبت می‌شود.
                  </p>
                  
                  {isOpen && (
                     <MapPicker
                       onLocationSelect={handleLocationSelect}
                       initialPosition={[formData.location.lat, formData.location.lng]}
                     />
                   )}
                  
                  <div className="mt-3 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-700">
                      <strong>موقعیت فعلی:</strong><br />
                      عرض: {formData.location.lat.toFixed(6)}<br />
                      طول: {formData.location.lng.toFixed(6)}
                    </p>
                  </div>
                </div>

                {/* راهنما */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-yellow-800 mb-2">
                    📍 راهنمای انتخاب موقعیت:
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• روی نقشه کلیک کنید تا موقعیت انتخاب شود</li>
                    <li>• می‌توانید با ماوس روی نقشه زوم کنید</li>
                    <li>• موقعیت انتخاب شده به صورت خودکار ذخیره می‌شود</li>
                    <li>• همچنین می‌توانید مختصات را دستی وارد کنید</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* دکمه‌های action */}
            <div className="flex justify-end gap-4 pt-6 mt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {vendor ? 'ویرایش همکار' : 'افزودن همکار'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorFormModal;
