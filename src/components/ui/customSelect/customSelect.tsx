import React, { useEffect, useId, useRef, useState } from "react";
import styles from "./customSelect.module.scss";
import type { CustomSelectProps } from "./types";
import { Icon20ChevronRight } from "@vkontakte/icons";

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Выберите плеер",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listboxId = useId();

  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value.iframeUrl)
  );
  const selectedOption = options[selectedIndex];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) optionRefs.current[activeIndex]?.focus();
  }, [activeIndex, isOpen]);

  const selectOption = (index: number) => {
    const option = options[index];
    if (!option) return;

    onChange({ iframeUrl: option.value, type: option.label });
    setActiveIndex(index);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const openSelect = (index = selectedIndex) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openSelect(event.key === "ArrowDown" ? selectedIndex : Math.max(0, selectedIndex - 1));
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((open) => !open);
      setActiveIndex(selectedIndex);
    }
  };

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (event.key === "ArrowDown" && options.length > 0) {
      event.preventDefault();
      setActiveIndex((index + 1) % options.length);
    } else if (event.key === "ArrowUp" && options.length > 0) {
      event.preventDefault();
      setActiveIndex((index - 1 + options.length) % options.length);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(index);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div className={styles.customSelect} ref={selectRef}>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.customSelect__trigger} ${isOpen ? styles.customSelect__trigger_open : ""}`}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={selectedOption ? `Плеер: ${selectedOption.label}` : placeholder}
      >
        <span className={styles.customSelect__value}>
          {selectedOption?.label || placeholder}
        </span>
        <Icon20ChevronRight
          aria-hidden="true"
          className={`${styles.customSelect__arrow} ${isOpen ? styles.customSelect__arrow_open : ""}`}
        />
      </button>

      {isOpen && (
        <div id={listboxId} className={styles.customSelect__dropdown} role="listbox" aria-label="Доступные плееры">
          {options.map((option, index) => (
            <button
              ref={(element) => { optionRefs.current[index] = element; }}
              type="button"
              role="option"
              aria-selected={option.value === value.iframeUrl}
              tabIndex={index === activeIndex ? 0 : -1}
              key={option.value}
              className={`${styles.customSelect__option} ${
                option.value === value.iframeUrl ? styles.customSelect__option_selected : ""
              }`}
              onClick={() => selectOption(index)}
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
