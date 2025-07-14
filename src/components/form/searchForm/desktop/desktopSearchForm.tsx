import { useRef } from "react";
import { Icon24Search, Icon24CancelOutline } from "@vkontakte/icons";
import { useSearchForm } from "@/hooks";
import styles from "./desktopSearchForm.module.scss";

export const DesktopSearchForm = () => {
  const { query, handleSubmit, handleClear, handleQueryChange } =
    useSearchForm();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const onSubmit = (e: React.FormEvent) => {
     handleSubmit(e);
  };

  const onClear = (e: React.FormEvent) => {
    e.preventDefault();
    handleClear();
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={onSubmit} className={styles.searchForm}>
      <span className={styles.searchForm__icon}>
        <Icon24Search />
      </span>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        placeholder="Поиск фильмов"
        inputMode="search"
        className={styles.searchForm__input}
      />
      <button
        type="button"
        className={`${styles.searchForm__button} ${
          query && styles["searchForm__button--visible"]
        }`}
        onClick={onClear}
      >
        <Icon24CancelOutline />
      </button>
    </form>
  );
};
