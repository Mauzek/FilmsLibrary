import React, { useId, useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Filter } from "@/components/ui";
import { useMovieFilters } from "@/hooks";
import { Icon24Filter } from "@vkontakte/icons";
import styles from "./filterBar.module.scss";

export const FilterBar: React.FC = observer(() => {
  const {
    genres,
    countries,
    activeFilters,
    hasActiveFilters,
    updateGenres,
    updateCountries,
    updateRating,
    updateYear,
    clearFilters,
  } = useMovieFilters();

  const [isOpen, setIsOpen] = useState(false);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const filtersId = useId();

  const toggleFilterBar = () => {
    setIsOpen((open) => !open);
  };

  const closeFilterBar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterBarRef.current && !filterBarRef.current.contains(event.target as Node)) {
        closeFilterBar();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const filters = document.getElementById(filtersId);
    if (filters) filters.inert = !isOpen;
  }, [filtersId, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className={styles.filterBar} ref={filterBarRef}>
      <button
        className={`${styles.filterBar__openButton} ${
          hasActiveFilters ? styles["filterBar__openButton--active"] : ""
        }`}
        type="button"
        onClick={toggleFilterBar}
        aria-expanded={isOpen}
        aria-controls={filtersId}
      >
        <Icon24Filter /> <span>Фильтры</span>
      </button>
      <div
        id={filtersId}
        className={`${styles.filterBar__filters} ${
          isOpen ? styles["filterBar__filters--open"] : ""
        }`}
        aria-hidden={!isOpen}
      >
        <Filter
          type="checkbox"
          data={genres}
          selectedFilters={activeFilters.genres}
          onChange={updateGenres}
          title="Жанры"
        />

        <Filter
          type="checkbox"
          data={countries}
          selectedFilters={activeFilters.countries}
          onChange={updateCountries}
          title="Страны"
        />

        <Filter
          type="range"
          data={[]}
          selectedRange={activeFilters.rating}
          onChange={updateRating}
          title="Рейтинг"
          min={0}
          max={10}
          step={0.1}
        />

        <Filter
          type="range"
          data={[]}
          selectedRange={activeFilters.year}
          onChange={updateYear}
          title="Год"
          min={1990}
          max={new Date().getFullYear()}
          step={1}
        />
        {hasActiveFilters && (
          <button type="button" className={styles.filterBar__clearBtn} onClick={clearFilters}>
            Очистить все
          </button>
        )}
      </div>
    </div>
  );
});

FilterBar.displayName = "FilterBar";
