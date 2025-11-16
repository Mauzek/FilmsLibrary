import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { observer } from "mobx-react-lite";
import type { FilterProps } from "./types";
import { Icon16ChevronLeft } from "@vkontakte/icons";
import { RATING_RANGES, YEAR_RANGES } from "@/types/filters";
import styles from "./filter.module.scss";

export const Filter: React.FC<FilterProps> = observer((props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const rangeOptions = useMemo(() => {
    if (props.type === "range") {
      return props.title === "Рейтинг" ? RATING_RANGES : YEAR_RANGES;
    }
    return [];
  }, [props.type, props.title]);

  const filteredData = useMemo(() => {
    if (props.type !== "checkbox" || !searchTerm) return props.data;
    const term = searchTerm.toLowerCase();
    return props.data.filter((item) => item.name.toLowerCase().includes(term));
  }, [props.type, props.data, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && props.type === "checkbox" && props.data.length > 10) {
      searchInputRef.current?.focus();
    }
  }, [isOpen, props.type, props.data.length]);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen) setSearchTerm("");
  }, [isOpen]);

  const handleCheckboxChange = useCallback(
    (name: string) => {
      if (props.type !== "checkbox") return;
      const newFilters = props.selectedFilters.includes(name)
        ? props.selectedFilters.filter((f) => f !== name)
        : [...props.selectedFilters, name];
      props.onChange(newFilters);
    },
    [props]
  );

  const handleRangeChange = useCallback(
    (range: [number, number]) => {
      if (props.type !== "range") return;
      props.onChange(range);
      setIsOpen(false);
    },
    [props]
  );

  const getButtonText = useMemo(() => {
    if (props.type === "checkbox") {
      const { title, selectedFilters, data } = props;
      const count = selectedFilters.length;
      if (count === 0) return title;
      if (count === 1) {
        return data.find((f) => f.name === selectedFilters[0])?.name || title;
      }
      return `${title} (${count})`;
    }

    if (props.type === "range") {
      const { title, selectedRange, min, max } = props;
      const [minSelected, maxSelected] = selectedRange;
      const isDefault = minSelected === min && maxSelected === max;
      if (isDefault) return title;

      const selected = rangeOptions.find(
        (r) => r.value[0] === minSelected && r.value[1] === maxSelected
      );

      return selected && selected.label !== "Любой"
        ? `${title}: ${selected.label}`
        : `${title}: ${minSelected}–${maxSelected}`;
    }
  }, [props, rangeOptions]);

  const isActive = useMemo(() => {
    if (props.type === "checkbox") return props.selectedFilters.length > 0;
    if (props.type === "range")
      return (
        props.selectedRange[0] !== props.min ||
        props.selectedRange[1] !== props.max
      );
    return false;
  }, [props]);

  const hasSearch = props.type === "checkbox" && props.data.length > 10;

  return (
    <div className={styles.filter} ref={dropdownRef}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Фильтр ${props.title}`}
        className={`${styles.filter__trigger} ${
          isActive ? styles.filter__trigger_active : ""
        }`}
        onClick={toggleDropdown}
      >
        <span className={styles.filter__triggerText}>{getButtonText}</span>
        <Icon16ChevronLeft
          className={`${styles.filter__arrow} ${
            isOpen ? styles["filter__arrow--open"] : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className={styles.filter__dropdown} role="listbox">
          {hasSearch && (
            <div className={styles.filter__search}>
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Поиск ${props.title.toLowerCase()}...`}
                className={styles.filter__searchInput}
              />
            </div>
          )}

          <div className={styles.filter__list}>
            {props.type === "checkbox" ? (
              filteredData.length ? (
                filteredData.map((filter) => (
                  <label key={filter.slug} className={styles.filter__item}>
                    <input
                      type="checkbox"
                      checked={props.selectedFilters.includes(filter.name)}
                      onChange={() => handleCheckboxChange(filter.name)}
                      className={styles.filter__checkbox}
                    />
                    <span className={styles.filter__label}>{filter.name}</span>
                  </label>
                ))
              ) : (
                <div className={styles.filter__noResults}>
                  Ничего не найдено
                </div>
              )
            ) : (
              rangeOptions.map((option, i) => {
                const isSelected =
                  props.selectedRange[0] === option.value[0] &&
                  props.selectedRange[1] === option.value[1];
                return (
                  <label key={i} className={styles.filter__item}>
                    <input
                      type="radio"
                      name={`${props.title}-range`}
                      checked={isSelected}
                      onChange={() => handleRangeChange(option.value)}
                      className={styles.filter__radio}
                    />
                    <span className={styles.filter__label}>{option.label}</span>
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
});

Filter.displayName = "Filter";
