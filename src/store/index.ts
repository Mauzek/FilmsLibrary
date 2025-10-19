import { createContext, useContext } from "react";
import { MoviesStore } from "./moviesStore";
import { FiltersStore } from "./filtersStore";
import { RecentMoviesStore } from "./recentMoviesStore";
import { UserStore } from "./userStore";

class RootStore {
  moviesStore: MoviesStore;
  filtersStore: FiltersStore;
  recentMoviesStore: RecentMoviesStore;
  userStore: UserStore;

  constructor() {
    this.moviesStore = new MoviesStore();
    this.filtersStore = new FiltersStore();
    this.recentMoviesStore = new RecentMoviesStore();
    this.userStore = new UserStore();
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

export const useMoviesStore = () => useStore().moviesStore;
export const useFiltersStore = () => useStore().filtersStore;
export const useRecentMoviesStore = () => useStore().recentMoviesStore;
export const useUserStore = () => useStore().userStore;

export { rootStore, StoreContext };
