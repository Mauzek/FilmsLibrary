import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import { ErrorState, Section, MoviesGrid } from "@/components";
import { Icon24VideoOutline } from "@vkontakte/icons";
import { useMoviesStore, useFiltersStore } from "@/store";
import { useInfiniteScroll } from "@/hooks";

const MoviesPage = observer(() => {
  const [searchParams] = useSearchParams();
  const searchParamsString = searchParams.toString();
  const moviesStore = useMoviesStore();
  const filtersStore = useFiltersStore();

  const {
    loading,
    movies,
    loadingMore,
    loadingMoreError,
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
    const currentSearchParams = new URLSearchParams(searchParamsString);
    filtersStore.deserializeFilters(currentSearchParams);

    const query = currentSearchParams.get("query");
    const apiFilters = filtersStore.getApiFilters();

    if (query && query.trim()) {
      searchMovies(query, apiFilters);
    } else {
      loadMovies(apiFilters);
    }
  }, [filtersStore, loadMovies, searchMovies, searchParamsString]);

  const sentinelRef = useInfiniteScroll({
    hasMore,
    loading: loadingMore || loading,
    onLoadMore: loadMoreMovies,
    disabled: error !== null,
  });

  return (
    <main
      role="main"
      aria-label={
        movies.length > 0
          ? `Найдено фильмов: ${movies.length}. Страница фильмов на KINORA`
          : "Страница фильмов на KINORA"
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
          <>
            <MoviesGrid
              movies={movies}
              loading={loading}
              isLoadingMore={loadingMore}
            />
            {loadingMoreError && (
              <div role="alert">
                <span>Не удалось загрузить ещё фильмы.</span>{" "}
                <button type="button" onClick={loadMoreMovies}>
                  Повторить
                </button>
              </div>
            )}
            {hasMore && (
              <div
                ref={sentinelRef}
                style={{ height: "40px", opacity: 0 }}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </Section>
    </main>
  );
});

export default MoviesPage;