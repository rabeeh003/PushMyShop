import React from 'react';

function OrderAccordiant({ order }) {
    return (
        <div className="accordion" tabIndex="0">
            <label className="accordion-title bg-white border-gray-200">
                <span className='flex text-sm'><span className="font-light">Order ID:</span> {order.id}</span>
                <span className='flex text-xs font-thin'><span className="font-light">Date:</span> {order.created_at}</span>
            </label>
            <div className="accordion-content">
                <div className="min-h-0 min-w-full p-0 mx-auto">
                    {/* Order Status Section */}
                    <div className="mb-6 min-w-full">
                        {order.orderstatus_id == 2 ? (
                            <div className="flex items-center mb-4">
                                <span className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center text-white">
                                    <span className="w-3 h-3 rounded-full bg-white"></span>
                                </span>
                                <span className="ml-3 text-gray-800 text-sm font-medium">
                                    Delivered
                                </span>
                            </div>
                        ) : order.orderstatus_id == 1 ? (
                            <div className="flex items-center mb-4">
                                <span className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-white">
                                    <span className="w-3 h-3 rounded-full bg-white"></span>
                                </span>
                                <span className="ml-3 text-gray-800 text-sm font-medium">
                                    Pending
                                </span>
                            </div>
                        ) : null}
                    </div>

                    {/* items list section */}
                    <div className="bg-gray-50 p-4 min-w-full rounded-lg shadow-md mb-6">
                        <h3 className="text-sm text-gray-800 font-medium mb-4">Items</h3>
                        <div className="space-y-4">
                            {order.orderitems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        {/* Product Image */}
                                        {/* <img
                                            src={`https://via.placeholder.com/40?text=Image`} // Placeholder image, replace with actual image link if available
                                            alt={item.name}
                                            className="w-10 h-10 object-cover rounded-md"
                                        /> */}
                                        <div className="ml-4">
                                            <span className="block text-sm font-medium">{item.name}</span>
                                            <span className="block text-xs text-gray-500">x{item.quantity}</span>
                                        </div>
                                    </div>
                                    <span className="font-medium text-sm text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="bg-gray-50 p-4 rounded-lg min-w-full shadow-md">
                        <div className="space-y-3">
                            {/* Sub Total */}
                            <div className="flex justify-between text-sm text-gray-800">
                                <span>Sub Total</span>
                                <span className="font-medium">${(order.total - order.delivery_charge).toFixed(2)}</span>
                            </div>

                            {/* Delivery Charge */}
                            <div className="flex justify-between text-sm text-gray-800">
                                <span>Delivery Charge</span>
                                <span className="font-medium text-green-500">{order.delivery_charge}</span>
                            </div>
                        </div>

                        {/* Grand Total */}
                        <div className="mt-4 border-t border-dashed pt-2 flex justify-between text-gray-800 text-sm font-bold">
                            <span>Grand Total</span>
                            <span className="text-orange-500">${order.total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderAccordiant;
