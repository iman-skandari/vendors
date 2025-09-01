'use client';

import React, { useState, useEffect } from 'react';
import { VendorProvider, useVendor } from './context/VendorContext';
import Header from './components/Header/Headers';
import VendorList from './components/VendorsList/VendorList';
import Map from './components/Map/map';
import VendorFormModal from './components/Modal/VendorFormModal';
import ConfirmModal from './components/Modal/ConfirmModal';
import Toast from './components/Toast/Toast';
import { Vendor } from './Types';

function VendorManagement() {
  const { vendors, deleteVendor, searchVendors } = useVendor();
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(vendors);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState<Vendor | null>(null);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [toasts, setToasts] = useState<{id: string, message: string, type: string}[]>([]);
  const [showMap, setShowMap] = useState(true);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setFilteredVendors(vendors);
    } else {
      setFilteredVendors(searchVendors(query));
    }
  };

  const handleAddVendor = () => {
    setEditingVendor(null);
    setIsFormModalOpen(true);
    setShowMap(false);
  };

  const handleEditVendor = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setIsFormModalOpen(true);
    setShowMap(false);
  };

  const handleDeleteVendor = (vendor: Vendor) => {
    setVendorToDelete(vendor);
    setIsDeleteModalOpen(true);
    setShowMap(false);
  };

  const confirmDelete = () => {
    if (vendorToDelete) {
      deleteVendor(vendorToDelete.id);
      showToast('همکار با موفقیت حذف شد', 'success');
      setIsDeleteModalOpen(false);
      setVendorToDelete(null);
    }
  };

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor);
  };

  useEffect(() => {
    setFilteredVendors(vendors);
  }, [vendors]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onAddVendor={handleAddVendor} onSearch={handleSearch} />
      
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* لیست وندورها */}
          <div className="overflow-y-auto">
            <VendorList
              vendors={filteredVendors}
              onEdit={handleEditVendor}
              onDelete={handleDeleteVendor}
              onSelect={handleVendorSelect}
            />
          </div>
          
          {/* نقشه */}
          {showMap && (
            <div className="hidden lg:block">
              <Map
                vendors={vendors}
                selectedVendor={selectedVendor}
                onVendorSelect={handleVendorSelect}
              />
            </div>
          )}
        </div>
      </main>

      {/* مودال‌ها */}
      <VendorFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingVendor(null);
          setShowMap(true);
        }}
        vendor={editingVendor}
        onSuccess={(message) => showToast(message, 'success')}
      />
      
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setVendorToDelete(null);
          setShowMap(true);
        }}
        onConfirm={confirmDelete}
        title="حذف همکار"
        message="آیا از حذف این همکار اطمینان دارید؟ این عمل قابل بازگشت نیست."
      />

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type as 'success' | 'error' | 'info'}
            onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <VendorProvider>
      <VendorManagement />
    </VendorProvider>
  );
}