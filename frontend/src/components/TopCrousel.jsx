import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";

export default function TopCrousel() {
  return (
    <div className="bg-primary font-playfair text-background text-sm py-2 overflow-hidden">
      <Swiper
        modules={[Autoplay, FreeMode]}
        loop={true}
        freeMode={true}
        speed={10000}                 // 🔥 smooth speed
        autoplay={{
          delay: 0,                 // 🔥 no stop between slides
          disableOnInteraction: false,
        }}
        
        spaceBetween={0}
        allowTouchMove={false}      // optional: no swipe
      >
        <SwiperSlide className="w-auto text-center whitespace-nowrap">
          Fresh Cakes Daily 🍰
        </SwiperSlide>

        <SwiperSlide className="w-auto text-center whitespace-nowrap">
          Order • Bake • Enjoy
        </SwiperSlide>

        <SwiperSlide className="w-auto text-center whitespace-nowrap">
          Sweet Moments Delivered
        </SwiperSlide>

        <SwiperSlide className="w-auto text-center whitespace-nowrap">
          Fresh Cakes Daily 🍰
        </SwiperSlide>

        <SwiperSlide className="w-auto text-center whitespace-nowrap">
          Order • Bake • Enjoy
        </SwiperSlide>

        <SwiperSlide className="w-auto text-center whitespace-nowrap">
          Sweet Moments Delivered
        </SwiperSlide>

        <SwiperSlide className="w-auto text-center whitespace-nowrap">
          Fresh Cakes Daily 🍰
        </SwiperSlide>

        <SwiperSlide className="w-auto text-center whitespace-nowrap">
          Order • Bake • Enjoy
        </SwiperSlide>

        <SwiperSlide className="w-auto text-center whitespace-nowrap">
          Sweet Moments Delivered
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
