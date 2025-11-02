import styles from "./CollectionsPage.module.scss";
import { CollectionCardSkeleton, Grid, Skeleton } from "@/components";

export const CollectionsPageSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__header}>
        <Skeleton width={250} height={48} borderRadius={8} />
      </div>
      <div className={styles.skeleton__tabs}>
        <Skeleton width={100} height={40} borderRadius={8} className={styles.skeleton__tab}/>
        <Skeleton width={100} height={40} borderRadius={8} className={styles.skeleton__tab}/>
        <Skeleton width={100} height={40} borderRadius={8} className={styles.skeleton__tab}/>
        <Skeleton width={100} height={40} borderRadius={8} className={styles.skeleton__tab}/>
        <Skeleton width={100} height={40} borderRadius={8} className={styles.skeleton__tab}/>
        <Skeleton width={100} height={40} borderRadius={8} className={styles.skeleton__tab}/>
        <Skeleton width={100} height={40} borderRadius={8} className={styles.skeleton__tab}/>
      </div>
      <Grid>
        {Array.from({ length: 15 }, (_, index) => (
          <CollectionCardSkeleton key={index}/>
        ))}
      </Grid>
    </div>
  );
};
