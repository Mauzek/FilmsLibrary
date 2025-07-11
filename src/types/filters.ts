export interface FilterOption {
    name: string;
    slug: string;
}

export interface PossibleValuesResponse {
    name: string;
    slug: string;
}

export interface FiltersData {
    genres: FilterOption[];
    countries: FilterOption[];
    networks?: FilterOption[];
    status?: FilterOption[];
    type?: FilterOption[];
}
