import { makeAutoObservable } from "mobx";
import type { User } from "@/types";

export class UserStore  {
  user: User | null = null;
  isAuthenticated = false;
  loading = true; 

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user: User | null) => {
    this.user = user;
    this.isAuthenticated = !!user;
    this.loading = false;
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  clearUser = () => {
    this.user = null;
    this.isAuthenticated = false;
    this.loading = false;
  };
}