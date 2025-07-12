export interface FilterOption {
  name: string;
  slug: string;
}

export interface FilterState {
  genres: string[];
  countries: string[];
  rating: [number, number];
  year: [number, number];
}

export const DEFAULT_FILTERS: FilterState = {
  genres: [],
  countries: [],
  rating: [0, 10],
  year: [1990, new Date().getFullYear()],
};

export const RATING_RANGES = [
  { label: "Любой", value: [0, 10] as [number, number] },
  { label: "9.0+", value: [9.0, 10] as [number, number] },
  { label: "8.0+", value: [8.0, 10] as [number, number] },
  { label: "7.0+", value: [7.0, 10] as [number, number] },
  { label: "6.0+", value: [6.0, 10] as [number, number] },
  { label: "5.0-6.9", value: [5.0, 6.9] as [number, number] },
  { label: "Ниже 5.0", value: [0, 4.9] as [number, number] },
];

export const YEAR_RANGES = [
  { label: "Любой", value: [1990, new Date().getFullYear()] as [number, number] },
  { label: "2020-2025", value: [2020, 2024] as [number, number] },
  { label: "2010-2019", value: [2010, 2019] as [number, number] },
  { label: "2000-2009", value: [2000, 2009] as [number, number] },
  { label: "1990-1999", value: [1990, 1999] as [number, number] }
];
