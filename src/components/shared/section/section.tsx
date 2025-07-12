import styles from "./section.module.scss";
import { FilterBar } from "@/components";
import type { SectionProps } from "./types";

export const Section = ({children, title, icon, isFiltered = false}: SectionProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.section__header}>
        <h1 className={styles.section__title}>
          {icon} {title}
        </h1>
        {isFiltered && <FilterBar />}
      </div>
      {children}
    </section>
  );
};
