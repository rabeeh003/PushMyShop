import { useEffect } from 'react'
import { selectUserData } from '../../store/appSlice'
import { useSelector } from 'react-redux'
import { ChevronLeft, ChevronRight, LayoutList, MapPinHouse } from 'lucide-react'
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
            <div className="flex items-center justify-center h-14 w-full bg-main-color text-white sticky top-0 pt-3 z-50">
                <Link to="/">
                    <ChevronLeft className="absolute left-3 top-6 w-6 h-6" />
                </Link>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-center text-xl font-semibold">
                        Account
                    </span>
                </div>
            </div>
            <div className=' py-4'>
                {/* profile */}
                <div className="flex items-center flex-col justify-center gap-2 rounded-lg">
                    <div className='h-32 w-full bg-main-color rounded-b-xl -m-16'></div>
                    <div className='flex items-center flex-col justify-center pt-6 gap-2'>
                        <div className="avatar bg-main-color avatar-xl avatar-ring ring-white ring-4">
                            <img src="/userIcon.png" alt="avatar" className="filter brightness-0 invert" />
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
                </div>
                {/* pages */}
                <div className="flex flex-col gap-2 px-4 mt-4">
                    <Link to='orders' className="flex items-center justify-between border border-gray-200 rounded-full hover:bg-main-color/15">
                        <div className='flex items-center justify-start'>
                            <LayoutList className="w-12 h-12 p-3 text-main-color border rounded-full" />
                            <span className="ml-2">Orders</span>
                        </div>
                        <ChevronRight className='me-3 p-1' />
                    </Link>
                    <Link to='address' className="flex items-center justify-between border border-gray-200 rounded-full hover:bg-main-color/15">
                        <div className='flex items-center justify-start'>
                            <MapPinHouse className="w-12 h-12 p-3 text-main-color border rounded-full" />
                            <span className="ml-2">Address & Location</span>
                        </div>
                        <ChevronRight className='me-3 p-1' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
