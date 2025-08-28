import type { Collection } from "@/types";
import { Link } from "react-router-dom";
import styles from "./collectionCard.module.scss";
import { memo } from "react";

export const CollectionCard = memo(({ category, name, slug, cover }: Collection) => {

  return (
    <Link
      to={`/collections/${slug}`}
      className={styles.card}
      data-category={category}
    >
      <div className={styles.card__imageWrapper}>
        <img
          src={cover.url}
          alt={name}
          className={styles.card__image}
          loading="lazy"
        />
      </div>
      <h3 className={styles.card__title}>{name}</h3>
    </Link>
  );
});
