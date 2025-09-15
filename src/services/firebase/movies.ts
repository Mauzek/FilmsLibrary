import { db } from "@/config/firebase";
import type { Movie } from "@/types";
import { collection, getDocs } from "firebase/firestore";

export const getUserLists = async (
  uid: string,
  lists: string[]
): Promise<Record<string, Movie[]>> => {
  const result: Record<string, Movie[]> = {};

  for (const listName of lists) {
    const listRef = collection(db, "users", uid, "lists", listName, "movies");
    const snap = await getDocs(listRef);
    result[listName] = snap.docs.map((doc) => doc.data() as Movie);
  }
  return result;
};
