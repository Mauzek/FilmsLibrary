import { ErrorState, Section } from "@/components";
import { Icon24VideoOutline } from "@vkontakte/icons";
import { useMoviesStore, useFiltersStore } from "@/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { MoviesGrid } from "@/components";
import { useInfiniteScroll } from "@/hooks";
import { useSearchParams } from "react-router-dom";

export const MoviesPage = observer(() => {
  const [searchParams] = useSearchParams();
  const moviesStore = useMoviesStore();
  const filtersStore = useFiltersStore();

  const {
    loading,
    movies,
    isLoadingMore,
    hasMore,
    loadMoreMovies,
    loadMovies,
    searchMovies,
    error,
  } = moviesStore;

  useEffect(() => {
    document.title = "Фильмы на KINORA";
  }, []);

  useEffect(() => {
    filtersStore.deserializeFilters(searchParams);

    const query = searchParams.get("query");
    const apiFilters = filtersStore.getApiFilters();

    if (query && query.trim()) {
      searchMovies(query, apiFilters);
    } else {
      loadMovies(apiFilters);
    }
  }, [searchParams.toString()]);

  useInfiniteScroll({
    hasMore,
    loading: isLoadingMore || loading,
    onLoadMore: loadMoreMovies,
    threshold: 500,
  });

  return (
    <main
      role="main"
      aria-label={
        movies.length > 0
          ? `Найдео фильмов ${movies.length}. Страница фильмов на VK FilmsLib`
          : "Страница фильмов на VK FilmsLib"
      }
    >
      <Section title="Фильмы" icon={<Icon24VideoOutline />} isFiltered={true}>
        {error ? (
          <ErrorState
            error={error}
            title="Фильмы не найдены"
            description="Возможно, вы ввели неправильный запрос"
          />
        ) : (
          <MoviesGrid
            movies={movies}
            loading={loading}
            isLoadingMore={isLoadingMore}
          />
        )}
      </Section>
    </main>
  );
});
