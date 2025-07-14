import styles from "./info.module.scss";
import type { InfoProps } from "./types";
import { Rating } from "../rating";
import { Meta } from "../meta";

export const Info = ({ movie }: InfoProps) => {
  const title = movie.name || movie.alternativeName || movie.enName;
  const movieLength = movie.movieLength ?? movie.seriesLength;
  return (
    <section className={styles.info}>
      <div className={styles.info__header}>
        <h1 className={styles.info__title}>{title}</h1>
        {movie.alternativeName && movie.name !== movie.alternativeName && (
          <h2 className={styles.info__alternativeTitle}>
            {movie.alternativeName}
          </h2>
        )}
        {movie.enName && movie.name !== movie.enName && (
          <h3 className={styles.info__enTitle}>{movie.enName}</h3>
        )}
      </div>

      <Rating
        rating={movie.rating}
        votes={movie.votes}
        externalId={{
          kpId: movie.id,
          imdbId: movie.externalId?.imdb,
        }}
      />

      <Meta
        year={movie.year}
        countries={movie.countries}
        genres={movie.genres}
        movieLength={movieLength}
        ageRating={movie.ageRating}
        type={movie.type}
      />

      {movie.shortDescription && !movie.description && (
        <div className={styles.info__shortDescription}>
          <p>{movie.shortDescription}</p>
        </div>
      )}

      {movie.description && (
        <div className={styles.info__description}>
          <h4>Описание</h4>
          <p>{movie.description}</p>
        </div>
      )}
    </section>
  );
};
