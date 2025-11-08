import { memo } from "react";
import styles from "./movieCard.module.scss";
import type { MovieCardProps } from "./types";
import { Link } from "react-router-dom";
import type { SavedMovie } from "@/types";
import { useProgressiveLazyImage } from "@/hooks";

export const MovieCard = memo(
  <T extends SavedMovie>({ movie }: MovieCardProps<T>) => {
    const movieData = {
      name: movie.name || movie.alternativeName || "Без названия",
      posterPreview: movie.poster?.previewUrl,
      posterFull: movie.poster?.url,
      rating: movie.rating?.kp || movie.rating?.imdb,
      year: movie.year,
      country: movie.countries?.[0]?.name,
      genre: movie.genres?.[0]?.name,
    };

    const { imgSrc, isLoaded, ref } = useProgressiveLazyImage(
      movieData.posterPreview,
      movieData.posterFull
    );
    const isImdbRating = movie.rating?.kp === 0 && Boolean(movie.rating?.imdb);

    const getRatingClass = (rating: number | undefined): string => {
      if (!rating || rating === 0) return styles["movieCard__rating--none"];
      if (rating >= 7) return styles["movieCard__rating--high"];
      if (rating >= 5) return styles["movieCard__rating--medium"];
      if (rating >= 1) return styles["movieCard__rating--low"];
      return styles["movieCard__rating--none"];
    };

    const formatRating = (rating: number | undefined): string => {
      if (!rating || rating === 0) return "–";
      return rating.toFixed(1);
    };
    console.log(movie.name);
    return (
      <article className={styles.movieCard}>
        <Link to={`/movie/${movie.id}`} className={styles.movieCard__link}>
          <div className={styles.movieCard__posterWrapper}>
            <img
              ref={ref}
              src={imgSrc}
              alt={movieData.name}
              className={`${styles.movieCard__poster} ${
                isLoaded ? styles["movieCard__poster--loaded"] : ""
              }`}
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
          <h4 className={styles.movieCard__title}>
            <Link to={`/movie/${movie.id}`}>{movieData.name}</Link>
          </h4>

          <div className={styles.movieCard__details}>
            {movieData.year && <span>{movieData.year}</span>}
            {movieData.genre && <span>{movieData.genre}</span>}
            {movieData.country && <span>{movieData.country}</span>}
          </div>
        </div>
      </article>
    );
  }
);

MovieCard.displayName = "MovieCard";
