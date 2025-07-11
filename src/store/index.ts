import { createContext, useContext } from "react";
import { MoviesStore } from "./moviesStore";

class RootStore {
  moviesStore: MoviesStore;

  constructor() {
    this.moviesStore = new MoviesStore();
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

export { rootStore, StoreContext };
