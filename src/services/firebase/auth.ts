import { auth, googleProvider } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type UserCredential
} from "firebase/auth";
import { createUserWithLists, getUserProfile, ensureUserExists } from "@/services/firebase/users";
import type { User as FirebaseUser } from "firebase/auth";
import { rootStore } from "@/store";

export const registerWithEmail = async (email: string, password: string) => {
  const userCred: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

  await createUserWithLists({
    uid: userCred.user.uid,
    email: userCred.user.email,
    displayName: userCred.user.displayName,
    photoURL: userCred.user.photoURL,
    emailVerified: userCred.user.emailVerified,
    isAnonymous: userCred.user.isAnonymous,
    providerData: userCred.user.providerData,
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
    createdAt: new Date().toISOString(),
  });

  return userCred;
};

export const logout = () => signOut(auth);

export const initAuthListener = () => {
  const { userStore } = rootStore;

  onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
    if (!firebaseUser) {
      userStore.clearUser();
      return;
    }

    const appUser = await getUserProfile(firebaseUser.uid);

    if (appUser) {
      userStore.setUser(appUser);
    } else {
      userStore.clearUser();
    }
  });
};