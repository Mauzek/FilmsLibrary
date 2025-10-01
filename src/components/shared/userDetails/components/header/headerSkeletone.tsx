import { Skeleton } from "@/components/ui";
import styles from "./header.module.scss";

export const HeaderSkeletone = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__main}>
        <div className={styles.header__profile}>
          <div className={styles.header__avatar}>
            <Skeleton width="120px" height="120px" borderRadius="50%" />
          </div>
          <div className={styles.header__info}>
            <h1 className={styles.header__name}>
              <Skeleton width="200px" height="35px" borderRadius="12px" />
            </h1>
            <span className={styles.header__date}>
              <Skeleton width="140px" borderRadius="12px" />
            </span>
          </div>
        </div>
        <div className={styles.header__summary}>
          <div className={styles.header__summaryList}>
            <div className={styles.header__summaryItem}>
              <span className={styles.header__summaryValue}>
                <Skeleton width="40px" height="50px" borderRadius="12px" />
              </span>
              <span className={styles.header__summaryLabel}>Избранное</span>
            </div>
            <div className={styles.header__summaryItem}>
              <span className={styles.header__summaryValue}>
                <Skeleton width="40px" height="50px" borderRadius="12px" />
              </span>
              <span className={styles.header__summaryLabel}>В планах</span>
            </div>
            <div className={styles.header__summaryItem}>
              <span className={styles.header__summaryValue}>
                <Skeleton width="40px" height="50px" borderRadius="12px" />
              </span>
              <span className={styles.header__summaryLabel}>Брошено</span>
            </div>
            <div className={styles.header__summaryItem}>
              <span className={styles.header__summaryValue}>
                <Skeleton width="40px" height="50px" borderRadius="12px" />
              </span>
              <span className={styles.header__summaryLabel}>Просмотрено</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header__statistics}>
        <h4 className={styles.header__legendsTitle}>Статистика</h4>
        <div className={styles.header__legends}>
          <div className={styles.header__legendList}>
            <div className={styles.header__legendItem}>
              <span
                className={`${styles.header__legendMarker} ${styles["header__legendMarker--favorite"]}`}
              />
              <span className={styles.header__legendLabel}>Избранное</span>
            </div>
            <div className={styles.header__legendItem}>
              <span
                className={`${styles.header__legendMarker} ${styles["header__legendMarker--planned"]}`}
              />
              <span className={styles.header__legendLabel}>В планах</span>
            </div>
            <div className={styles.header__legendItem}>
              <span
                className={`${styles.header__legendMarker} ${styles["header__legendMarker--dropped"]}`}
              />
              <span className={styles.header__legendLabel}>Брошено</span>
            </div>
            <div className={styles.header__legendItem}>
              <span
                className={`${styles.header__legendMarker} ${styles["header__legendMarker--watched"]}`}
              />
              <span className={styles.header__legendLabel}>Просмотрено</span>
            </div>
          </div>
          <div className={styles.header__statisticsChart}>
            <Skeleton width="100%" borderRadius="12px" />
            <Skeleton width="70%" borderRadius="12px" />
            <Skeleton width="50%" borderRadius="12px" />
            <Skeleton width="90%" borderRadius="12px" />
          </div>
        </div>
      </div>
    </div>
  );
};
