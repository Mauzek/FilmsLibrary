import { ErrorState, MoviesGrid, Section } from "@/components";
import { useInfiniteScroll } from "@/hooks";
import { useMoviesStore } from "@/store";
import { Icon24VideoOutline } from "@vkontakte/icons";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import listsData from "@data/lists.json";

export const CollectionPage = observer(() => {
  const { slug } = useParams();
  const {
    loading,
    movies,
    isLoadingMore,
    hasMore,
    loadMoreMovies,
    loadMovies,
    error,
    reset,
  } = useMoviesStore();

  const collection = listsData.collections.find((c) => c.slug === slug);
  if (!collection) {
    return (
      <div>
        <ErrorState
          error="Коллекция не найдена"
          title="Коллекция не найдена"
          description="Возможно, вы ввели неправильный запрос"
        />
      </div>
    );
  }

  useEffect(() => {
    loadMovies({ lists: slug });
    return () => {
      reset();
    };
  }, [slug]);

  useInfiniteScroll({
    hasMore,
    loading: isLoadingMore || loading,
    onLoadMore: loadMoreMovies,
    threshold: 500,
  });

  return (
    <div>
      <Section title={collection.name} icon={<Icon24VideoOutline />}>
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
    </div>
  );
});
