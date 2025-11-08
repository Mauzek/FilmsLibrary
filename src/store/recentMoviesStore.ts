import { makeAutoObservable, runInAction } from "mobx";
import { db } from "@/config/firebase";
import type { Movie, SavedMovie } from "@/types";
import {
  collection,
  doc,
  setDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export class RecentMoviesStore {
  recent: SavedMovie[] = [];
  uid: string | null = null;
  unsubscribe: (() => void) | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  subscribe(uid: string) {
    this.unsubscribeHistory();
    this.uid = uid;

    const historyRef = collection(db, "users", uid, "history");
    const q = query(historyRef, orderBy("addedAt", "desc"), limit(7));

    this.unsubscribe = onSnapshot(q, (snap) => {
      const movies: SavedMovie[] = snap.docs.map((doc) => doc.data() as Movie);
      console.log("Recent movies updated:", movies);
      runInAction(() => {
        this.recent = movies;
      });
    });
  }

  unsubscribeHistory() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  async addToRecentMovies(movie: Movie) {
    if (!this.uid) return;

    try {
      const movieRef = doc(db, "users", this.uid, "history", String(movie.id));

      const reducedMovie: SavedMovie = {
        id: movie.id,
        name: movie.name || movie.alternativeName || "Без названия",
        poster: movie.poster,
        rating: movie.rating,
        year: movie.year,
        countries: movie.countries,
        genres: movie.genres,
        addedAt: serverTimestamp(),
      };

      await setDoc(movieRef, {
        ...reducedMovie,
        addedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Ошибка добавления фильма в историю:", error);
    }
  }
}
