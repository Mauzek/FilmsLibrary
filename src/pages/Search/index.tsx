import { MoviesGrid, Section } from "@/components";
import styles from "./search.module.scss";
import { Icon24Search } from "@vkontakte/icons";
import { useMoviesStore } from "@/store";
import { useEffect } from "react";
import { useInfiniteScroll } from "@/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

export const SearchPage = observer(() => {
  const [searchParams] = useSearchParams();
  const {
    loading,
    movies,
    isLoadingMore,
    hasMore,
    loadMoreMovies,
    searchMovies,
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
    if (query && query.trim()) {
      searchMovies(query.trim());
    } else {
      navigate("/");
    }
  }, [searchParams, searchMovies, navigate, query]);

  return (
    <section className={styles.page}>
      <Section
        title={query ? `Поиск: "${query}"` : "Поиск фильмов"}
        icon={<Icon24Search />}
      >
        <MoviesGrid
          movies={movies}
          loading={loading}
          isLoadingMore={isLoadingMore}
        />
      </Section>
    </section>
  );
});
