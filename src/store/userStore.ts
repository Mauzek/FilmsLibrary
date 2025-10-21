import { makeAutoObservable } from "mobx";
import type { Movie, User } from "@/types";

type ListName = "favorites" | "planned" | "dropped" | "watched";

export class UserStore {
  user: User | null = null;
  isAuthenticated = false;
  lists: Record<ListName, Movie[]> = {
    favorites: [],
    planned: [],
    dropped: [],
    watched: [],
  };
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user: User | null) => {
    this.user = user;
    this.isAuthenticated = !!user;
    this.loading = false;
  };

  setLists = (lists: Partial<Record<ListName, Movie[]>>) => {
    this.lists = {
      favorites: lists.favorites ?? this.lists.favorites,
      planned: lists.planned ?? this.lists.planned,
      dropped: lists.dropped ?? this.lists.dropped,
      watched: lists.watched ?? this.lists.watched,
    };
  };

  addMovieToList = (listName: ListName, movie: Movie) => {
    const { id } = movie;
    let foundIn: ListName | null = null;

    for (const key in this.lists) {
      const exists = this.lists[key as ListName].some((m) => m.id === id);
      if (exists) {
        foundIn = key as ListName;
        break;
      }
    }

    if (foundIn) {
      this.lists[foundIn] = this.lists[foundIn].filter((m) => m.id !== id);
    }

    const alreadyInTarget = this.lists[listName].some((m) => m.id === id);
    if (!alreadyInTarget) {
      this.lists[listName].push(movie);
    }
  };

  removeMovieFromList = (listName: ListName, movieId: number) => {
    this.lists[listName] = this.lists[listName].filter((m) => m.id !== movieId);
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  clearUser = () => {
    this.user = null;
    this.isAuthenticated = false;
    this.loading = false;
    this.lists = {
      favorites: [],
      planned: [],
      dropped: [],
      watched: [],
    };
  };
}
