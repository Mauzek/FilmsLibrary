import { memo } from "react";
import type { CollectionsNavigationProps } from "./types";
import styles from "./collectionsNavigation.module.scss";

export const CollectionsNavigation = memo(
  ({ categories, activeCategory, onSelect }: CollectionsNavigationProps) => {
    return (
      <div className={styles.navigation}>
        <button
          data-value=""
          className={`${styles.navigation__button} ${
            !activeCategory ? styles["navigation__button--active"] : ""
          }`}
          onClick={onSelect}
        >
          Все
        </button>
        {categories.map((category) => (
          <button
            data-value={category}
            className={`${styles.navigation__button} ${
              activeCategory === category
                ? styles["navigation__button--active"]
                : ""
            }`}
            key={category}
            onClick={onSelect}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }
);
