import styles from "./meta.module.scss";
import type { MetaProps } from "./types";

export const Meta = ({
  year,
  countries,
  genres,
  movieLength,
  ageRating,
  type,
}: MetaProps) => {
  const formatDuration = (minutes?: number) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours} ч ${mins} мин` : `${mins} мин`;
  };

  const formatType = (type: string) => {
    switch (type) {
      case "movie":
        return "фильм";
      case "tv-series":
        return "сериал";
      case "tv-show":
        return "сериал";
      case "animated-series":
        return "сериал";
      case "anime":
        return "аниме";
      case "cartoon":
        return "мультфильм";
    }
  };

  return (
    <div className={styles.meta}>
      {year && (
        <div className={styles.meta__item}>
          <span className={styles.meta__label}>Год:</span>
          <span>{year}</span>
        </div>
      )}

      {type && (
        <div className={styles.meta__item}>
          <span className={styles.meta__label}>Тип:</span>
          <span>{formatType(type)}</span>
        </div>
      )}

      {countries.length > 0 && (
        <div className={styles.meta__item}>
          <span className={styles.meta__label}>Страна:</span>
          <span>{countries.map((country) => country.name).join(", ")}</span>
        </div>
      )}

      {genres.length > 0 && (
        <div className={styles.meta__item}>
          <span className={styles.meta__label}>Жанр:</span>
          <span>{genres.map((genre) => genre.name).join(", ")}</span>
        </div>
      )}

      {movieLength && (
        <div className={styles.meta__item}>
          <span className={styles.meta__label}>Длительность:</span>
          <span>{formatDuration(movieLength)}</span>
        </div>
      )}

      {ageRating != null && ageRating >= 0 && (
        <div className={styles.meta__item}>
          <span className={styles.meta__label}>Возраст:</span>
          <span>{ageRating}+</span>
        </div>
      )}
    </div>
  );
};
