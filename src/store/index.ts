import { createContext, useContext } from "react";
import { MoviesStore } from "./moviesStore";
import { FiltersStore } from "./filtersStore";
import { FavouriteStore } from "./favouriteStore";
import { RecentMoviesStore } from "./recentMoviesStore";

class RootStore {
  moviesStore: MoviesStore;
  filtersStore: FiltersStore;
  favouriteStore: FavouriteStore;
  recentMoviesStore: RecentMoviesStore;

  constructor() {
    this.moviesStore = new MoviesStore();
    this.filtersStore = new FiltersStore();
    this.favouriteStore = new FavouriteStore();
    this.recentMoviesStore = new RecentMoviesStore();
  }
}

const rootStore = new RootStore();

const StoreContext = createContext(rootStore);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};

export const useMoviesStore = () => {
  return useStore().moviesStore;
};

export const useFiltersStore = () => {
  return useStore().filtersStore;
};

export const useFavouriteStore = () => {
  return useStore().favouriteStore;
};

export const useRecentMoviesStore = () => {
  return useStore().recentMoviesStore;
};


export { rootStore, StoreContext };
