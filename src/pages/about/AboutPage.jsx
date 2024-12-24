import React, { useEffect } from 'react'
import { selectUserData } from '../../store/appSlice'
import { useSelector } from 'react-redux'
import { ChevronLeft, LayoutList, MapPinHouse } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function AboutPage() {
    const userData = useSelector(selectUserData)
    const navigate = useNavigate()
    useEffect(() => {
        if (!userData) {
            navigate('/auth')
        }
    }, [])

    return (
        <div className='relative bg-white min-h-screen  text-black'>
            {/* Header */}
            <div className="flex items-center  justify-center h-14 w-full sticky top-0 bg-white/60 dark:bg-inherit backdrop-blur-md pt-3 z-50">
                <Link to="/">
                    <ChevronLeft className="absolute  left-3 top-6 w-6 h-6" />
                </Link>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-center text-xl font-semibold">
                        Account
                    </span>
                </div>
            </div>
            <div className='px-3 py-4'>
                {/* profile */}
                <div className="flex items-center flex-col justify-center gap-2 rounded-lg p-2">
                    <div className="avatar">
                        <img src="https://cdn-icons-png.flaticon.com/512/3870/3870822.png" alt="avatar" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-center text-xl font-semibold">
                            {userData?.data.name || 'User Name'}
                        </span>
                        <span className="text-center text-xs font-extralight">
                            {"+" + userData?.data.phone || ''}
                        </span>
                    </div>
                </div>
                {/* pages */}
                <div className="flex flex-col gap-2 mt-4">
                    <Link to='orders' className="flex items-center justify-start p-3 border border-warning rounded-lg hover:bg-yellow-100">
                        <LayoutList className="w-6 h-6 text-warning" />
                        <span className="ml-2">Orders</span>
                    </Link>
                    <Link to='address' className="flex items-center justify-start p-3 border border-warning rounded-lg hover:bg-yellow-100">
                        <MapPinHouse className="w-6 h-6 text-warning" />
                        <span className="ml-2">Address & Location</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
