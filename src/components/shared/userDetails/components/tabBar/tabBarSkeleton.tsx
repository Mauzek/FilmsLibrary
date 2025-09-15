import { Skeleton } from "@/components/ui";
import styles from "../../userDetails.module.scss";

export const TabBarSkeleton = () => {
  return (
    <div className={styles.userDetails__tabBar}>
      <Skeleton width="120px" height="35px" borderRadius="8px" />
      <Skeleton width="120px" height="35px" borderRadius="8px" />
      <Skeleton width="120px" height="35px" borderRadius="8px" />
      <Skeleton width="120px" height="35px" borderRadius="8px" />
    </div>
  );
};
