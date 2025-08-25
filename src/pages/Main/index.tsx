import { useEffect } from "react";
import { ErrorState, MoviesGrid, Section } from "@/components";
import { Icon24Fire, Icon24HistoryBackwardOutline } from "@vkontakte/icons";
import { useMoviesStore, useRecentMoviesStore } from "@/store";
import { observer } from "mobx-react-lite";
import styles from "./mainPage.module.scss";

export const MainPage = observer(() => {
  const { loading, popularMovies, loadPopularMovies, error } = useMoviesStore();
  const { recent } = useRecentMoviesStore();

  useEffect(() => {
    document.title = "VK FilmsLib - Онлайн-библиотека фильмов";
  }, []);

  useEffect(() => {
    const popularPreset = {
      limit: 10,
      "lists": "top10-hd"
    };
    loadPopularMovies(popularPreset);
  }, [loadPopularMovies]);

  return (
    <main className={styles.page}>
      {recent.length > 0 && (
        <Section
          title="Вы недавно смотрели"
          icon={<Icon24HistoryBackwardOutline />}
        >
          <MoviesGrid movies={recent} gap={20} columns={7} />
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
          <MoviesGrid movies={popularMovies.slice(0, 10)} loading={loading} />
        )}
      </Section>
    </main>
  );
});
