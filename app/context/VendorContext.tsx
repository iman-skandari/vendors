'use client';

import React, { createContext, useContext, useReducer, useState } from 'react';
import { Vendor, VendorContextType } from '../Types/index';

interface VendorState {
  vendors: Vendor[];
}

type VendorAction =
  | { type: 'ADD_VENDOR'; payload: Vendor }
  | { type: 'EDIT_VENDOR'; payload: { id: string; vendor: Vendor } }
  | { type: 'DELETE_VENDOR'; payload: string };

const VendorContext = createContext<VendorContextType | undefined>(undefined);

function vendorReducer(state: VendorState, action: VendorAction): VendorState {
  switch (action.type) {
    case 'ADD_VENDOR':
      return { vendors: [...state.vendors, action.payload] };
    case 'EDIT_VENDOR':
      return {
        vendors: state.vendors.map(v =>
          v.id === action.payload.id ? action.payload.vendor : v
        )
      };
    case 'DELETE_VENDOR':
      return { vendors: state.vendors.filter(v => v.id !== action.payload) };
    default:
      return state;
  }
}


const initialVendors: Vendor[] = [
  {
    id: '1',
    brandName: 'رستوران ایرانی',
    ownerName: 'محمد رضایی',
    phoneNumber: '09123456789',
    location: {
      lat: 35.715298,
      lng: 51.404343,
      address: 'تهران، میدان انقلاب'
    },
    logo: '/logo1.jpg'
  },

];

export function VendorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(vendorReducer, { vendors: initialVendors });
  const [searchQuery, setSearchQuery] = useState('');

  const addVendor = (vendorData: Omit<Vendor, 'id'>) => {
    const newVendor: Vendor = {
      ...vendorData,
      id: Date.now().toString()
    };
    dispatch({ type: 'ADD_VENDOR', payload: newVendor });
  };

  const editVendor = (id: string, vendorData: Omit<Vendor, 'id'>) => {
    const updatedVendor: Vendor = { ...vendorData, id };
    dispatch({ type: 'EDIT_VENDOR', payload: { id, vendor: updatedVendor } });
  };

  const deleteVendor = (id: string) => {
    dispatch({ type: 'DELETE_VENDOR', payload: id });
  };

  const searchVendors = (query: string): Vendor[] => {
    return state.vendors.filter(vendor =>
      vendor.brandName.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <VendorContext.Provider
      value={{
        vendors: state.vendors,
        addVendor,
        editVendor,
        deleteVendor,
        searchVendors
      }}
    >
      {children}
    </VendorContext.Provider>
  );
}

export function useVendor() {
  const context = useContext(VendorContext);
  if (context === undefined) {
    throw new Error('useVendor must be used within a VendorProvider');
  }
  return context;
}