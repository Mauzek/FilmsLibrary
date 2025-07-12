import { makeAutoObservable } from "mobx";
import { DEFAULT_FILTERS } from "@/types";
import type { FilterOption, FilterState, ApiFilters } from "@/types";
import filtersData from "@/data/filters.json";

export class FiltersStore {
  genres: FilterOption[] = [];
  countries: FilterOption[] = [];
  activeFilters: FilterState = { ...DEFAULT_FILTERS };

  constructor() {
    makeAutoObservable(this);
    this.loadStaticFilters();
  }

  private loadStaticFilters() {
    this.genres = filtersData.genres;
    this.countries = filtersData.countries;
  }

  findFilterByName(name: string, filters: FilterOption[]) {
    return filters.find((f) => f.name === name);
  }

  findFilterBySlug(slug: string, filters: FilterOption[]) {
    return filters.find((f) => f.slug === slug);
  }

  setGenres(genres: string[]) {
    this.activeFilters.genres = genres;
  }

  setCountries(countries: string[]) {
    this.activeFilters.countries = countries;
  }

  setRating(rating: [number, number]) {
    this.activeFilters.rating = rating;
  }

  setYear(year: [number, number]) {
    this.activeFilters.year = year;
  }

  clearActiveFilters() {
    this.activeFilters = { ...DEFAULT_FILTERS };
  }

  getApiFilters(): ApiFilters {
    const apiFilters: ApiFilters = {};

    if (this.activeFilters.genres.length > 0) {
      apiFilters["genres.name"] = this.activeFilters.genres;
    }

    if (this.activeFilters.countries.length > 0) {
      apiFilters["countries.name"] = this.activeFilters.countries;
    }

    if (
      this.activeFilters.rating[0] !== DEFAULT_FILTERS.rating[0] ||
      this.activeFilters.rating[1] !== DEFAULT_FILTERS.rating[1]
    ) {
      apiFilters[
        "rating.kp"
      ] = `${this.activeFilters.rating[0]}-${this.activeFilters.rating[1]}`;
    }

    if (
      this.activeFilters.year[0] !== DEFAULT_FILTERS.year[0] ||
      this.activeFilters.year[1] !== DEFAULT_FILTERS.year[1]
    ) {
      apiFilters.year = `${this.activeFilters.year[0]}-${this.activeFilters.year[1]}`;
    }

    return apiFilters;
  }

  get hasActiveFilters(): boolean {
    return (
      this.activeFilters.genres.length > 0 ||
      this.activeFilters.countries.length > 0 ||
      this.activeFilters.rating[0] !== DEFAULT_FILTERS.rating[0] ||
      this.activeFilters.rating[1] !== DEFAULT_FILTERS.rating[1] ||
      this.activeFilters.year[0] !== DEFAULT_FILTERS.year[0] ||
      this.activeFilters.year[1] !== DEFAULT_FILTERS.year[1]
    );
  }

  serializeFilters(): URLSearchParams {
    const params = new URLSearchParams();

    if (this.activeFilters.genres.length > 0) {
      const genreSlugs = this.activeFilters.genres
        .map((name) => this.findFilterByName(name, this.genres)?.slug)
        .filter(Boolean);
      if (genreSlugs.length > 0) {
        params.set("genres", genreSlugs.join(","));
      }
    }

    if (this.activeFilters.countries.length > 0) {
      const countrySlugs = this.activeFilters.countries
        .map((name) => this.findFilterByName(name, this.countries)?.slug)
        .filter(Boolean);
      if (countrySlugs.length > 0) {
        params.set("countries", countrySlugs.join(","));
      }
    }

    if (
      this.activeFilters.rating[0] !== DEFAULT_FILTERS.rating[0] ||
      this.activeFilters.rating[1] !== DEFAULT_FILTERS.rating[1]
    ) {
      params.set(
        "rating",
        `${this.activeFilters.rating[0]}-${this.activeFilters.rating[1]}`
      );
    }

    if (
      this.activeFilters.year[0] !== DEFAULT_FILTERS.year[0] ||
      this.activeFilters.year[1] !== DEFAULT_FILTERS.year[1]
    ) {
      params.set(
        "year",
        `${this.activeFilters.year[0]}-${this.activeFilters.year[1]}`
      );
    }

    return params;
  }

  deserializeFilters(searchParams: URLSearchParams) {
    const filters: FilterState = { ...DEFAULT_FILTERS };

    const genresParam = searchParams.get("genres");
    if (genresParam) {
      const genreSlugs = genresParam.split(",").filter(Boolean);
      const genreNames = genreSlugs
        .map((slug) => this.findFilterBySlug(slug, this.genres)?.name)
        .filter(Boolean) as string[];
      filters.genres = genreNames;
    }

    const countriesParam = searchParams.get("countries");
    if (countriesParam) {
      const countrySlugs = countriesParam.split(",").filter(Boolean);
      const countryNames = countrySlugs
        .map((slug) => this.findFilterBySlug(slug, this.countries)?.name)
        .filter(Boolean) as string[];
      filters.countries = countryNames;
    }

    const ratingParam = searchParams.get("rating");
    if (ratingParam) {
      const [min, max] = ratingParam.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        filters.rating = [min, max];
      }
    }

    const yearParam = searchParams.get("year");
    if (yearParam) {
      const [min, max] = yearParam.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        filters.year = [min, max];
      }
    }

    const currentFiltersStr = JSON.stringify(this.activeFilters);
    const newFiltersStr = JSON.stringify(filters);
    
    if (currentFiltersStr !== newFiltersStr) {
      this.activeFilters = filters;
    }
  }

  reset() {
    this.activeFilters = { ...DEFAULT_FILTERS };
  }
}
