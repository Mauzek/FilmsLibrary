import type { UserInfo } from "firebase/auth";

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  provider: UserInfo[];
  createAt: string | undefined;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}