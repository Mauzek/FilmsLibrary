import { Skeleton } from '@/components';
import styles from './poster.module.scss';

export const PosterSkeleton = () => {
  return (
    <div className={styles.posterWrapper}>
      <Skeleton
        width="100%"
        height="auto"
        borderRadius="16px"
        className={styles.posterWrapper__poster}
      />
    </div>
  );
};
