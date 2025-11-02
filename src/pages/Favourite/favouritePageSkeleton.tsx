import { Grid, MovieCardSkeleton, Skeleton } from '@/components';
import styles from './favouritePage.module.scss';

export const FavouritePageSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__header}>
        <Skeleton width={150} height={48} borderRadius={8} />
      </div>
      <Grid>
        {Array.from({ length: 15 }, (_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </Grid>
    </div>
  )
}
