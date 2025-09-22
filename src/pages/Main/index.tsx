import { useEffect } from "react";
import { ErrorState, MoviesGrid, Section } from "@/components";
import { Icon24Fire, Icon24HistoryBackwardOutline } from "@vkontakte/icons";
import { useMoviesStore, useRecentMoviesStore, useUserStore } from "@/store";
import { observer } from "mobx-react-lite";
import styles from "./mainPage.module.scss";

export const MainPage = observer(() => {
  const { loading, popularMovies, loadPopularMovies, error } = useMoviesStore();
  const recentStore = useRecentMoviesStore();
  const { user } = useUserStore();

  useEffect(() => {
    document.title = "KINORA - Онлайн-библиотека фильмов";
  }, []);

  useEffect(() => {
    const popularPreset = {
      limit: 10,
      lists: "top10-hd",
    };
    loadPopularMovies(popularPreset);
  }, [loadPopularMovies]);

  useEffect(() => {
    if (user?.uid) {
      recentStore.subscribe(user.uid);
    }
    return () => {
      recentStore.unsubscribeHistory();
    };
  }, [user]);

  return (
    <main className={styles.page}>
      {recentStore.recent.length > 0 && (
        <Section
          title="Вы недавно смотрели"
          icon={<Icon24HistoryBackwardOutline />}
        >
          <MoviesGrid movies={recentStore.recent} gap={20} columns={7} scrollable="mobile" />
        </Section>
      )}

      <Section title="Популярные" icon={<Icon24Fire />}>
        {error ? (
          <ErrorState
            error={error}
            title="Не удалось загрузить популярные фильмы"
            description="Попробуйте перезагрузить страницу"
          />
        ) : (
          <MoviesGrid movies={popularMovies} loading={loading} />
        )}
      </Section>
    </main>
  );
});
