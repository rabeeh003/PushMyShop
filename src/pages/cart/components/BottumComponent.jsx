import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalItems, selectTotalPrice } from '../../../store/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import { selectCurrentDeliveryLocation } from '../../../store/appSlice'; // Removed unused selectShopData
import 'react-toastify/dist/ReactToastify.css';

function BottumComponent() {
    const navigate = useNavigate();
    const totalItems = useSelector(selectTotalItems);
    const totalPrice = useSelector(selectTotalPrice);
    const location = useSelector(selectCurrentDeliveryLocation);

    // Fixed shop data for testing
    const shopData = {
        latitude: "25.276987",
        longitude: "55.296249",
        delivery_radius: "200", // Delivery radius in kilometers
    };

    const [isDeliveryAvailable, setDeliveryAvailable] = useState(false);

    // Haversine formula for distance calculation
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const toRadians = (degrees) => degrees * (Math.PI / 180);
        const R = 6371; // Earth's radius in kilometers

        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in kilometers
    };

    // Check delivery availability
    useEffect(() => {
        if (location) {
            const { lat: customerLat, lng: customerLong } = location;

            const distance = calculateDistance(
                parseFloat(shopData.latitude),
                parseFloat(shopData.longitude),
                parseFloat(customerLat),
                parseFloat(customerLong)
            );

            setDeliveryAvailable(distance <= parseFloat(shopData.delivery_radius));
        } else {
            setDeliveryAvailable(false);
        }
    }, [location, shopData]);

    const toCheckOut = () => {
        if (!location) {
            toast.error("Please choose a location for delivery");
        } else if (!isDeliveryAvailable) {
            toast.error(`Delivery is not available at your location. Our delivery radius is ${shopData.delivery_radius} km.`);
        } else {
            navigate('/checkout');
        }
    };

    return (
        <div className="fixed sm:max-w-[560px] bottom-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-4 rounded-t-xl shadow-lg flex justify-between items-center">
            {/* Price and Item Count */}
            <div>
                <p className="text-lg font-bold ">AED {totalPrice.toFixed(2)}</p>
                <p className="text-sm">{totalItems} {totalItems === 1 ? 'item' : 'items'} Added</p>
            </div>
            <ToastContainer />
            {/* View Cart Button */}
            <button
                onClick={toCheckOut}
                disabled={!isDeliveryAvailable}
                className={`btn ${isDeliveryAvailable ? 'bg-white text-main-color' : 'bg-black'}  text-sm font-semibold py-2 px-4 rounded-md shadow`}
            >
                {isDeliveryAvailable ? 'Order' : 'Delivery Unavailable'}
            </button>
        </div>
    );
}

export default BottumComponent;
