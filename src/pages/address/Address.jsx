import { ChevronLeft } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectLocations } from '../../store/appSlice'

function Address() {
    const address = useSelector(selectLocations)
    return (
        <div className='relative bg-white min-h-screen  text-black'>
            {/* Header */}
            <div className="flex items-center  justify-center h-14 w-full sticky top-0 bg-white/60 dark:bg-inherit backdrop-blur-md pt-3 z-50">
                <Link to="/account">
                    <ChevronLeft className="absolute  left-3 top-6 w-6 h-6" />
                </Link>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-center text-xl font-semibold">
                        Address
                    </span>
                </div>
            </div>
            {/* Address Section */}
            <div className='flex flex-col items-center justify-center mt-5 px-3'>
                <Link to="/account/add-address" className='btn btn-warning text-white text-sm w-full font-semibold py-2 px-4 rounded-md shadow'>
                    Add New Address
                </Link>
            </div>
            {/* Address List */}
            {address ? (
                <div className='flex flex-col items-center gap-3 mt-5 px-3'>
                {address?.map((address) => (
                    <div className='flex px-5 rounded-xl hover:bg-warning/20 border border-warning w-full p-2'>
                        <div>
                            {/* if need impliment a small map with lat and long */}
                        </div>
                        <div key={address.id} className='flex flex-col'>
                            <span className='font-semibold'>{address.tag}</span>
                            <span className='text-sm'>{address.address}</span>
                        </div>
                    </div>
                ))}
            </div>
            ):(
                <p className='text-gray-300 text-xs text-center mt-10'>No address</p>
            )}
        </div>
    )
}

export default Address
