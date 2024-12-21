import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';

function LocationPage() {
    const [selectedOption, setSelectedOption] = useState('');
    const [availableMethods, setAvailableMethods] = useState([]);

    const paymentMethods = [
        { id: 'paypal', name: 'Pay Pal', icon: 'https://static.vecteezy.com/system/resources/previews/044/625/954/non_2x/paypal-logotype-on-white-background-paypal-logo-debit-electronic-payment-system-financial-management-electronic-wallet-nfc-banking-app-bank-application-editorial-free-vector.jpg' },
        { id: 'applepay', name: 'Apple Pay', icon: 'https://i.pinimg.com/736x/60/6b/c0/606bc0717982547e555a514b479365a0.jpg' },
        { id: 'googlepay', name: 'Google Pay', icon: 'https://i.pinimg.com/originals/60/5a/bd/605abdb7af3405c6b20a426b1e128322.png' },
        { id: 'phonepay', name: 'Phone Pay', icon: 'https://static.vecteezy.com/system/resources/previews/049/116/753/non_2x/phonepe-app-icon-transparent-background-free-png.png' },
        { id: 'cod', name: 'Cash on Delivery', icon: 'https://img.freepik.com/premium-vector/cash-delivery_569841-164.jpg' },
    ];

    useEffect(() => {
        // Detect payment methods available on the device
        detectPaymentMethods();
    }, []);

    const detectPaymentMethods = async () => {
        if (window.PaymentRequest) {
            const supportedMethods = [
                { supportedMethods: 'https://google.com/pay' },
                { supportedMethods: 'basic-card', data: { supportedNetworks: ['visa', 'mastercard'] } },
            ];

            const details = {
                total: { label: 'Total', amount: { currency: 'USD', value: '10.00' } },
            };

            const request = new PaymentRequest(supportedMethods, details);

            const canMakePayment = await request.canMakePayment();
            if (canMakePayment) {
                setAvailableMethods(supportedMethods.map((m) => m.supportedMethods));
            } else {
                console.log('No payment methods available.');
            }
        } else {
            alert('Payment Request API not supported.');
        }
    };

    const redirectToApp = (appName) => {
        const deepLinks = {
            googlepay: 'https://pay.google.com/gp/w/u/0/home',
            phonepay: 'https://phonepe.com/app',
            paypal: 'https://www.paypal.com/myaccount/transfer/homepage',
        };

        if (deepLinks[appName]) {
            window.location.href = deepLinks[appName];
        } else {
            alert('App not supported');
        }
    };

    return (
        <div className='relative'>
            <div className='sticky top-0 left-0 w-full z-10'>
                <MapComponent />
            </div>
            <section className="sticky mt-5 bg-black text-center p-3 rounded-xl text-white z-50  min-h-svh">
                <p className='text-sm text-white pb-2'>Select your location for delivery</p>
                <button className='btn btn-warning w-[85%]'>Select Location</button>
                <div className='flex flex-col gap-2 mt-3'>
                    <span className='text-md text-start pb-1 pt-3 '>Place and Address</span>
                    <textarea className="textarea min-w-full" placeholder="Enter your place and address for delivery" />
                </div>

                {/* Payment Methods */}
                <div className="mt-5">
                    <h2 className="text-xl text-start font-semibold my-4">Payment</h2>
                    <div className="space-y-4">
                        {paymentMethods.map((method) => (
                            <div
                                key={method.id}
                                className={`flex items-center p-4 border rounded-xl cursor-pointer ${selectedOption === method.id ? 'border-warning' : 'border-gray-600'}`}
                                onClick={() => setSelectedOption(method.id)}
                            >
                                <img src={method.icon} alt={method.name} className="w-12 h-12 rounded-xl mr-4 bg-white p-1 " />
                                <span className="text-lg font-medium">{method.name}</span>
                                <input
                                    type="radio"
                                    name="payment"
                                    value={method.id}
                                    checked={selectedOption === method.id}
                                    onChange={() => setSelectedOption(method.id)}
                                    className="ml-auto radio radio-bordered-warning"
                                />
                            </div>
                        ))}
                    </div>
                    <button 
                        className='btn btn-warning w-full mt-5'
                        onClick={() => redirectToApp(selectedOption)}
                    >
                        Pay with {selectedOption ? paymentMethods.find(m => m.id === selectedOption).name : 'Selected Method'}
                    </button>
                </div>
            </section>
        </div>
    );
}

export default LocationPage;
