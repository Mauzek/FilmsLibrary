import styles from "./section.module.scss";
import { FilterBar } from "@/components";
import type { SectionProps } from "./types";

export const Section = ({children, title, icon, isFiltered = false, className = '', headerClassName = ''}: SectionProps) => {
  return (
    <section className={`${styles.section} ${className}`}>
      <div className={`${styles.section__header} ${headerClassName}`}>
        <h1 className={styles.section__title}>
          {icon}
           <span className={styles.section__titleText}>{title}</span>
        </h1>
        {isFiltered && <FilterBar />}
      </div>
      {children}
    </section>
  );
};
