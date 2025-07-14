import styles from "./rating.module.scss";
import type { RatingProps } from "./types";

export const Rating = ({
  rating,
  votes,
  className,
  externalId,
}: RatingProps) => {
  const ratings = [
    {
      label: "КиноПоиск",
      value: rating.kp,
      votes: votes.kp,
      link: `https://www.kinopoisk.ru/film/${externalId?.kpId}`,
    },
    {
      label: "IMDb",
      value: rating.imdb,
      votes: votes.imdb,
      link: `https://www.imdb.com/title/${externalId?.imdbId}`,
    },
  ].filter((item) => item.value);

  if (ratings.length === 0) return null;

  return (
    <div className={`${styles.rating} ${styles[className || ""]}`}>
      {ratings.map((item) => (
        <a target="_blank" href={item.link} key={item.votes}>
          <div className={styles.rating__item}>
            <span className={styles.rating__label}>{item.label}:</span>
            <span className={styles.rating__value}>{item.value?.toFixed(1)}</span>
            {item.votes && (
              <span className={styles.rating__votes}>
                ({item.votes.toLocaleString()})
              </span>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};
