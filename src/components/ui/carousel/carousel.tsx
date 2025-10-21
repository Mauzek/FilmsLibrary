import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import type { CarouselProps } from "./types";
import styles from "./carousel.module.scss";
import "@styles/global.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Skeleton } from "../skeleton";

export const Carousel: React.FC<CarouselProps> = ({
  loop = true,
  autoplay = true,
  delay = 5000,
  effect = "fade",
  withPagination = true,
  spaceBetween = 0,
  slidesPerView = 1,
  speed = 1000,
  height = 500,
  loading = false,
  children,
}) => {
  if (loading) {
    return (
      <div className={styles.carousel} style={{ height: `${height}px` }}>
        <Skeleton width="100%" height="100%" borderRadius={16} />
      </div>
    );
  }

  const slides = React.Children.map(children, (child, index) => (
    <SwiperSlide key={index}>{child}</SwiperSlide>
  ));

  return (
    <div className={styles.carousel}>
      <Swiper
        className={styles.carousel__swiper}
        modules={[Pagination, EffectFade, Autoplay]}
        style={{ "--swiper-height": `${height}px` } as React.CSSProperties}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        speed={speed}
        loop={loop}
        effect={effect}
        fadeEffect={{ crossFade: true }}
        autoplay={
          autoplay
            ? {
                delay,
                disableOnInteraction: false,
              }
            : false
        }
        pagination={
          withPagination
            ? {
                clickable: true,
                el: `.custom-swiper-pagination`,
              }
            : undefined
        }
      >
        {slides}
      </Swiper>

      {withPagination && <div className="custom-swiper-pagination" />}
    </div>
  );
};