import { MetaSkeleton } from "../meta";
import { RatingSkeleton } from "../rating";
import styles from "./info.module.scss";
import { Skeleton } from "@/components";

export const InfoSkeleton = () => {
  return (
    <div className={styles.info}>
      <div className={styles.info__header}>
        <Skeleton width="60%" height="48px" className={styles.info__title} />
        <Skeleton
          width="40%"
          height="28px"
          className={styles.info__alternativeTitle}
        />
        <Skeleton width="35%" height="20px" className={styles.info__enTitle} />
      </div>

      <RatingSkeleton />

      <MetaSkeleton />

      <div className={styles.info__description}>
        <Skeleton width="120px" height="32px" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "12px",
          }}
        >
          <Skeleton width="100%" height="16px" />
          <Skeleton width="95%" height="16px" />
          <Skeleton width="90%" height="16px" />
          <Skeleton width="85%" height="16px" />
        </div>
      </div>
    </div>
  );
};
