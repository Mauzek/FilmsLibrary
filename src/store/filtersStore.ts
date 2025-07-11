import { makeAutoObservable, runInAction } from 'mobx';
import { api } from '@/api';
import type { FilterOption } from '@/types';

export class FiltersStore {
    genres: FilterOption[] = [];
    countries: FilterOption[] = [];

    loading = false;
    error: string | null = null;
    initialized = false;

    constructor() {
        makeAutoObservable(this);
    }

    async loadAllFilters() {
        if (this.loading || this.initialized) return;

        this.setLoading(true);
        this.setError(null);

        try {
            const [genresResponse, countriesResponse] = await Promise.all([
                api.getPosibleValues('genres.name'),
                api.getPosibleValues('countries.name'),
            ]);

            runInAction(() => {
                this.genres = genresResponse.data;
                this.countries = countriesResponse.data;
                this.initialized = true;
            });
        } catch (error) {
            this.setError(error instanceof Error ? error.message : 'Ошибка загрузки фильтров');
        } finally {
            this.setLoading(false);
        }
    }

    findGenreByName(name: string): FilterOption | undefined {
        return this.genres.find(genre => 
            genre.name.toLowerCase() === name.toLowerCase() ||
            genre.slug.toLowerCase() === name.toLowerCase()
        );
    }

    findCountryByName(name: string): FilterOption | undefined {
        return this.countries.find(country => 
            country.name.toLowerCase() === name.toLowerCase() ||
            country.slug.toLowerCase() === name.toLowerCase()
        );
    }

    validateGenres(genreNames: string[]): string[] {
        return genreNames
            .map(name => this.findGenreByName(name))
            .filter((genre): genre is FilterOption => genre !== undefined)
            .map(genre => genre.name);
    }

    validateCountries(countryNames: string[]): string[] {
        return countryNames
            .map(name => this.findCountryByName(name))
            .filter((country): country is FilterOption => country !== undefined)
            .map(country => country.name);
    }

    private setLoading(loading: boolean) {
        this.loading = loading;
    }

    private setError(error: string | null) {
        this.error = error;
    }

    reset() {
        this.genres = [];
        this.countries = [];
        this.loading = false;
        this.error = null;
        this.initialized = false;
    }
}
