import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalItems, selectTotalPrice } from '../../../store/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import { selectCurrentDeliveryLocation } from '../../../store/appSlice';
import 'react-toastify/dist/ReactToastify.css';

function BottumComponent() {
    const navigate = useNavigate();
    const totalItems = useSelector(selectTotalItems);
    const totalPrice = useSelector(selectTotalPrice);
    const location = useSelector(selectCurrentDeliveryLocation)

    const toCheckOut = () => {
        if (location) {
            navigate('/checkout');
        } else {
            toast.error("Chose location for delivery") 
        }
    }

    return (
        <div className="fixed sm:max-w-[560px] bottom-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-4 rounded-t-xl shadow-lg flex justify-between items-center">
            {/* Price and Item Count */}
            <div>
                <p className="text-lg font-bold text-warning">AED {totalPrice.toFixed(2)}</p>
                <p className="text-sm">{totalItems} {totalItems === 1 ? 'item' : 'items'} Added</p>
            </div>
            <ToastContainer/>
            {/* View Cart Button */}
            <button onClick={()=>toCheckOut()} className="btn btn-warning text-white text-sm font-semibold py-2 px-4 rounded-md shadow">
                Order
            </button>
        </div>
    );
}

export default BottumComponent;
