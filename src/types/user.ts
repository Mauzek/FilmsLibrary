import type { UserInfo } from "firebase/auth";
import type { Movie } from "./movie";

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: UserInfo[];
  createdAt: string;
  profileColor: string | null;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  lists: Record<string, Movie[]>;
}

interface Statistic {
  count: number;
  percent: number;
}

export interface UserListsStatistics {
  favorites: Statistic;
  planned: Statistic;
  watched: Statistic;
  dropped: Statistic;
  all: number;
}