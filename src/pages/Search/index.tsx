import { ErrorState, MoviesGrid, Section } from "@/components";
import { Icon24Search } from "@vkontakte/icons";
import { useMoviesStore } from "@/store";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useInfiniteScroll } from "@/hooks";

const SearchPage = observer(() => {
  const [searchParams] = useSearchParams();
  const moviesStore = useMoviesStore();
  const {
    loading,
    movies,
    loadingMore,
    hasMore,
    loadMoreMovies,
    searchMovies,
    error,
  } = moviesStore;

  const navigate = useNavigate();
  const query = searchParams.get("query")?.trim() || "";

  const sentinelRef = useInfiniteScroll({
    hasMore,
    loading: loadingMore || loading,
    onLoadMore: loadMoreMovies,
    disabled: !!error,
  });

  useEffect(() => {
    const title = query ? `Поиск: "${query}" - KINORA` : "Поиск фильмов - KINORA";
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        query
          ? `Результаты поиска фильмов по запросу "${query}"`
          : "Поиск фильмов в библиотеке KINORA"
      );
    }
  }, [query]);

  useEffect(() => {
    if (!query) {
      navigate("/");
    } else {
      searchMovies(query);
    }
  }, [query, searchMovies, navigate]);

  return (
    <main
      role="main"
      aria-label={
        query ? `Результаты поиска для "${query}"` : "Страница поиска фильмов"
      }
    >
      <Section
        title={query ? `Поиск: "${query}"` : "Поиск фильмов"}
        icon={<Icon24Search />}
      >
        {error ? (
          <ErrorState
            error={error}
            title="Ничего не найдено"
            description="Возможно вы ввели неправильное название, попробуйте изменить запрос и повторить поиск"
          />
        ) : (
          <>
            <MoviesGrid
              movies={movies}
              loading={loading}
              isLoadingMore={loadingMore}
            />
            {hasMore && (
              <div
                ref={sentinelRef}
                style={{ height: 40, opacity: 0 }}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </Section>
    </main>
  );
});

export default SearchPage;
