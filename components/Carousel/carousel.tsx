"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./carousel.module.scss";

interface CarouselImage {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: CarouselImage[];
}

export const Carousel = ({ images }: CarouselProps) => {
  return (
    <div className={styles.swiperWrapper}>
      <Swiper
        className={styles.swiper}
        modules={[Autoplay, Navigation]}
        grabCursor
        loop
        slidesPerView={1}
        spaceBetween={0}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {images.map((image) => (
          <SwiperSlide className={styles.swiperSlide} key={image.src}>
            <img src={image.src} alt={image.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
