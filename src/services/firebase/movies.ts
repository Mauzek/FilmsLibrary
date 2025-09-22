import { db } from "@/config/firebase";
import type { Movie } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import type { ListType } from "./lists";

export const getUserLists = async (
  uid: string,
  lists: string[]
): Promise<Record<string, Movie[]>> => {
  const result: Record<string, Movie[]> = {};
  lists.forEach((list) => (result[list] = []));

  try {
    const moviesRef = collection(db, "users", uid, "movies");
    const snap = await getDocs(moviesRef);

    snap.forEach((doc) => {
      const movie = doc.data() as Movie & { list: string };
      if (lists.includes(movie.list)) {
        result[movie.list].push(movie);
      }
    });
  } catch (error) {
    console.error("Ошибка получения списков пользователя:", error);
  }

  return result;
};

export async function getMoviesByList(uid: string, list: ListType) {
  const q = query(
    collection(db, "users", uid, "movies"),
    where("list", "==", list)
  );
  const snap = await getDocs(q);

  return snap.docs.map((d) => d.data());
}