import React, { useState, useRef, useEffect, useMemo } from "react";
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
    if (props.title === "Рейтинг") return RATING_RANGES;
    if (props.title === "Год") return YEAR_RANGES;
    return [];
  }, [props.title]);

  const filteredData = useMemo(() => {
    if (props.type !== "checkbox" || !searchTerm) return props.data;

    return props.data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [props.data, props.type, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (
      isOpen &&
      props.type === "checkbox" &&
      props.data.length > 10 &&
      searchInputRef.current
    ) {
      searchInputRef.current.focus();
    }
  }, [isOpen, props.type, props.data.length]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  const handleFilterToggle = (filterName: string) => {
    if (props.type !== "checkbox") return;

    const newFilter = props.selectedFilters.includes(filterName)
      ? props.selectedFilters.filter((name) => name !== filterName)
      : [...props.selectedFilters, filterName];

    props.onChange(newFilter);
  };

  const handleRangeSelect = (range: [number, number]) => {
    if (props.type !== "range") return;
    props.onChange(range);
    setIsOpen(false);
  };

  const getButtonText = () => {
    if (props.type === "checkbox") {
      const count = props.selectedFilters.length;
      if (count === 0) return props.title;
      if (count === 1) {
        const selectedFilter = props.data.find(
          (f) => f.name === props.selectedFilters[0]
        );
        return selectedFilter ? selectedFilter.name : props.title;
      }
      return `${props.title} (${count})`;
    }

    if (props.type === "range") {
      const [min, max] = props.selectedRange;
      const isDefault = min === props.min && max === props.max;
      if (isDefault) return props.title;

      const selectedRange = rangeOptions.find(
        (option) => option.value[0] === min && option.value[1] === max
      );

      if (selectedRange && selectedRange.label !== "Любой") {
        return `${props.title}: ${selectedRange.label}`;
      }

      return `${props.title}: ${min}–${max}`;
    }
  };

  const isActive = () => {
    if (props.type === "checkbox") {
      return props.selectedFilters.length > 0;
    }

    if (props.type === "range") {
      return (
        props.selectedRange[0] !== props.min ||
        props.selectedRange[1] !== props.max
      );
    }

    return false;
  };

  const hasSearch = props.type === "checkbox" && props.data.length > 10;

  return (
    <div className={styles.filter} ref={dropdownRef}>
      <button
        className={`${styles.filter__trigger} ${
          isActive() ? styles.filter__trigger_active : ""
        }`}
        onClick={handleToggle}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Фильтр ${props.title}`}
      >
        <span className={styles.filter__triggerText}>{getButtonText()}</span>
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
                inputMode="text"
              />
            </div>
          )}

          <div className={styles.filter__list}>
            {props.type === "checkbox" && (
              <>
                {filteredData.length > 0 ? (
                  filteredData.map((filter) => (
                    <label key={filter.slug} className={styles.filter__item}>
                      <input
                        type="checkbox"
                        checked={props.selectedFilters.includes(filter.name)}
                        onChange={() => handleFilterToggle(filter.name)}
                        className={styles.filter__checkbox}
                      />
                      <span className={styles.filter__label}>
                        {filter.name}
                      </span>
                    </label>
                  ))
                ) : (
                  <div className={styles.filter__noResults}>
                    Ничего не найдено
                  </div>
                )}
              </>
            )}

            {props.type === "range" &&
              rangeOptions.map((option, index) => {
                const isSelected =
                  props.selectedRange[0] === option.value[0] &&
                  props.selectedRange[1] === option.value[1];

                return (
                  <label key={index} className={styles.filter__item}>
                    <input
                      type="radio"
                      name={`${props.title}-range`}
                      checked={isSelected}
                      onChange={() => handleRangeSelect(option.value)}
                      className={styles.filter__radio}
                    />
                    <span className={styles.filter__label}>{option.label}</span>
                  </label>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
});

Filter.displayName = "Filter";
