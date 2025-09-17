import { makeAutoObservable, runInAction } from "mobx";
import { db } from "@/config/firebase";
import type { Movie } from "@/types";
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
  recent: Movie[] = [];
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
      const movies: Movie[] = snap.docs.map((doc) => doc.data() as Movie);
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

      await setDoc(movieRef, {
        ...movie,
        addedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Ошибка добавления фильма в историю:", error);
    }
  }
}
