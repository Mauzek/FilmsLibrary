export interface CarouselProps {
  loop?: boolean;
  autoplay?: boolean;
  delay?: number;
  effect?: "slide" | "fade";
  withPagination?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  speed?: number;
  height?: number;
  loading?: boolean;
  children: React.ReactNode;
}
