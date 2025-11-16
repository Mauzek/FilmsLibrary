import { makeAutoObservable } from "mobx";

export class SearchStore {
  isMobileOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  open = () => { this.isMobileOpen = true; }
  close = () => { this.isMobileOpen = false; }
  toggle = () => { this.isMobileOpen = !this.isMobileOpen; }
}

export const searchStore = new SearchStore();
