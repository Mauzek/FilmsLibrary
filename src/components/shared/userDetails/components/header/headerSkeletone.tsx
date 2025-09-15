import { Skeleton } from "@/components/ui";
import styles from "../../userDetails.module.scss";

export const HeaderSkeletone = () => {
  return (
    <div className={styles.userDetails__header}>
      <Skeleton width="150px" height="150px" borderRadius="50%" />

      <div className={styles.userDetails__info}>
        <h1 className={styles.userDetails__name}>
          <Skeleton width="170px" borderRadius="12px" />
        </h1>
        <span className={styles.userDetails__date}>
          <Skeleton width="140px" borderRadius="12px" />
        </span>

        <Skeleton width="200px" height="35px" borderRadius="12px" />
      </div>
    </div>
  );
};
