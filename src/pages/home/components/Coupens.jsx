import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Coupens() {
  return (
    <section className="py-3 px-2 sm:px-0 ">
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
              <div className="relative flex items-center gap-1 sm:gap-4 bg-gray-100 rounded-lg p-2 sm:p-4 shadow-md">
                {/* Circular decorations */}
                <div className="absolute top-0 left-[10%] w-4 h-4 bg-white  rounded-full -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-[10%] w-4 h-4 bg-white rounded-full translate-y-1/2"></div>

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
                  <h5 className="text-gray-800 text-xs sm:text-sm font-semibold">
                    50% OFF upto & $25
                  </h5>
                  <p className="text-gray-500 text-[9px] sm:text-xs mt-1">
                    Use Code MEFRGD124
                  </p>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className="relative flex items-center gap-1 md:gap-4 bg-gray-100 rounded-lg p-2 md:p-4 shadow-md">
                {/* Circular decorations */}
                <div className="absolute top-0 left-[10%] w-4 h-4 bg-white rounded-full -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-[10%] w-4 h-4 bg-white rounded-full translate-y-1/2"></div>

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
                  <h5 className="text-gray-800 text-xs md:text-sm font-semibold">
                    50% OFF upto & $25
                  </h5>
                  <p className="text-gray-500 text-[9px] md:text-xs mt-1">
                    Use Code MEFRGD124
                  </p>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <div className="relative flex items-center gap-1 md:gap-4 bg-gray-100 rounded-lg p-2 md:p-4 shadow-md">
                {/* Circular decorations */}
                <div className="absolute top-0 left-[10%] w-4 h-4 bg-white rounded-full -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-[10%] w-4 h-4 bg-white rounded-full translate-y-1/2"></div>

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
                  <h5 className="text-gray-800 text-xs md:text-sm font-semibold">
                    50% OFF upto & $25
                  </h5>
                  <p className="text-gray-500 text-[9px] md:text-xs mt-1">
                    Use Code MEFRGD124
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
  )
}

export default Coupens
