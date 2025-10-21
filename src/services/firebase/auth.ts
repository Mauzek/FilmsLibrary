import { auth, googleProvider } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type UserCredential
} from "firebase/auth";
import { createUser, ensureUserExists, getUserProfile } from "@/services/firebase/users";
import type { User as FirebaseUser } from "firebase/auth";
import { rootStore } from "@/store";
import { getUserLists } from "./movies";

export const registerWithEmail = async (email: string, password: string) => {
  const userCred: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

  await createUser({
    uid: userCred.user.uid,
    email: userCred.user.email,
    displayName: userCred.user.displayName,
    photoURL: userCred.user.photoURL,
    emailVerified: userCred.user.emailVerified,
    isAnonymous: userCred.user.isAnonymous,
    providerData: userCred.user.providerData,
    profileColor: null,
    createdAt: new Date().toISOString(),
  });

  return userCred;
};

export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async () => {
  const userCred = await signInWithPopup(auth, googleProvider);

  await ensureUserExists({
    uid: userCred.user.uid,
    email: userCred.user.email,
    displayName: userCred.user.displayName,
    photoURL: userCred.user.photoURL,
    emailVerified: userCred.user.emailVerified,
    isAnonymous: userCred.user.isAnonymous,
    providerData: userCred.user.providerData,
    profileColor: null,
    createdAt: new Date().toISOString(),
  });

  return userCred;
}
export const logout = () => signOut(auth);

export const initAuthListener = () => {
  const { userStore } = rootStore;
  const defaultLists = ["dropped", "planned", "watched", "favorites"];
  onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
    if (!firebaseUser) {
      userStore.clearUser();
      return;
    }

    const appUser = await getUserProfile(firebaseUser.uid);

    if (appUser) {
      userStore.setUser(appUser);
      const userLists = await getUserLists(appUser.uid, defaultLists);
      userStore.setLists(userLists);
    } else {
      userStore.clearUser();
    }
  });
};