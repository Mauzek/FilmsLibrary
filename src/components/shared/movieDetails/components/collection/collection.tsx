import { CollectionItem } from "./collectionItem";
import styles from "./collection.module.scss";
import type { CollectionProps } from "./types";
import { useMemo } from "react";
import { Accordion } from "@/components/ui";

export const Collection = ({ collection, title ,defaultOpen = false }: CollectionProps) => {
  const sortedCollection = useMemo(() => {
    return collection.sort((a, b) => a.year - b.year);
    }, [collection]);

  return (
    <Accordion title={title} defaultOpen={defaultOpen}>
    <section className={styles.collection}>
      <div className={styles.collection__list}>
        {sortedCollection.map((movie) => (
          <CollectionItem key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
    </Accordion>
  );
};
