import styles from "./meta.module.scss";
import { Skeleton } from "@/components";

export const MetaSkeleton = () => {
  return (
    <div className={styles.meta}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.meta__item}>
          <Skeleton
            width="120px"
            height="20px"
            className={styles.meta__label}
          />
          <Skeleton width="150px" height="16px" />
        </div>
      ))}
    </div>
  );
};
