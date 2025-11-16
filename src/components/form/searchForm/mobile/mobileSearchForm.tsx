import { useEffect, useRef } from "react";
import { Icon28SearchOutline, Icon24CancelOutline } from "@vkontakte/icons";
import { useSearchForm } from "@/hooks";
import styles from "./mobileSearchForm.module.scss";
import { createPortal } from "react-dom";
import { useSearchStore } from "@/store";
import { observer } from "mobx-react-lite";

export const MobileSearchForm = observer(() => {
  const { query, handleSubmit, handleQueryChange } = useSearchForm();
  const { isMobileOpen, close, toggle } = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    const success = handleSubmit(e);
    if (success) close();
  };

  useEffect(() => {
    if (isMobileOpen && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [isMobileOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <div className={styles.searchFormMobile}>
        <button
          type="button"
          className={`${styles.searchFormMobile__trigger} ${
            isMobileOpen ? styles["searchFormMobile__trigger--active"] : ""
          }`}
          onClick={toggle}
          aria-label="Поиск"
        >
          <Icon28SearchOutline />
        </button>

        {isMobileOpen && (
          <div
            className={`${styles.searchFormMobile__dropdown} ${
              styles["searchFormMobile__dropdown--open"]
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
                  spellCheck={false}
                />
                <button type="button" className={styles.searchFormMobile__close} onClick={close}>
                  <Icon24CancelOutline />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {isMobileOpen &&
        createPortal(
          <div className={styles.searchFormMobile__overlay} onClick={close} />,
          document.body
        )}
    </>
  );
});
