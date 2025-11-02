import { Skeleton } from "@/components";
import styles from "./authPage.module.scss";

export const AuthPageSkeleton = () => {
  return (
    <div className={styles.page}>

        <Skeleton width="100%" height="100%" borderRadius={12} className={styles.page__skeleton}/>

    </div>
  );
};
