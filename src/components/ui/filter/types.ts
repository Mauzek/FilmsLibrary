import type { FilterOption } from '@/types';

export interface BaseFilterProps {
  title: string;
}

export interface CheckboxFilterProps extends BaseFilterProps {
  type: 'checkbox';
  data: FilterOption[];
  selectedFilters: string[];
  onChange: (value: string[]) => void;
  selectedRange?: never;
  min?: never;
  max?: never;
  step?: never;
}

export interface RangeFilterProps extends BaseFilterProps {
  type: 'range';
  data: [];
  selectedRange: [number, number];
  onChange: (value: [number, number]) => void;
  selectedFilters?: never;
  min: number;
  max: number;
  step: number;
}

export type FilterProps = CheckboxFilterProps | RangeFilterProps;
