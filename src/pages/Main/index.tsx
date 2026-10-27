import { useEffect } from "react";
import {
  Carousel,
  ErrorState,
  MoviesGrid,
  MovieSlide,
  Section,
} from "@/components";
import { Icon24Fire, Icon24HistoryBackwardOutline } from "@vkontakte/icons";
import { useMoviesStore, useRecentMoviesStore, useUserStore } from "@/store";
import { observer } from "mobx-react-lite";
import styles from "./mainPage.module.scss";

const MainPage = observer(() => {
  const {
    popularLoading,
    popularMovies,
    popularSlides,
    loadPopularContent,
    popularError,
  } = useMoviesStore();
  const recentStore = useRecentMoviesStore();
  const { user } = useUserStore();

  useEffect(() => {
    document.title = "KINORA - Онлайн-библиотека фильмов";
  }, []);

  useEffect(() => {
    loadPopularContent();
  }, [loadPopularContent]);

  return (
    <main className={styles.page}>
      <Carousel loading={popularLoading}>
        {popularSlides.map((movie) => (
          <MovieSlide key={movie.id} movie={movie} />
        ))}
      </Carousel>

      {user && recentStore.recent.length > 0 && (
        <Section
          title="Вы недавно смотрели"
          icon={<Icon24HistoryBackwardOutline />}
        >
          <MoviesGrid
            movies={recentStore.recent}
            gap={20}
            columns={7}
            scrollable="all"
            skeletonCount={7}
          />
        </Section>
      )}

      <Section title="Популярные" icon={<Icon24Fire />}>
        {popularError ? (
          <ErrorState
            error={popularError}
            title="Не удалось загрузить популярные фильмы"
            description="Попробуйте перезагрузить страницу"
          />
        ) : (
          <MoviesGrid movies={popularMovies} loading={popularLoading} />
        )}
      </Section>
    </main>
  );
});

export default MainPage;
