import { db } from "@/config/firebase";
import { rootStore } from "@/store";
import type { Movie, SavedMovie } from "@/types";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

export const LISTS = ["dropped", "favorites", "watched", "planned"] as const;
export type ListType = (typeof LISTS)[number];

export async function setMovieList(movie: Movie, list: ListType) {
  const { userStore } = rootStore;
  try {
    const movieRef = doc(db, "users", userStore.user!.uid, "movies", String(movie.id));

    const reducedMovie: SavedMovie = {
      id: movie.id,
      name: movie.name || movie.alternativeName || "Без названия",
      poster: movie.poster,
      rating: movie.rating,
      year: movie.year,
      countries: movie.countries,
      genres: movie.genres,
      list,
      addedAt: serverTimestamp(),
    };

    await setDoc(movieRef, reducedMovie);
  } catch (error) {
    console.error("Ошибка добавления фильма в список:", error);
  }
}

export async function removeMovie(movieId: number) {
  const { userStore } = rootStore;
  try {
    const movieRef = doc(db, "users", userStore.user!.uid, "movies", String(movieId));
    await deleteDoc(movieRef);
  } catch (error) {
    console.error("Ошибка удаления фильма:", error);
  }
}

export async function getMovieList(movieId: number): Promise<ListType | null> {
  const { userStore } = rootStore;
  try {
    const movieRef = doc(db, "users", userStore.user!.uid, "movies", String(movieId));
    const snap = await getDoc(movieRef);

    if (snap.exists()) {
      return snap.data().list as ListType;
    }
    return null;
  } catch (error) {
    console.error("Ошибка получения списка фильма:", error);
    return null;
  }
}
