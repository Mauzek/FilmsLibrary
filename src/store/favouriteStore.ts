import type { Movie } from "@/types";
import { makeAutoObservable } from "mobx";

export class FavouriteStore {
   favourites: Movie[] = [];

    constructor(){
        const favourites = localStorage.getItem("favourites");
        if(favourites){
            this.favourites = JSON.parse(favourites);
        }
        makeAutoObservable(this);
    }

    addToFavourites(movie: Movie){
        this.favourites.push(movie);
        localStorage.setItem("favourites", JSON.stringify(this.favourites));
    }

    removeFromFavourites(movie: Movie){
        this.favourites = this.favourites.filter(favourite => favourite.id !== movie.id);
        localStorage.setItem("favourites", JSON.stringify(this.favourites));
    }

    isFavourite(movie: Movie){
        return this.favourites.some(favourite => favourite.id === movie.id);
    }
}