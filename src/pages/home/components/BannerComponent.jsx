import { LandPlotIcon, Locate, MapPin, Search, SearchIcon, Star, Timer, User2 } from 'lucide-react'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useSelector } from 'react-redux';
import { selectShopData } from '../../../store/appSlice';
import { Link, useNavigate } from 'react-router-dom';
import "swiper/css/navigation";
import "swiper/css/pagination";

function BannerComponent() {
  const shopData = useSelector(selectShopData);
  const navigate = useNavigate();
  return (
    <div className="w-full mb-4 relative ">
      {/* top Icons */}
      <div className="absolute top-4 left-4 ">
        <button
          onClick={() => {
            console.log("Navigating to /orders...");
            navigate('/orders');
          }}
          className="p-1 z-50 bg-white rounded-full shadow-md hover:bg-gray-100">
          <span className='tooltip tooltip-right tooltip-warning tooltip-open' data-tooltip='Orders'>
            <User2 className="w-7 h-7 p-1 text-gray-500" />
          </span>
        </button>
      </div>
      <div className="absolute top-4 right-4">
        <button className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100">
          <SearchIcon className="w-7 h-7 p-1 text-gray-500" />
        </button>
      </div>
      {/* Banner Image */}
      <div className="-z-30 relative">
        <img
          src="/baner.jpg"
          alt="Starbucks Coffee"
          className="w-full h-52 object-cover filter brightness-90"
        />

      </div>

      {/* Content */}
      <div className="py-2 px-4 w-[85%] mx-auto -mt-16 z-50 bg-white mb-3 rounded-lg shadow-md ">
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
              <span>1 km</span>
            </div>
            <div className="flex mt-2">
              <Timer className="w-4 h-4 mr-1" />
              <span>15 min</span>
            </div>
          </div>
        </div>

      </div>

      <section className="py-3 px-2 sm:px-0">
        <div className="custom-container  sm:px-2">
          <Swiper
            className="coupon"
            slidesPerView={2}
            spaceBetween={10}
            loop={true}
            grabCursor={true}
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <div className="relative flex items-center gap-1 sm:gap-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 sm:p-4 shadow-md">
                {/* Circular decorations */}
                <div className="absolute top-0 left-[10%] w-4 h-4 bg-backgroundPrimary rounded-full -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-[10%] w-4 h-4 bg-backgroundPrimary rounded-full translate-y-1/2"></div>

                {/* Icon */}
                <div className="offer-icon">
                  <img
                    className="w-10 h-10"
                    src="/cuopen.png"
                    alt="offer"
                  />
                </div>

                {/* Content */}
                <div className="offer-content">
                  <h5 className="text-gray-800 dark:text-gray-100 text-xs sm:text-sm font-semibold">
                    50% OFF upto & $25
                  </h5>
                  <p className="text-gray-500 dark:text-gray-400 text-[9px] sm:text-xs mt-1">
                    Use Code MEFRGD124
                  </p>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className="relative flex items-center gap-1 md:gap-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 md:p-4 shadow-md">
                {/* Circular decorations */}
                <div className="absolute top-0 left-[10%] w-4 h-4 bg-backgroundPrimary rounded-full -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-[10%] w-4 h-4 bg-backgroundPrimary rounded-full translate-y-1/2"></div>

                {/* Icon */}
                <div className="offer-icon">
                  <img
                    className="w-10 h-10"
                    src="/cuopen.png"
                    alt="offer"
                  />
                </div>

                {/* Content */}
                <div className="offer-content">
                  <h5 className="text-gray-800 dark:text-gray-100 text-xs md:text-sm font-semibold">
                    50% OFF upto & $25
                  </h5>
                  <p className="text-gray-500 dark:text-gray-400 text-[9px] md:text-xs mt-1">
                    Use Code MEFRGD124
                  </p>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <div className="relative flex items-center gap-1 md:gap-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 md:p-4 shadow-md">
                {/* Circular decorations */}
                <div className="absolute top-0 left-[10%] w-4 h-4 bg-backgroundPrimary rounded-full -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-[10%] w-4 h-4 bg-backgroundPrimary rounded-full translate-y-1/2"></div>

                {/* Icon */}
                <div className="offer-icon">
                  <img
                    className="w-10 h-10"
                    src="/cuopen.png"
                    alt="offer"
                  />
                </div>

                {/* Content */}
                <div className="offer-content">
                  <h5 className="text-gray-800 dark:text-gray-100 text-xs md:text-sm font-semibold">
                    50% OFF upto & $25
                  </h5>
                  <p className="text-gray-500 dark:text-gray-400 text-[9px] md:text-xs mt-1">
                    Use Code MEFRGD124
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

    </div>
  )
}

export default BannerComponent
