import type { CollectionItemProps } from "./types";
import { images } from "@/assets";
import styles from "./collection.module.scss";
import { Link, useParams } from "react-router-dom";
import { Icon24Chevron } from "@vkontakte/icons";
import { memo } from "react";

export const CollectionItem = memo(({ movie }: CollectionItemProps) => {
  const { id } = useParams<{ id: string }>();

  const movieData = {
    id: movie.id,
    name: movie.name || movie.alternativeName || "Без названия",
    alternativeName: movie.alternativeName,
    poster: movie.poster?.previewUrl || movie.poster?.url,
    rating: movie.rating?.kp || movie.rating?.imdb,
    year: movie.year,
  };

  const formatRating = (rating: number | undefined): string => {
    if (!rating || rating === 0) return "–";
    return rating.toFixed(1);
  };

  const movieContent = (
    <>
      <img
        className={styles.collection__item__poster}
        src={movieData.poster || images.noPoster}
        alt={movieData.name}
        loading="lazy"
      />
      <div className={styles.collection__item__details}>
        <h3 className={styles.collection__item__title}>
          {movieData.name}{" "}
          {movieData.id.toString() === id && (
            <span className={styles.collection__item__location}>
              {" "}
              Вы сейчас здесь
            </span>
          )}
        </h3>
        {movie.name && movieData.alternativeName && (
          <h4 className={styles.collection__item__alternativeTitle}>
            {movieData.alternativeName}
          </h4>
        )}
        <p className={styles.collection__item__rating}>
          Рейтинг: {formatRating(movieData.rating)} | {movie.year}
        </p>
      </div>
    </>
  );

  return (
    <article className={styles.collection__item}>
      {movie.id.toString() !== id ? (
        <Link to={`/movie/${movie.id}`} className={styles.collection__item__link}>
          {movieContent}
        </Link>
      ) : (
        <div className={styles.collection__item__link}>{movieContent}</div>
      )}
      <Icon24Chevron/>
    </article>
  );
});
