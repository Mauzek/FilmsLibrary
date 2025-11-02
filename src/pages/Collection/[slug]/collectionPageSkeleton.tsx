import styles from "./collectionPage.module.scss";
import { Grid, MovieCardSkeleton, Skeleton } from "@/components";

export const CollectionPageSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__header}>
        <Skeleton width={450} height={48} borderRadius={8} />
      </div>
      <Grid>
        {Array.from({ length: 15 }, (_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </Grid>
    </div>
  );
};
