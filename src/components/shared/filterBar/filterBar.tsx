import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Filter } from "@/components/ui";
import { useMovieFilters } from "@/hooks";
import { Icon24Filter } from "@vkontakte/icons";
import styles from "./FilterBar.module.scss";

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

  const toggleFilterBar = () => {
    setIsOpen(!isOpen);
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

  return (
    <div className={styles.filterBar} ref={filterBarRef}>
      <button
        className={`${styles.filterBar__openButton} ${
          hasActiveFilters ? styles["filterBar__openButton--active"] : ""
        }`}
        onClick={toggleFilterBar}
      >
        <Icon24Filter /> <span>Фильтры</span>
      </button>
      <div
        className={`${styles.filterBar__filters} ${
          isOpen ? styles["filterBar__filters--open"] : ""
        }`}
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
          <button className={styles.filterBar__clearBtn} onClick={clearFilters}>
            Очистить все
          </button>
        )}
      </div>
    </div>
  );
});

FilterBar.displayName = "FilterBar";
