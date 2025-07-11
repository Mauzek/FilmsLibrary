import { makeAutoObservable, runInAction } from 'mobx';
import { api } from '@/api';
import type { Movie, ApiFilters, ApiResponse } from '@/types';

export class MoviesStore {
    movies: Movie[] = [];
    loading = false;
    error: string | null = null;
    hasMore = true;
    
    currentPage = 1;
    totalPages = 0;
    total = 0;
    limit = 50;
    
    filters: ApiFilters = {};
    
    constructor() {
        makeAutoObservable(this);
    }

    initializeFromServer(serverData: ApiResponse<Movie>, filters: ApiFilters = {}) {
        runInAction(() => {
            this.movies = serverData.docs;
            this.currentPage = serverData.page;
            this.totalPages = serverData.pages;
            this.total = serverData.total;
            this.hasMore = serverData.page < serverData.pages;
            this.filters = filters;
            this.loading = false;
            this.error = null;
        });
    }

    async loadMovies(filters: ApiFilters = {}) {
        this.setLoading(true);
        this.setError(null);
        
        try {
            const response = await api.getMovies({
                ...filters,
                page: 1,
                limit: this.limit
            });
            
            runInAction(() => {
                const data = response.data;
                this.movies = data.docs;
                this.currentPage = data.page;
                this.totalPages = data.pages;
                this.total = data.total;
                this.hasMore = data.page < data.pages;
                this.filters = filters;
            });
        } catch (error) {
            this.setError(error instanceof Error ? error.message : 'Ошибка загрузки фильмов');
        } finally {
            this.setLoading(false);
        }
    }

    async loadMoreMovies() {
        if (!this.hasMore || this.loading) return;
        
        this.setLoading(true);
        
        try {
            const nextPage = this.currentPage + 1;
            const response = await api.getMovies({
                ...this.filters,
                page: nextPage,
                limit: this.limit
            });
            
            runInAction(() => {
                const data = response.data;
                this.movies = [...this.movies, ...data.docs];
                this.currentPage = data.page;
                this.hasMore = data.page < data.pages;
            });
        } catch (error) {
            this.setError(error instanceof Error ? error.message : 'Ошибка загрузки фильмов');
        } finally {
            this.setLoading(false);
        }
    }

    async searchMovies(query: string, filters: ApiFilters = {}) {
        if (!query.trim()) {
            this.loadMovies(filters);
            return;
        }

        this.setLoading(true);
        this.setError(null);
        
        try {
            const response = await api.searchMovies(query, {
                ...filters,
                page: 1,
                limit: this.limit
            });
            
            runInAction(() => {
                const data = response.data;
                this.movies = data.docs;
                this.currentPage = data.page;
                this.totalPages = data.pages;
                this.total = data.total;
                this.hasMore = data.page < data.pages;
                this.filters = { ...filters, query };
            });
        } catch (error) {
            this.setError(error instanceof Error ? error.message : 'Ошибка поиска фильмов');
        } finally {
            this.setLoading(false);
        }
    }

    async loadRandomMovie(filters: ApiFilters = {}) {
        this.setLoading(true);
        this.setError(null);
        
        try {
            const response = await api.getRandomMovie(filters);
            
            runInAction(() => {
                this.movies = [response.data];
                this.currentPage = 1;
                this.totalPages = 1;
                this.total = 1;
                this.hasMore = false;
                this.filters = filters;
            });
        } catch (error) {
            this.setError(error instanceof Error ? error.message : 'Ошибка загрузки случайного фильма');
        } finally {
            this.setLoading(false);
        }
    }

    reset() {
        this.movies = [];
        this.currentPage = 1;
        this.totalPages = 0;
        this.total = 0;
        this.hasMore = true;
        this.filters = {};
        this.error = null;
        this.loading = false;
    }

    private setLoading(loading: boolean) {
        this.loading = loading;
    }

    private setError(error: string | null) {
        this.error = error;
    }

    get isEmpty() {
        return this.movies.length === 0 && !this.loading;
    }

    get isFirstLoad() {
        return this.loading && this.movies.length === 0;
    }

    get isLoadingMore() {
        return this.loading && this.movies.length > 0;
    }
}
