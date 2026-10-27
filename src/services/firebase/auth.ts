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
  const { userStore, recentMoviesStore } = rootStore;
  const defaultLists = ["dropped", "planned", "watched", "favorites"];
  let authRequestId = 0;

  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
    const requestId = ++authRequestId;
    recentMoviesStore.unsubscribeHistory();

    if (!firebaseUser) {
      userStore.clearUser();
      return;
    }

    userStore.clearUser();
    userStore.setLoading(true);

    const isCurrentRequest = () =>
      requestId === authRequestId && auth.currentUser?.uid === firebaseUser.uid;

    try {
      const appUser = await getUserProfile(firebaseUser.uid);

      if (!isCurrentRequest()) return;

      if (!appUser) {
        userStore.clearUser();
        return;
      }

      const userLists = await getUserLists(appUser.uid, defaultLists);

      if (!isCurrentRequest()) return;

      userStore.setUser(appUser);
      userStore.setLists(userLists);
      recentMoviesStore.subscribe(appUser.uid);
    } catch (error) {
      if (!isCurrentRequest()) return;

      console.error("Ошибка загрузки данных пользователя:", error);
      userStore.clearUser();
    }
  });

  return () => {
    authRequestId++;
    unsubscribe();
    recentMoviesStore.unsubscribeHistory();
  };
};