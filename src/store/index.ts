import { createContext, useContext } from "react";
import { MoviesStore } from "./moviesStore";
import { FiltersStore } from "./filtersStore";

class RootStore {
  moviesStore: MoviesStore;
  filtersStore: FiltersStore;
  
  constructor() {
    this.moviesStore = new MoviesStore();
    this.filtersStore = new FiltersStore();
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

export { rootStore, StoreContext };
