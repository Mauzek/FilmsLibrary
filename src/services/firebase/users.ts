import { db } from "@/config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type { User } from "@/types/user";

export const createUser = async (user: User) => {
  const userRef = doc(db, "users", user.uid);

  await setDoc(userRef, {
    ...user,
    createdAt: new Date().toISOString(),
  });
};

export const updateUserProfile = async (user: User) => {
  const userRef = doc(db, "users", user.uid);

  await setDoc(
    userRef,
    {
      ...user,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
};

export const ensureUserExists = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await createUser(user);
  }
};

export const getUserProfile = async (uid: string): Promise<User | null> => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? (snap.data() as User) : null;
};
