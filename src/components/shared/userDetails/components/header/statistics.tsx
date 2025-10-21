import styles from "./header.module.scss";
import type { StatisticsProps } from "./types";

export const Statistics = ({ statistics }: StatisticsProps) => {
  return (
    <section className={styles.header__statistics}>
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
          <span
            className={`${styles.header__legendMarker} ${styles["header__legendMarker--favorite"]}`}
            style={{ width: `${statistics.favorites.percent}%` }}
          />
          <span
            className={`${styles.header__legendMarker} ${styles["header__legendMarker--planned"]}`}
            style={{ width: `${statistics.planned.percent}%` }}
          />
          <span
            className={`${styles.header__legendMarker} ${styles["header__legendMarker--dropped"]}`}
            style={{ width: `${statistics.dropped.percent}%` }}
          />
          <span
            className={`${styles.header__legendMarker} ${styles["header__legendMarker--watched"]}`}
            style={{ width: `${statistics.watched.percent}%` }}
          />
        </div>
      </div>
    </section>
  );
};
