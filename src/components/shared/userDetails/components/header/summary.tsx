import styles from "./header.module.scss";
import type { SummaryProps } from "./types";

export const Summary = ({ headerColor, statistics }: SummaryProps) => {
  return (
    <div
      className={styles.header__summary}
      style={{
        background: headerColor
          ? `
        linear-gradient(to bottom, ${headerColor} 0%, #191919aa 10%, #191919dd 20%, #191919ff 70%, #191919 100%),
        linear-gradient(90deg, ${headerColor}, color-mix(in srgb, ${headerColor}, black 00%))
      `
          : "#191919cc",
      }}
    >
      <div className={styles.header__summaryList}>
        <div className={styles.header__summaryItem}>
          <span className={styles.header__summaryValue}>
            {statistics.favorites.count}
          </span>
          <span className={styles.header__summaryLabel}>Избранное</span>
        </div>
        <div className={styles.header__summaryItem}>
          <span className={styles.header__summaryValue}>
            {statistics.planned.count}
          </span>
          <span className={styles.header__summaryLabel}>В планах</span>
        </div>
        <div className={styles.header__summaryItem}>
          <span className={styles.header__summaryValue}>
            {statistics.dropped.count}
          </span>
          <span className={styles.header__summaryLabel}>Брошено</span>
        </div>
        <div className={styles.header__summaryItem}>
          <span className={styles.header__summaryValue}>
            {statistics.watched.count}
          </span>
          <span className={styles.header__summaryLabel}>Просмотрено</span>
        </div>
      </div>
    </div>
  );
};
