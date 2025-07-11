import { DesktopSearchForm } from "./desktop";
import { MobileSearchForm } from "./mobile";
import styles from "./SearchForm.module.scss";

export const SearchForm = () => {
  return (
    <div className={styles.searchFormContainer}>
      <div className={styles.searchFormContainer__desktop}>
        <DesktopSearchForm />
      </div>
      <div className={styles.searchFormContainer__mobile}>
        <MobileSearchForm />
      </div>
    </div>
  );
};
