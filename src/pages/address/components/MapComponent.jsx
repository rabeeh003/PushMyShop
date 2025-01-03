import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { MapPin, Crosshair, ChevronLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Autocomplete } from '@react-google-maps/api';

// Custom marker component
const Marker = ({ lat, lng }) => (
  <div style={{ color: 'white', fontSize: '24px' }}>
    <MapPin className="w-10 h-10 text-main-color" />
  </div>
);

function MapComponent({ position, setPosition, defaultLocation }) {
  const [zoom, setZoom] = useState(11); // Default zoom level
  const [autocomplete, setAutocomplete] = useState(null);

  const handleMapClick = ({ lat, lng }) => {
    setPosition({ lat, lng }); // Update position on map click
  };

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom); // Update zoom level
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const { lat, lng } = place.geometry.location;
        setPosition({ lat: lat(), lng: lng() });
        setZoom(15); // Adjust zoom for the selected location
      } else {
        toast.error('Place details are unavailable. Try again.');
      }
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lng: longitude });
          setZoom(15); // Adjust zoom for better visibility
        },
        (err) => {
          console.error(`Geolocation error (${err.code}): ${err.message}`);
          toast.error('Error fetching current location. Please check your browser settings.');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      toast.error('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div style={{ height: '65vh', width: '100%' }} className="relative">
      <GoogleMapReact
        key={`${position.lat}-${position.lng}`}
        bootstrapURLKeys={{ key: 'AIzaSyCBmFnNqWbizwxbnfF-6F4hUNp8jh5_RlY' }}
        defaultCenter={defaultLocation}
        center={position}
        zoom={zoom}
        onClick={handleMapClick}
        onChange={({ zoom }) => handleZoomChange(zoom)}
      >
        <Marker lat={position.lat} lng={position.lng} />
      </GoogleMapReact>

      <div className="absolute top-[10px] left-1/2 transform -translate-x-1/2 z-10 w-[70%]">
        {/* Autocomplete Search Box */}
        <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceChanged}>
          <input
            type="text"
            placeholder="Search for a location"
            className="min-w-full p-2 input bg-white border text-gray-700 border-gray-300 rounded-md"
          />
        </Autocomplete>
      </div>

      {/* Info Section */}
      <div onClick={handleCurrentLocation} className="bg-main-color text-white text-center -mt-5 py-3 absolute w-full z-40 rounded-t-xl">
        <span className="text-white flex justify-center gap-2" >
          <MapPin className="w-4 h-4 my-auto text-white" /> Current location
        </span>
      </div>

      {/* Back Button */}
      <div className="absolute top-[10px] left-0 z-50">
        <Link to={-1} className="bg-white p-2 pl-4 rounded-sm rounded-r-3xl px-3 shadow hover:bg-gray-200 flex justify-center items-center">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
      </div>
    </div>
  );
}

export default MapComponent;
