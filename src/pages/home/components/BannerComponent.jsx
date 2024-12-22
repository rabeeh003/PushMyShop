import { LandPlotIcon, Locate, MapPin, Search, SearchIcon, Star, Timer } from 'lucide-react'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import InstallPWA from './InstallPWA';

function BannerComponent() {
  return (
    <div className="w-full mb-4 ">
      {/* Banner Image */}
      <div className="-z-30 relative">
        <img
          src="https://tb-static.uber.com/prod/image-proc/processed_images/5aeed5fbf2c1503442afc8912381ace2/7835428b286acb57646a256c897c0e9e.jpeg"
          alt="Starbucks Coffee"
          className="w-full h-52 object-cover filter brightness-90"
        />
        <InstallPWA />
        {/* search Icon */}
        <div className="absolute top-2 right-2">
          <button className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100">
            <SearchIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 w-[85%] mx-auto -mt-16 z-50 bg-white mb-3 rounded-lg shadow-md ">
        {/* Header */}
        <div className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png"
            alt="Logo"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="text-lg text-gray-800  font-semibold">Starbucks</h3>
            <p className="text-gray-500 text-sm">Coffee</p>
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
