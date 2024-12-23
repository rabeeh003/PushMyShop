import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/appSlice';
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import OrderAccordiant from './components/OrderAccordiant';
import axios from 'axios';

function OrdersPage() {
    const userData = useSelector(selectUserData);
    const navigate = useNavigate()

    const [orders, setOrders] = React.useState([]);
    
    useEffect(() => {
        if (!userData) {
             navigate('/auth')
        } else {
            axios.post("https://lewoffy.infineur.com/public/api/get-orders", {token: userData.data.auth_token, user_id: userData.data.id})
            .then((response) => {
                setOrders(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }, [userData]);

    return (
        <div className="relative min-h-screen bg-white text-black">
            {/* Header */}
            <div className="flex items-center justify-center h-14 w-full sticky top-0 bg-white/60 dark:bg-inherit backdrop-blur-md pt-3 z-50">
                <Link to="/">
                    <ChevronLeft className="absolute left-3 top-4 w-6 h-6" />
                </Link>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-center text-xl font-semibold">
                        {userData?.data.name || 'User Name'}
                    </span>
                    <span className="text-center text-xs font-extralight">
                        {"+"+userData?.data.phone || ''}
                    </span>
                </div>
            </div>

            {/* Orders */}
            <div className="accordion-group accordion-group-bordered bg-white border-gray-300 mt-5 mx-3">
                {orders.map((order) => (
                    <OrderAccordiant key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
}

export default OrdersPage;
