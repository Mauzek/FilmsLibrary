import styles from './skeleton.module.scss';
import type { SkeletonProps } from './types';

export const Skeleton = ({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  className = ''
}: SkeletonProps ) => {
  const style = {
    width,
    height,
    borderRadius,
  };

  return (
    <div 
      className={`${styles.skeleton} ${className}`}
      style={style}
    />
  );
};
