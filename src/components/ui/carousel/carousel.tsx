import React, { Suspense, useEffect, useState } from "react";
import { Skeleton } from "../skeleton";
import type { CarouselProps } from "./types";
import styles from "./carousel.module.scss";

// Типы для динамически импортируемых модулей
type SwiperModuleType = typeof import("swiper/modules");
type SwiperReactType = typeof import("swiper/react");

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
  const [swiperReact, setSwiperReact] = useState<SwiperReactType | null>(null);
  const [swiperModules, setSwiperModules] = useState<SwiperModuleType | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSwiper = async () => {
      const [reactModule, moduleModule] = await Promise.all([
        import("swiper/react"),
        import("swiper/modules"),
      ]);

      await Promise.all([
        import("swiper/css"),
        import("swiper/css/pagination"),
        import("swiper/css/effect-fade"),
      ]);

      if (isMounted) {
        setSwiperReact(reactModule);
        setSwiperModules(moduleModule);
      }
    };

    loadSwiper();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || !swiperReact || !swiperModules) {
    return (
      <div className={styles.carousel} style={{ height: `${height}px` }}>
        <Skeleton width="100%" height="100%" borderRadius={16} />
      </div>
    );
  }

  const { Swiper, SwiperSlide } = swiperReact;
  const { Pagination, EffectFade, Autoplay } = swiperModules;

  const slides = React.Children.map(children, (child, index) => (
    <SwiperSlide key={index}>{child}</SwiperSlide>
  ));

  return (
    <div className={styles.carousel}>
      <Suspense fallback={<Skeleton width="100%" height="100%" borderRadius={16} />}>
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
              ? { delay, disableOnInteraction: false }
              : false
          }
          pagination={
            withPagination
              ? { clickable: true, el: `.custom-swiper-pagination` }
              : undefined
          }
        >
          {slides}
        </Swiper>
      </Suspense>
      {withPagination && <div className="custom-swiper-pagination" />}
    </div>
  );
};
