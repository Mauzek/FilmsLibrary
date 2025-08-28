import React from 'react';
import styles from './grid.module.scss';
import type { GridProps } from './types';

export const Grid: React.FC<GridProps> = ({ 
  children, 
  columns = 5, 
  gap = 30,
  className = ''
}) => {
  const gridStyle = {
    '--grid-columns': columns,
    '--grid-gap': `${gap}px`,
  } as React.CSSProperties;

  return (
    <div 
      className={`${styles.grid} ${className}`}
      style={gridStyle}
    >
      {children}
    </div>
  );
};
