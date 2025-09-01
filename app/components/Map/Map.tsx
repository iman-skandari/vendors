'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Vendor } from '../../Types/index';

// رفع مشکل آیکون‌های leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialPosition?: [number, number];
}

interface LocationMarkerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialPosition?: [number, number];
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ 
  onLocationSelect, 
  initialPosition 
}) => {
  const [position, setPosition] = useState<[number, number]>(initialPosition || [35.715298, 51.404343]);

  const map = useMapEvents({
    click(e) {
      const newPosition: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPosition(newPosition);
      onLocationSelect(newPosition[0], newPosition[1]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
      map.flyTo(initialPosition, 13);
    }
  }, [initialPosition, map]);

  return position ? (
    <Marker position={position}>
      <Popup>
        موقعیت انتخاب شده<br />
        عرض: {position[0].toFixed(6)}<br />
        طول: {position[1].toFixed(6)}
      </Popup>
    </Marker>
  ) : null;
};

const MapPicker: React.FC<MapPickerProps> = ({ onLocationSelect, initialPosition }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-96 bg-gray-200 rounded-md flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600">در حال بارگذاری نقشه...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-96 rounded-md overflow-hidden border border-gray-300 relative">
       <MapContainer
        center={initialPosition || [35.715298, 51.404343]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker 
          onLocationSelect={onLocationSelect} 
          initialPosition={initialPosition}
        />
      </MapContainer>
      
      {/* راهنمای نقشه */}
      <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-3 py-1 rounded-md shadow-sm z-10">
        <span className="text-xs text-gray-600">برای انتخاب موقعیت کلیک کنید</span>
      </div>
    </div>
  );
};

// Map component for displaying vendors
interface MapProps {
  vendors: Vendor[];
  selectedVendor: Vendor | null;
  onVendorSelect: (vendor: Vendor) => void;
}

const Map: React.FC<MapProps> = ({ vendors, selectedVendor, onVendorSelect }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-96 md:h-full bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600">در حال بارگذاری نقشه...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-96 md:h-full rounded-lg overflow-hidden">
      <MapContainer
        center={[35.715298, 51.404343]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {vendors.map(vendor => (
          <Marker
            key={vendor.id}
            position={[vendor.location.lat, vendor.location.lng]}
            eventHandlers={{
              click: () => onVendorSelect(vendor)
            }}
          >
            <Popup>
              <div className="text-center">
                <strong>{vendor.brandName}</strong><br />
                {vendor.ownerName}<br />
                {vendor.phoneNumber}<br />
                <small>{vendor.location.address}</small>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export { MapPicker };
export default Map;