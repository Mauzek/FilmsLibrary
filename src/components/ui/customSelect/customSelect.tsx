import React, { useState, useRef, useEffect } from "react";
import styles from "./customSelect.module.scss";
import type { CustomSelectProps, PlayerData } from "./types";
import { Icon20ChevronRight } from "@vkontakte/icons";


export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Выберите плеер"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value.iframeUrl);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (player: PlayerData) => {
    onChange(player);
    setIsOpen(false);
  };

  return (
    <div className={styles.customSelect} ref={selectRef}>
      <div 
        className={`${styles.customSelect__trigger} ${isOpen ? styles.customSelect__trigger_open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.customSelect__value}>
          {selectedOption?.label || placeholder}
        </span>

          <Icon20ChevronRight className={`${styles.customSelect__arrow} ${isOpen ? styles.customSelect__arrow_open : ''}`}/>
     
      </div>
      
      {isOpen && (
        <div className={styles.customSelect__dropdown}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.customSelect__option} ${
                option.value === value.iframeUrl ? styles.customSelect__option_selected : ''
              }`}
              onClick={() => handleOptionClick({iframeUrl: option.value, source: option.label})}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
