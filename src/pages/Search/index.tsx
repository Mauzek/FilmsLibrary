import { ErrorState, MoviesGrid, Section } from "@/components";
import { Icon24Search } from "@vkontakte/icons";
import { useMoviesStore } from "@/store";
import { useEffect } from "react";
import { useInfiniteScroll } from "@/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

const SearchPage = observer(() => {
  const [searchParams] = useSearchParams();
  const {
    loading,
    movies,
    isLoadingMore,
    hasMore,
    loadMoreMovies,
    searchMovies,
    error,
  } = useMoviesStore();

  useInfiniteScroll({
    hasMore,
    loading: isLoadingMore,
    onLoadMore: loadMoreMovies,
    threshold: 500,
  });

  const navigate = useNavigate();
  const query = searchParams.get("query");

  useEffect(() => {
    const title = query
      ? `Поиск: "${query}" - KINORA`
      : "Поиск фильмов - KINORA";
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
    if (query && query.trim()) {
      searchMovies(query.trim());
    } else {
      navigate("/");
    }
  }, [searchParams, searchMovies, navigate, query]);

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
          <MoviesGrid movies={movies} loading={loading} />
        )}
      </Section>
    </main>
  );
});

export default SearchPage;