import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { MapPin, Plus, Minus, Crosshair } from 'lucide-react';

// Custom marker component
const Marker = ({ lat, lng }) => (
  <div style={{ color: 'white', fontSize: '24px' }}>
    <MapPin className="w-10 h-10 text-white" />
  </div>
);

function MapComponent({ position, setPosition, defaultLocation }) {
   // Current position
  const [zoom, setZoom] = useState(11); // Default zoom level

  const handleMapClick = ({ lat, lng }) => {
    setPosition({ lat, lng }); // Update position on map click
  };

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom); // Update zoom level
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lng: longitude });
          setZoom(15); // Adjust zoom for better visibility of the location
        },
        () => alert('Unable to retrieve your location')
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div style={{ height: '80vh', width: '100%' }} className="relative">
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

      {/* Info Section */}
      <div className="bg-black text-white text-center -mt-5 py-3 absolute w-full z-40 rounded-t-xl">
        <p>
          <strong>Selected Location:</strong> {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
        </p>
        <p>
          <strong>Zoom Level:</strong> {zoom}
        </p>
      </div>

      {/* Controls Section */}
      <div className="absolute top-[50vh] right-3 z-50 flex flex-col gap-2">
        {/* Current Location Button */}
        <span className="tooltip tooltip-left tooltip-warning tooltip-open" data-tooltip="Current Location">
          <button
            className="bg-white p-2 rounded-sm shadow hover:bg-gray-200 flex justify-center items-center"
            onClick={handleCurrentLocation}
          >
            <Crosshair className="w-6 h-6 text-gray-700" />
          </button>
        </span>
      </div>
    </div>
  );
}

export default MapComponent;
