export interface Vendor {
    id: string;
    brandName: string;
    ownerName: string;
    phoneNumber: string;
    location: {
      lat: number;
      lng: number;
      address: string;
    };
    logo: string;
  }
  
  export interface VendorContextType {
    vendors: Vendor[];
    addVendor: (vendor: Omit<Vendor, 'id'>) => void;
    editVendor: (id: string, vendor: Omit<Vendor, 'id'>) => void;
    deleteVendor: (id: string) => void;
    searchVendors: (query: string) => Vendor[];
  }
  
  export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }