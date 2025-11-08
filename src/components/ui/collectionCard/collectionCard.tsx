import type { Collection } from "@/types";
import { Link } from "react-router-dom";
import styles from "./collectionCard.module.scss";
import { memo } from "react";
import { useProgressiveLazyImage } from "@/hooks";

export const CollectionCard = memo(
  ({ category, name, slug, cover }: Collection) => {
    const { imgSrc, isLoaded, ref } = useProgressiveLazyImage(
      cover.previewUrl,
      cover.url
    );
    return (
      <Link
        to={`/collections/${slug}`}
        className={styles.card}
        data-category={category}
      >
        <div className={styles.card__imageWrapper}>
          <img
            ref={ref}
            src={imgSrc}
            alt={name}
            className={`${styles.card__image} ${
              isLoaded ? styles["card__image--loaded"] : ""
            }`}
            loading="lazy"
          />
        </div>
        <h3 className={styles.card__title}>{name}</h3>
      </Link>
    );
  }
);
