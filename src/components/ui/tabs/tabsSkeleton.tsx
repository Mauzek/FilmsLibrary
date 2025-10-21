import { Skeleton } from "../skeleton";
import styles from "./tabs.module.scss";

export const TabsSkeleton = ({ className }: { className?: string }) => {
  return (
    <nav className={`${styles.navigation} ${className}`}>
      <Skeleton width="120px" height="35px" borderRadius="8px" />
      <Skeleton width="120px" height="35px" borderRadius="8px" />
      <Skeleton width="120px" height="35px" borderRadius="8px" />
      <Skeleton width="120px" height="35px" borderRadius="8px" />
    </nav>
  );
};
