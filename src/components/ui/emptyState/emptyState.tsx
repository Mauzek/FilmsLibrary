import styles from "./emptyState.module.scss";
import type { EmptyStateProps } from "./types";

export const EmptyState = ({
  title,
  description,
  icon,
}: EmptyStateProps) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyState__icon}>{icon}</div>
      <h3 className={styles.emptyState__title}>{title}</h3>
      <p className={styles.emptyState__description}>{description}</p>
    </div>
  );
};
