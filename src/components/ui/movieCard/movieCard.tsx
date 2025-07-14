import { memo } from "react";
import styles from "./movieCard.module.scss";
import type { MovieCardProps, BaseMovieData } from "./types";
import { images } from "@/assets";
import { Link } from "react-router-dom";

export const MovieCard = memo(<T extends BaseMovieData>({ movie }: MovieCardProps<T>) => {
  const movieData = {
    name: movie.name || movie.alternativeName || "Без названия",
    poster: movie.poster?.previewUrl || movie.poster?.url,
    rating: movie.rating?.kp || movie.rating?.imdb,
    year: movie.year,
    country: movie.countries?.[0]?.name,
    genre: movie.genres?.[0]?.name,
  };
  const isImdbRating: boolean = movie.rating?.kp === 0 && Boolean(movie.rating?.imdb);

  const getRatingClass = (rating: number | undefined): string => {
    if (!rating || rating === 0) {
      return styles["movieCard__rating--none"];
    }

    if (rating >= 7) return styles["movieCard__rating--high"];
    if (rating >= 5) return styles["movieCard__rating--medium"];
    if (rating >= 1) return styles["movieCard__rating--low"];

    return styles["movieCard__rating--none"];
  };

  const formatRating = (rating: number | undefined): string => {
    if (!rating || rating === 0) return "–";
    return rating.toFixed(1);
  };

  return (
    <article className={styles.movieCard}>
      <Link to={`/movie/${movie.id}`} className={styles.movieCard__link}>
        <div className={styles.movieCard__posterWrapper}>
          <img
            className={styles.movieCard__poster}
            src={movieData.poster || images.noPoster}
            onError={(e) => {
              e.currentTarget.src = images.noPoster;
            }}
            alt={movieData.name}
            loading="lazy"
          />
          <span
            className={`${styles.movieCard__rating} ${getRatingClass(
              movieData.rating
            )}`}
          >
            {isImdbRating && "IMDb "}
            {formatRating(movieData.rating)}
          </span>
        </div>
      </Link>
      <div className={styles.movieCard__info}>
        <Link to={`/movie/${movie.id}`}>
          <h4 className={styles.movieCard__title}>{movieData.name}</h4>
        </Link>

        <div className={styles.movieCard__details}>
          {movieData.year && <span>{movieData.year}</span>}
          {movieData.genre && <span>{movieData.genre}</span>}
          {movieData.country && <span>{movieData.country}</span>}
        </div>
      </div>
    </article>
  );
});
