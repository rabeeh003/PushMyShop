import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import MapComponent from './components/MapComponent';
import { clearCart, selectCartItems, selectTotalPrice } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectCurrentDeliveryLocation, selectLocations, selectShopData, selectUserData } from '../../store/appSlice';

function CheckOutPage() {
    const [selectedOption, setSelectedOption] = useState('');
    const defaultLocation = { lat: 25.2048, lng: 55.2708 }; // Default position (UAE: Dubai)
    const [position, setPosition] = useState(defaultLocation);
    const [address, setAddress] = useState('');
    const paymentSectionRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redux state selectors
    const cartItems = useSelector(selectCartItems);
    const productQuantity = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const userData = useSelector(selectUserData);
    const location = useSelector(selectCurrentDeliveryLocation);

    useEffect(() => {
        if (!userData) {
            navigate('/auth');
        }
    }, [userData, navigate]);

    const paymentMethods = [
        { id: 'COD', status: true, name: 'Cash on Delivery', icon: 'https://img.freepik.com/premium-vector/cash-delivery_569841-164.jpg' },
    ];

    const scrollToPaymentSection = () => {
        paymentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handlePlaceOrder = async () => {
        if (!selectedOption) {
            toast.error('Please select a payment method.');
            return;
        }

        // Update placeOrderPerams dynamically
        const updatedOrderDetails = {
            token: userData.data.auth_token,
            user: {
                success: true,
                data: userData.data,
                running_order: null,
                delivery_details: location,
            },
            order: cartItems,
            coupon: null,
            location: {
                lat: location.lat.toString(),
                lng: location.lng.toString(),
                address: location.address,
                house: "cs",
                tag: location.tag,
            },
            order_comment: null,
            total: {
                productQuantity: productQuantity,
                totalPrice: totalPrice,
            },
            method: selectedOption,
            payment_token: "",
            delivery_type: 1,
            partial_wallet: false,
            dis: 0,
        };

        // Place order API call
        try {
            const response = await axios.post('https://lewoffy.infineur.com/public/api/place-order', updatedOrderDetails);
            console.log('Order placed successfully:', response.data);
            toast.success('Order placed successfully!');
            dispatch(clearCart());
            setTimeout(() => {
                navigate('/account/orders');
            }, 4000);
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
        }
    };



    return (
        <div className="relative">
            <div className="sticky top-0 left-0 w-full z-10">
                <MapComponent position={position} setPosition={setPosition} defaultLocation={defaultLocation} />
            </div>
            <div ref={paymentSectionRef}>
                <section className="sticky -mt-5 pt-8 bg-black text-center p-3 rounded-t-xl text-white z-50">
                    <p className="text-sm text-white pb-2">Confirm your location for delivery</p>
                    <button
                        className="btn btn-warning w-[85%]"
                        onClick={scrollToPaymentSection}
                    >
                        Confirm Location
                    </button>

                    <h2 className="text-xl text-start font-semibold my-4">Payment</h2>
                    <div className="space-y-4">
                        {paymentMethods.map((method) => (
                            <div
                                key={method.id}
                                className={`flex items-center p-4 border rounded-xl ${method.status === false ?? 'disabled'}  cursor-pointer ${selectedOption === method.id ? 'border-warning' : 'border-gray-600'}`}
                                onClick={() => setSelectedOption(method.id)}
                            >
                                <img
                                    src={method.icon}
                                    alt={method.name}
                                    className="w-12 h-12 rounded-xl mr-4 bg-white p-1"
                                />
                                <span className="text-lg font-medium">{method.name}</span>
                                <input
                                    type="radio"
                                    name="payment"
                                    value={method.id}
                                    checked={selectedOption === method.id}
                                    onChange={() => {
                                        if (method.status === true) {
                                            setSelectedOption(method.id);
                                        }
                                    }}
                                    className="ml-auto radio radio-bordered-warning"
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        className="btn btn-warning w-full mt-5"
                        onClick={handlePlaceOrder}
                    >
                        Pay with{' '}
                        {selectedOption
                            ? paymentMethods.find((m) => m.id === selectedOption).name
                            : 'Selected Method'}
                    </button>
                </section>
            </div>
            <ToastContainer />
        </div>
    );
}

export default CheckOutPage;
