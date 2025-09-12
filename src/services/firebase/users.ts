import { db } from "@/config/firebase";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import type { User } from "@/types/user";

const defaultLists = ["dropped", "favorites", "history", "planned", "watched"];

export const createUserWithLists = async (user: User) => {
  const userRef = doc(db, "users", user.uid);

  await setDoc(userRef, { 
    ...user, 
    createdAt: new Date().toISOString(),
  });

  for (const listName of defaultLists) {
    const listRef = doc(collection(userRef, "lists"), listName);
    await setDoc(listRef, { name: listName });
  }
};

export const updateUserProfile = async (user: User) => {
  const userRef = doc(db, "users", user.uid);

  await setDoc(userRef, { 
    ...user,
    updatedAt: new Date().toISOString(),
  }, { merge: true });
};

export const ensureUserExists = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await createUserWithLists(user);
  } else {
    await updateUserProfile(user);
  }
};

export const getUserProfile = async (uid: string): Promise<User | null> => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? (snap.data() as User) : null;
};
