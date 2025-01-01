import { MapPin, SearchIcon, Star, Timer, User2 } from 'lucide-react'
import { useSelector } from 'react-redux';
import { selectShopData } from '../../../store/appSlice';
import { useNavigate } from 'react-router-dom';


function BannerComponent() {
  const shopData = useSelector(selectShopData);
  const navigate = useNavigate();
  return (
    <div className="w-full mb-20 relative ">
      {/* top Icons */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => {
            console.log("Navigating to /orders...");
            navigate('/account');
          }}
          className="p-1 z-50 bg-white rounded-full shadow-md hover:bg-gray-100">
          <User2 className="w-7 h-7 p-1 text-gray-500" />
        </button>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <button className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100">
          <SearchIcon className="w-7 h-7 p-1 text-gray-500" />
        </button>
      </div>
      {/* Banner Image */}
      <div className=" relative">
        <img
          src="/baner.jpg"
          alt="Starbucks Coffee"
          className="w-full h-52 object-cover filter brightness-90"
        />
        {/* Content */}
        <div className='absolute -bottom-20 w-full'>
          <div className="py-2 px-4 w-[85%] mx-auto bg-white mb-3 rounded-lg shadow-md ">
            {/* Header */}
            <div className="flex items-center">
              <img
                src="/icon-512.png"
                // src={"https://lewoffy.infineur.com/" + shopData?.image}
                alt="Logo"
                className="w-16 h-15 rounded-full mr-3"
              />
              <div>
                <h3 className="text-lg text-gray-800  font-semibold">Lewoffy</h3>
                <p className="text-gray-500 text-sm">{shopData?.address}</p>
              </div>
            </div>

            {/* Ratings, Distance, and Delivery Time */}
            <div className="grid grid-cols-2 mt-3 text-sm">
              {/* Left Column */}
              <div className="flex flex-col text-green-500">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  <span>3.7 (1k+ Reviews)</span>
                </div>
                <span className="mt-2 text-gray-600 text-sm">4.0km Free Delivery</span>
              </div>

              {/* Right Column */}
              <div className="text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>20 km</span>
                </div>
                <div className="flex mt-2">
                  <Timer className="w-4 h-4 mr-1" />
                  <span>45 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerComponent
