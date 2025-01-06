import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalItems, selectTotalPrice } from '../../../store/cartSlice';

function CartComponent() {
    const totalItems = useSelector(selectTotalItems);
    const totalPrice = useSelector(selectTotalPrice);

    return (
        <div className="fixed sm:max-w-[560px] bottom-0 z-20 w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-4 rounded-t-xl shadow-lg flex justify-between items-center">
            {/* Price and Item Count */}
            <div>
                <p className="text-lg font-bold">AED {totalPrice.toFixed(2)}</p>
                <p className="text-sm">{totalItems} {totalItems === 1 ? 'item' : 'items'} Added</p>
            </div>
            {/* View Cart Button */}
            <Link to="/cart" className="btn bg-white text-main-color text-sm font-semibold py-2 px-4 rounded-md shadow">
                View Cart
            </Link>
        </div>
    );
}

export default CartComponent;
