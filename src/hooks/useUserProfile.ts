import { useEffect, useState } from "react";
import { getUserProfile, getUserLists } from "@/services/firebase";
import type { User } from "@/types/user";
import type { Movie } from "@/types";
import { useUserStore } from "@/store";

const defaultLists = ["dropped", "planned", "watched", "favorites"];

export const useUserProfile = (uid: string | undefined) => {
  const { user: currentUser, lists: currentLists } = useUserStore();
  const [user, setUser] = useState<User | null>(null);
  const [lists, setLists] = useState<Record<string, Movie[]>>({});
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingLists, setLoadingLists] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;

    const isCurrentUser = currentUser?.uid === uid;

    if (isCurrentUser && currentUser) {
      setUser(currentUser);
      setLists(currentLists);
      setLoadingProfile(false);
      setLoadingLists(false);
      setError(null);
      return;
    }

    setError(null);
    setLoadingProfile(true);
    setLoadingLists(true);

    let isCancelled = false;

    getUserProfile(uid)
      .then((profile) => {
        if (isCancelled) return;
        if (!profile) {
          setError("Пользователь не найден");
          setUser(null);
          setLists({});
          return;
        }
        setUser(profile);

        return getUserLists(uid, defaultLists)
          .then((userLists) => {
            if (isCancelled) return;
            setLists(userLists);
          })
          .catch((err) => {
            if (!isCancelled) {
              console.error("Ошибка загрузки списков:", err);
              setError("Ошибка при загрузке списков");
            }
          })
          .finally(() => {
            if (!isCancelled) setLoadingLists(false);
          });
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error("Ошибка загрузки профиля:", err);
          setError("Ошибка при загрузке профиля");
          setUser(null);
          setLists({});
        }
      })
      .finally(() => {
        if (!isCancelled) setLoadingProfile(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [uid, currentUser, currentLists]);

  return { user, lists, loadingProfile, loadingLists, error };
};
