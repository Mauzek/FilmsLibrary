import { useState, useRef, useEffect } from "react";
import { Icon24Search, Icon24CancelOutline } from "@vkontakte/icons";
import { useSearchForm } from "@/hooks";
import styles from "./MobileSearchForm.module.scss";

export const MobileSearchForm = () => {
  const { query, handleSubmit, handleClear, handleQueryChange } = useSearchForm();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClose = () => {
    setIsExpanded(false);
    handleClear();
  };

  const onSubmit = (e: React.FormEvent) => {
    const success = handleSubmit(e);
    if (success) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();       
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  return (
    <>
      <div className={styles.searchFormMobile}>
        <button
          type="button"
          className={`${styles.searchFormMobile__trigger} ${
            isExpanded ? styles["searchFormMobile__trigger--active"] : ""
          }`}
          onClick={handleToggleExpand}
          aria-label="Поиск"
        >
          <Icon24Search />
        </button>

        <div
          className={`${styles.searchFormMobile__dropdown} ${
            isExpanded ? styles["searchFormMobile__dropdown--open"] : ""
          }`}
        >
          <form onSubmit={onSubmit} className={styles.searchFormMobile__form}>
            <div className={styles.searchFormMobile__inputWrapper}>
              <span className={styles.searchFormMobile__icon}>
                <Icon24Search />
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Поиск фильмов"
                inputMode="search"
                className={styles.searchFormMobile__input}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <button
                type="button"
                className={styles.searchFormMobile__close}
                onClick={handleClose}
              >
                <Icon24CancelOutline />
              </button>
            </div>
          </form>
        </div>
      </div>

      {isExpanded && (
        <div
          className={styles.searchFormMobile__overlay}
          onClick={handleClose}
        />
      )}
    </>
  );
};
