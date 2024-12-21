import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { MapPin } from 'lucide-react';

// Custom marker component
const Marker = ({ lat, lng }) => (
  <div style={{ color: 'white', fontSize: '24px' }}>
    <MapPin className='w-10 h-10 ' />
  </div>
);

function MapComponent() {
  const defaultLocation = { lat: 51.505, lng: -0.09 }; // Default position (London)
  const [position, setPosition] = useState(defaultLocation); // Current position
  const [zoom, setZoom] = useState(11); // Default zoom level

  const handleMapClick = ({ lat, lng }) => {
    setPosition({ lat, lng }); // Update position on map click
  };

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom); // Update zoom level
  };

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCPvqKJigbPJWjWpPcHXQ-c5TxuHTXQaRM' }} // Replace with your API key
        defaultCenter={defaultLocation}
        center={position}
        zoom={zoom}
        onClick={handleMapClick}
        onChange={({ zoom }) => handleZoomChange(zoom)} // Handle zoom changes
      >
        <Marker lat={position.lat} lng={position.lng} />
      </GoogleMapReact>
      <div className="bg-black text-white text-center -mt-5 py-3 absolute w-full z-40 rounded-t-xl">
        <p>
          <strong>Selected Location:</strong> {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
        </p>
        <p>
          <strong>Zoom Level:</strong> {zoom}
        </p>
      </div>
    </div>
  );
}

export default MapComponent;
