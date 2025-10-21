import { useState, useRef, useEffect } from "react";
import { Icon28SearchOutline, Icon24CancelOutline } from "@vkontakte/icons";
import { useSearchForm } from "@/hooks";
import styles from "./mobileSearchForm.module.scss";
import { createPortal } from "react-dom";

export const MobileSearchForm = () => {
  const { query, handleSubmit, handleQueryChange } = useSearchForm();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClose = () => {
    setIsExpanded(false);
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

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
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
          <Icon28SearchOutline />
        </button>

        <div
          className={`${styles.searchFormMobile__dropdown} ${
            isExpanded ? styles["searchFormMobile__dropdown--open"] : ""
          }`}
        >
          <form onSubmit={onSubmit} className={styles.searchFormMobile__form}>
            <div className={styles.searchFormMobile__inputWrapper}>
              <span className={styles.searchFormMobile__icon}>
                <Icon28SearchOutline />
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

      {isExpanded &&
        createPortal(
          <div
            className={styles.searchFormMobile__overlay}
            onClick={handleClose}
          />,
          document.body
        )}
    </>
  );
};
