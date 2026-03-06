import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function ImageCarousel() {
  const images = [
    "./IMG_0931.jpg",
    "./IMG_0943.jpg",
    "./IMG_0955.jpg",
    "./IMG_0971.jpg",
    "./IMG_0954.jpg",
  ];

  return (
    <div className="max-w-5xl mx-auto mb-12">
      <Swiper
      modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        loop={true}
         autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt="Hair product"
              className="
              w-half
              h-30
              sm:h-50
              md:h-70
              lg:h-80
              object-cover
              rounded-2xl
              shadow-lg
              "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}