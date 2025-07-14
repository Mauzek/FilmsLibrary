import { InfoSkeleton, PosterSkeleton, RatingSkeleton } from "./components";
import styles from "./movieDetails.module.scss";

export const MovieDetailsSkeleton = () => {
  return (
    <div className={styles.movieDetails}>
      <div className={styles.movieDetails__content}>
        <div className={styles.movieDetails__header}>
          <div className={styles.movieDetails__leftColumn}>
            <PosterSkeleton />
            <RatingSkeleton />
          </div>
        <InfoSkeleton />
        </div>
      </div>
    </div>
  );
};
