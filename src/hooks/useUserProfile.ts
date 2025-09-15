import { useEffect, useState } from "react";
import { getUserProfile, getUserLists } from "@/services/firebase";
import type { User } from "@/types/user";
import type { Movie } from "@/types";

const defaultLists = ["dropped", "planned", "watched", "favorites"];

export const useUserProfile = (uid: string | undefined) => {
  const [user, setUser] = useState<User | null>(null);
  const [lists, setLists] = useState<Record<string, Movie[]>>({});
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingLists, setLoadingLists] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;

    setError(null);
    setLoadingProfile(true);
    setLoadingLists(true);

    getUserProfile(uid)
      .then((profile) => {
        if (!profile) {
          setError("Пользователь не найден");
          return;
        }
        setUser(profile);

        getUserLists(uid, defaultLists)
          .then((userLists) => setLists(userLists))
          .catch((err) => {
            console.error(err);
            setError("Ошибка при загрузке списков");
          })
          .finally(() => setLoadingLists(false));
      })
      .catch((err) => {
        console.error(err);
        setError("Ошибка при загрузке профиля");
      })
      .finally(() => setLoadingProfile(false));
  }, [uid]);

  return { user, lists, loadingProfile, loadingLists, error };
};
