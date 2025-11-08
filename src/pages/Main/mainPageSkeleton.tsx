import { Grid, MovieCardSkeleton, Skeleton } from "@/components";
import styles from "./mainPage.module.scss";

export const MainPageSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__header}>
        <Skeleton width="100%" height="100%" borderRadius={0} />
      </div>
      <div>
        <div className={styles.skeleton__title}>
          <Skeleton height={48} width={250} borderRadius={8} />
        </div>
        <Grid>
          {Array.from({ length: 10 }, (_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </Grid>
      </div>
    </div>
  );
};
