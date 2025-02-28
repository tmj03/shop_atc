import React, { useRef } from "react";
import Slider from "react-slick";

// Import CSS của slick-carousel và file CSS riêng
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // Đảm bảo đường dẫn đúng

const Carousel = () => {
  const sliderRef = useRef(null); // Khai báo ref để tham chiếu đến Slider

  const settings = {
    dots: true, // hiển thị dots dưới slide
    infinite: true, // tự động quay lại slide đầu khi hết
    speed: 500, // tốc độ chuyển slide (ms)
    slidesToShow: 1, // số slide hiển thị cùng lúc
    slidesToScroll: 1, // số slide chuyển khi nhấn
    autoplay: true, // tự động chuyển slide
    autoplaySpeed: 2000, // tốc độ tự động chuyển slide (ms)
  };

  // Hàm chuyển tới slide tiếp theo
  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  // Hàm quay lại slide trước
  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="carousel-container">
      <Slider {...settings} ref={sliderRef}>
        <div>
          <img src="/img/slide.jpg" alt="Slide 1" />
        </div>
        <div>
          <img src="/img/slide2.jpg" alt="Slide 2" />
        </div>
        <div>
          <img src="/img/slide.jpg" alt="Slide 3" />
        </div>
      </Slider>

      {/* Nút Next */}
      <button onClick={nextSlide} className="next-button">
        &gt;
      </button>

      {/* Nút Prev */}
      <button onClick={prevSlide} className="prev-button">
        &lt;
      </button>
    </div>
  );
};

export default Carousel;
