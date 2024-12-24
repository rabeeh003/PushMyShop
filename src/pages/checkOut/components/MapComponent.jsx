import React from 'react';
import GoogleMapReact from 'google-map-react';
import { ChevronLeft, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { selectCurrentDeliveryLocation } from '../../../store/appSlice';
import { useSelector } from 'react-redux';

// Custom marker component
const Marker = () => (
  <div style={{ color: 'white', fontSize: '24px' }}>
    <MapPin className="w-10 h-10 text-warning" />
  </div>
);

function MapComponent() {
  const location = useSelector(selectCurrentDeliveryLocation);
  const lat = location.lat;
  const lng = location.lng;
  const defaultZoom = 18; // Fixed zoom level

  return (
    <div style={{ height: '85vh', width: '100%' }} className="relative">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCBmFnNqWbizwxbnfF-6F4hUNp8jh5_RlY' }} // Replace with your API key
        defaultCenter={{ lat, lng }} // Fixed center point
        defaultZoom={defaultZoom} // Fixed zoom level
        options={{
          disableDefaultUI: true, // Disable map controls for testing
          draggable: false, // Disable dragging for a static experience
        }}
      >
        <Marker lat={lat} lng={lng} />
      </GoogleMapReact>

      {/* back button */}
      <div className="absolute top-[10px] left-0 z-50">
        <Link to='/cart' className="bg-white p-2 pl-4 rounded-sm rounded-r-3xl px-3 shadow hover:bg-gray-200 flex justify-center items-center">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
      </div>
    </div>
  );
}

export default MapComponent;
