import React from 'react';
import styles from './grid.module.scss';
import type { GridProps } from './types';

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 5,
  gap = 30,
  className = '',
  scrollable = 'none',
}) => {
  const gridStyle = {
    '--grid-columns': columns,
    '--grid-gap': `${gap}px`,
  } as React.CSSProperties;

  const scrollClass = 
    scrollable === 'all' ? styles.scrollableX :
    scrollable === 'mobile' ? styles.scrollableXMobile :
    scrollable === 'desktop' ? styles.scrollableXDesktop :
    '';

  return (
    <div 
      className={`${styles.grid} ${scrollClass} ${className}`}
      style={gridStyle}
    >
      {children}
    </div>
  );
};

