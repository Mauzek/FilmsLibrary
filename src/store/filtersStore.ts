import { makeAutoObservable } from "mobx";
import { DEFAULT_FILTERS } from "@/types";
import type { FilterOption, FilterState, ApiFilters } from "@/types";
import filtersData from "@/data/filters.json";

export class FiltersStore {
  genres: FilterOption[] = [];
  countries: FilterOption[] = [];

  private genreNameToSlug = new Map<string, string>();
  private genreSlugToName = new Map<string, string>();

  private countryNameToSlug = new Map<string, string>();
  private countrySlugToName = new Map<string, string>();

  activeFilters: FilterState = { ...DEFAULT_FILTERS };

  constructor() {
    makeAutoObservable(this);
    this.loadStaticFilters();
  }

  //
  // ================== INIT ==================
  //

  private loadStaticFilters() {
    this.genres = filtersData.genres;
    this.countries = filtersData.countries;

    for (const g of this.genres) {
      this.genreNameToSlug.set(g.name, g.slug);
      this.genreSlugToName.set(g.slug, g.name);
    }

    for (const c of this.countries) {
      this.countryNameToSlug.set(c.name, c.slug);
      this.countrySlugToName.set(c.slug, c.name);
    }
  }

  //
  // ================== SETTERS ==================
  //

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

  //
  // ================== HELPERS ==================
  //

  private rangeToString([min, max]: [number, number]): string {
    return `${min}-${max}`;
  }

  private isDefaultRange(
    value: [number, number],
    def: [number, number]
  ): boolean {
    return value[0] === def[0] && value[1] === def[1];
  }

  //
  // ================== API FILTERS ==================
  //

  getApiFilters(): ApiFilters {
    const f = this.activeFilters;
    const apiFilters: ApiFilters = {};

    if (f.genres.length > 0) {
      apiFilters["genres.name"] = f.genres;
    }

    if (f.countries.length > 0) {
      apiFilters["countries.name"] = f.countries;
    }

    if (!this.isDefaultRange(f.rating, DEFAULT_FILTERS.rating)) {
      apiFilters["rating.kp"] = this.rangeToString(f.rating);
    }

    if (!this.isDefaultRange(f.year, DEFAULT_FILTERS.year)) {
      apiFilters.year = this.rangeToString(f.year);
    }

    return apiFilters;
  }

  //
  // ================== ACTIVE CHECK ==================
  //

  get hasActiveFilters(): boolean {
    const f = this.activeFilters;

    return (
      f.genres.length > 0 ||
      f.countries.length > 0 ||
      !this.isDefaultRange(f.rating, DEFAULT_FILTERS.rating) ||
      !this.isDefaultRange(f.year, DEFAULT_FILTERS.year)
    );
  }

  //
  // ================== SERIALIZATION ==================
  //

  serializeFilters(): URLSearchParams {
    const params = new URLSearchParams();
    const f = this.activeFilters;

    if (f.genres.length > 0) {
      const slugs = f.genres
        .map((name) => this.genreNameToSlug.get(name))
        .filter(Boolean) as string[];
      if (slugs.length) params.set("genres", slugs.join(","));
    }

    if (f.countries.length > 0) {
      const slugs = f.countries
        .map((name) => this.countryNameToSlug.get(name))
        .filter(Boolean) as string[];
      if (slugs.length) params.set("countries", slugs.join(","));
    }

    if (!this.isDefaultRange(f.rating, DEFAULT_FILTERS.rating)) {
      params.set("rating", this.rangeToString(f.rating));
    }

    if (!this.isDefaultRange(f.year, DEFAULT_FILTERS.year)) {
      params.set("year", this.rangeToString(f.year));
    }

    return params;
  }

  //
  // ================== DESERIALIZATION ==================
  //

  deserializeFilters(searchParams: URLSearchParams) {
    const f: FilterState = { ...DEFAULT_FILTERS };

    const genresParam = searchParams.get("genres");
    if (genresParam) {
      f.genres = genresParam
        .split(",")
        .map((slug) => this.genreSlugToName.get(slug))
        .filter(Boolean) as string[];
    }

    const countriesParam = searchParams.get("countries");
    if (countriesParam) {
      f.countries = countriesParam
        .split(",")
        .map((slug) => this.countrySlugToName.get(slug))
        .filter(Boolean) as string[];
    }

    const ratingParam = searchParams.get("rating");
    if (ratingParam) {
      const parts = ratingParam.split("-").map(Number);
      if (!isNaN(parts[0]) && !isNaN(parts[1])) {
        f.rating = [parts[0], parts[1]];
      }
    }

    const yearParam = searchParams.get("year");
    if (yearParam) {
      const parts = yearParam.split("-").map(Number);
      if (!isNaN(parts[0]) && !isNaN(parts[1])) {
        f.year = [parts[0], parts[1]];
      }
    }

    if (JSON.stringify(f) !== JSON.stringify(this.activeFilters)) {
      this.activeFilters = f;
    }
  }

  //
  // ================== RESET ==================
  //

  reset() {
    this.activeFilters = { ...DEFAULT_FILTERS };
  }
}
