import { Skeleton } from "../skeleton";
import styles from "./collectionCard.module.scss";

export const CollectionCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__imageWrapper}>
        <Skeleton className={styles.card__image} height="100%"/>
      </div>
      <Skeleton className={styles.card__title} width={100}/>
    </div>
  );
};
