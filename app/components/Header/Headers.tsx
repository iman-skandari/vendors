'use client';

import React, { useState } from 'react';


interface HeaderProps {
  onAddVendor: () => void;
  onSearch: (query: string) => void;
}

export default function Header({ onAddVendor, onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    onSearch(query);
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">مدیریت همکاران</h1>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="جستجو بر اساس نام برند..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 rounded text-gray-800 w-full md:w-64"
          />
          
          <button
            onClick={onAddVendor}
            className="bg-white text-blue-600 px-6 py-2 rounded font-medium hover:bg-blue-50 transition-colors"
          >
            افزودن همکار جدید
          </button>
        </div>
      </div>
    </header>
  );
}