import React from 'react';
import { Skeleton } from '../skeleton';
import styles from './movieCard.module.scss';

export const MovieCardSkeleton: React.FC = () => {
  return (
    <article className={`${styles.movieCard} ${styles['movieCard--skeleton']}`}>
      <div className={styles.movieCard__posterWrapper}>
        <Skeleton 
          width="100%" 
          height="100%" 
          borderRadius="inherit"
          className={styles.movieCard__posterSkeleton}
        />
      </div>
      
      <div className={styles.movieCard__info}>
        <div className={`${styles.movieCard__title} ${styles['movieCard__title--skeleton']}`} >
          <Skeleton width="90%" height="16px" />
          <Skeleton width="60%" height="16px" />
        </div>
        
        <div className={styles.movieCard__details}>
          <Skeleton width="40%" height="12px" />
        </div>
      </div>
    </article>
  );
};
