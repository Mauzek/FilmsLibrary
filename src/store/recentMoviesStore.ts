import type { Movie } from "@/types";
import { makeAutoObservable } from "mobx";

export class RecentMoviesStore {
    recent: Movie[] = [];

    constructor(){
        const recent = localStorage.getItem("recent");
        if(recent){
            try {
                this.recent = JSON.parse(recent);
            } catch (error) {
                console.error('Error parsing recent movies from localStorage:', error);
                this.recent = [];
            }
        }
        makeAutoObservable(this);
    }

    addToRecentMovies(movie: Movie){
        this.recent = this.recent.filter(recentMovie => recentMovie.id !== movie.id);
        
        this.recent.unshift(movie);
        
        if (this.recent.length > 7) {
            this.recent = this.recent.slice(0, 7);
        }
        
        try {
            localStorage.setItem("recent", JSON.stringify(this.recent));
        } catch (error) {
            console.error('Error saving recent movies to localStorage:', error);
        }
    }

    removeFromRecentMovies(movie: Movie){
        this.recent = this.recent.filter(recentMovie => recentMovie.id !== movie.id);
        try {
            localStorage.setItem("recent", JSON.stringify(this.recent));
        } catch (error) {
            console.error('Error saving recent movies to localStorage:', error);
        }
    }

    clearRecentMovies(){
        this.recent = [];
        try {
            localStorage.removeItem("recent");
        } catch (error) {
            console.error('Error clearing recent movies from localStorage:', error);
        }
    }
}
