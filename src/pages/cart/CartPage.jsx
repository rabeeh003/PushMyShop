import React from 'react';
import BottumComponent from './components/BottumComponent';
import { ChevronLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectCartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    selectTotalPrice,
} from '../../store/cartSlice';
import {  selectShopData } from '../../store/appSlice';
import DeliveryLocationCard from './components/DeliveryLocationCard';

function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const shopData = useSelector(selectShopData);

    const handleIncreaseQuantity = (id) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecreaseQuantity = (id, quantity) => {
        if (quantity === 1) {
            dispatch(removeFromCart(id)); // Remove item if quantity is 1
        } else {
            dispatch(decreaseQuantity(id));
        }
    };

    return (
        <div className="relative min-h-screen bg-white text-black">
            {/* Header */}
            <div className="flex items-center justify-center h-14 w-full sticky top-0 bg-white/60 backdrop-blur-md pt-3 ">
                <Link to="/">
                    <ChevronLeft className="absolute left-3 top-4 w-6 h-6" />
                </Link>
                <span className="text-center text-xl font-semibold">Lewoffy</span>
            </div>

            {cartItems.length > 0 ? (
                <>
                    <section className="px-4">
                        {/* Cart Section */}
                        <div className='pb-3'>
                            <span className="text-center text-lg font-semibold">Your Cart</span>
                            <div>
                                {cartItems.map((item) => (
                                    <div key={item.id} className="cart-item py-2 border-b">
                                        <div className="flex items-center">
                                            <img
                                                src={item.image && item.image.length > 0 ? "https://lewoffy.infineur.com/"+item.image : "/placeholder.png"}
                                                alt={item.name}
                                                className="w-24 h-24 rounded-lg object-cover"
                                            />
                                            <div className="ml-4 flex-1">
                                                <h3 className="font-bold">{item.name}</h3>
                                                <p className="text-sm text-gray-600">{item.category_name}</p>
                                                <div className="flex items-center mt-2">
                                                    {/* Quantity Controls */}
                                                    <button
                                                        onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                                                        className="p-1 border rounded-lg bg-gray-200 hover:bg-gray-300"
                                                    >
                                                        {item.quantity === 1 ? (
                                                            <Trash2 className="w-4 h-4 text-red-600" />
                                                        ) : (
                                                            <Minus className="w-4 h-4 text-gray-500" />
                                                        )}
                                                    </button>
                                                    <span className="px-4 font-semibold">{item.quantity}</span>
                                                    <button
                                                        onClick={() =>
                                                            item.quantity < 10 && handleIncreaseQuantity(item.id)
                                                        }
                                                        className="p-1 border rounded-lg bg-gray-200 hover:bg-gray-300"
                                                        disabled={item.quantity >= 10}
                                                    >
                                                        <Plus className="w-4 h-4 text-gray-500" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-10 items-end mt-2">
                                                <span
                                                    className={`w-2 h-2 rounded-full ${item.is_veg ? 'bg-green-500' : 'bg-red-500'
                                                        }`}
                                                />
                                                <span className="text-sm font-semibold">
                                                    AED {(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                        {/* Bill Details */}
                        <span className="text-center text-lg font-semibold">Bill Details</span>
                        <div className="relative p-4 bg-gray-200 rounded-lg shadow-sm my-3">
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm font-semibold">Subtotal</span>
                                <span className="text-sm">AED {totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex flex-col items-start">
                                    <span className="font-semibold text-sm">Delivery Charge</span>
                                    <span className="text-[10px] md:text-xs font-extralight">
                                        Save AED {shopData?.delivery_charges} on Delivery fee by ordering above AED 30
                                    </span>
                                </div>
                                <span className="text-main text-sm">
                                    {totalPrice >= 30 ? 'Free' : `AED ${shopData?.delivery_charges}`}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-2 border-t border-gray-400 pt-2">
                                <span className="font-semibold text-sm">Total</span>
                                <span className="text-sm font-bold">AED {(totalPrice + (totalPrice >= 30 ? 0 : 2  )).toFixed(2)}</span>
                            </div>
                        </div>
                        {/* Delivery Address */}
                        <DeliveryLocationCard/>
                        <div className='h-20'></div>
                    </section>
                    <BottumComponent />
                </>
            ) : (
                <p className="text-center text-gray-500 mt-4">Your cart is empty!</p>
            )}
            {/* Bottom Component */}
        </div>
    );
}

export default CartPage;
