import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentDeliveryLocation, selectLocations, setCurrentDeliveryLocation } from '../../../store/appSlice';

function DeliveryLocationCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locations = useSelector(selectLocations);
  const currentDeliveryLocation = useSelector(selectCurrentDeliveryLocation);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeLocation = () => {
    setIsModalOpen(true);
  };

  const handleSelectLocation = (location) => {
    dispatch(setCurrentDeliveryLocation(location));
    setIsModalOpen(false);
  };

  const handleAddAddress = () => {
    navigate('/account/add-address');
  };

  return (
    <div>
      {/* Delivery Card */}
      <div className="flex justify-between items-start p-3 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-sm my-3">
        <div className="flex gap-2">
          <img
            src="https://img.freepik.com/free-vector/delivery-man-with-parcel-box-holding-smartphone-with-tracking-number-vector-illustration-flat-cartoon-style_138676-3237.jpg?w=2000"
            alt="map"
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-sm pb-1">Delivery to:</span>
            <span className="font-extralight text-xs">
              {currentDeliveryLocation ? currentDeliveryLocation.address : 'No address selected'}
            </span>
            {currentDeliveryLocation && (
              <>
                <span className="font-extralight text-xs">latitude: {currentDeliveryLocation.lat}</span>
                <span className="font-extralight text-xs">longitude: {currentDeliveryLocation.lng}</span>
              </>
            )}
          </div>
        </div>
        <span className="text-xs text-warning font-bold text-end cursor-pointer" onClick={handleChangeLocation}>
          Change
        </span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-5 w-3/4 max-w-md">
            <h2 className="text-lg font-semibold mb-4">Select Address</h2>
            <button
              onClick={handleAddAddress}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 flex items-center gap-2"
            >
              <span>Add New Address</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            {locations.length > 0 ? (
              <ul className="space-y-3">
                {locations.map((location, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectLocation(location)}
                    className="cursor-pointer p-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <span className="font-medium">{location.address}</span>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Lat: {location.lat}, Lng: {location.lng}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No saved addresses found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DeliveryLocationCard;