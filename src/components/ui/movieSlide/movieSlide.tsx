import styles from "./movieSlide.module.scss";
import { Link } from "react-router-dom";
import type { MovieSlideProps } from "./types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export const MovieSlide = ({ movie }: MovieSlideProps) => {
  const getRatingClass = (rating: number | undefined): string => {
    if (!rating || rating === 0) {
      return styles["movieSlide__rating--none"];
    }

    if (rating >= 7) return styles["movieSlide__rating--high"];
    if (rating >= 5) return styles["movieSlide__rating--medium"];
    if (rating >= 1) return styles["movieSlide__rating--low"];

    return styles["movieSlide__rating--none"];
  };

  const movieLength = `${Math.floor((movie.movieLength || 0) / 60)} ч. ${
    movie.movieLength ? movie.movieLength % 60 : 0
  } мин.`;

  return (
      <Link to={`movie/${movie.id}`}>
        <div
          className={styles.movieSlide}
          style={{
            backgroundImage: `url(${movie.backdrop?.url})`,
          }}
        >
          <div className={styles.movieSlide__overlay}>
            <div className={styles.movieSlide__content}>
              <h2 className={styles.movieSlide__title}>
                {movie.name || movie.alternativeName}
              </h2>

              {movie.shortDescription ? (
                <p className={styles.movieSlide__description}>
                  {movie.shortDescription}
                </p>
              ) : movie.description ? (
                <p className={styles.movieSlide__description}>
                  {movie.description}
                </p>
              ) : null}

              <div className={styles.movieSlide__meta}>
                {movie.rating?.kp ? (
                  <span
                    className={`${styles.movieSlide__rating} ${getRatingClass(
                      movie.rating?.kp
                    )}`}
                  >
                    {movie.rating.kp.toFixed(1)}
                  </span>
                ) : null}
                {movie.countries?.length ? (
                  <span>{movie.countries[0].name}</span>
                ) : null}
                {movie.movieLength ? <span>{movieLength}</span> : null}
                {movie.year ? <span>{movie.year}</span> : null}
              </div>
            </div>
          </div>
        </div>
      </Link>
  );
};
