import { makeAutoObservable } from "mobx";
import type { User } from "@/types";

const mockGoogleProvider = {
  providerId: "google.com",
  uid: "1234567890",
  displayName: "Алексей Петров",
  email: "alexey.petrov@gmail.com",
  phoneNumber: null,
  photoURL: "https://lh3.googleusercontent.com/.../photo.jpg",
};

export const userMock = {
  uid: "abc123xyz456",
  email: "john.doe@example.com",
  displayName: "John Doe",
  photoURL: "https://lh3.googleusercontent.com/ogw/AF2bZyixcamI8keFR7ndMQvozMvQ95yloCYu_ay5ibrJGe7EgZs=s32-c-mo",
  emailVerified: true,
  isAnonymous: false,
  providerData: [mockGoogleProvider],
  createdAt: "2025-04-01T10:00:00.000Z",
};

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