// QuotesCarousel.jsx
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { guidanceQuotes } from "../../utils/qoutes";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/QuotesCarousel.css";

const QuotesCarousel = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Handle pause and resume of autoplay on hover
  const handleMouseEnter = () => {
    if (swiperInstance) {
      swiperInstance.autoplay.stop(); // Stop autoplay on hover
    }
  };

  const handleMouseLeave = () => {
    if (swiperInstance) {
      swiperInstance.autoplay.start(); // Resume autoplay on mouse leave
    }
  };

  return (
    <div className="quotes-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        onSwiper={setSwiperInstance} // Capture swiper instance
      >
        {guidanceQuotes.map((quote, index) => (
          <SwiperSlide key={index}>
            <div
              className="quote-slide"
              onMouseEnter={handleMouseEnter} // Stop on hover
              onMouseLeave={handleMouseLeave} // Resume when mouse leaves
            >
              {quote}
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev">
          <FaArrowLeft />
        </div>
        <div className="swiper-button-next">
          <FaArrowRight />
        </div>
      </Swiper>
    </div>
  );
};

export default QuotesCarousel;
