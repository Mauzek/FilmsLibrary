import { Skeleton } from "@/components";
import styles from "./rating.module.scss";

export const RatingSkeleton = () => {
  return (
    <div className={`${styles.rating} ${styles["rating--mobile"]}`}>
      <div className={styles.rating__item}>
        <Skeleton width="80px" height="16px" />
        <Skeleton width="40px" height="20px" />
        <Skeleton width="60px" height="12px" />
      </div>
      <div className={styles.rating__item}>
        <Skeleton width="60px" height="16px" />
        <Skeleton width="40px" height="20px" />
        <Skeleton width="80px" height="12px" />
      </div>
    </div>
  );
};
