import { ErrorState, MoviesGrid, Section } from "@/components";
import { useInfiniteScroll } from "@/hooks";
import { useMoviesStore } from "@/store";
import { Icon24VideoOutline } from "@vkontakte/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import listsData from "@data/lists.json";

interface GenreType {
  category: string;
  name: string;
  slug: string;
  cover: { url: string; previewUrl: string };
  moviesCount: number;
}

export const CollectionPage = observer(() => {
  const { slug } = useParams<{ slug: string }>();
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

  const genresMap: Record<string, GenreType> = useMemo(() => {
    const map: Record<string, GenreType> = {};
    listsData.collections
      .filter((c) => c.category === "genres")
      .forEach((g) => {
        map[g.slug] = g;
      });
    return map;
  }, []);

  const collection = listsData.collections.find(
    (c) => c.slug === slug && c.category !== "genres"
  );
  const genre = slug ? genresMap[slug] : null;

  if (!collection && !genre) {
    return (
      <div>
        <ErrorState
          error="Коллекция или жанр не найдены"
          title="Ничего не найдено"
          description="Возможно, вы ввели неправильный запрос"
        />
      </div>
    );
  }

  useEffect(() => {
    if (slug === "popular-films" || slug === "popular-series") {
      loadMovies({ lists: slug });
    } else if (genre) {
      loadMovies({
        "genres.name": [genre.name.toLowerCase()],
        sortField: "rating.kp",
        sortType: "-1",
        "votes.kp": "100000-6666666",
      });
    } else if (collection) {
      loadMovies({
        lists: collection.slug,
        sortField: "rating.kp",
        sortType: "-1",
      });
    }

    const title = collection?.name || genre?.name || "Фильмы";
    document.title = `${title} на KINORA`;

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
      <Section
        title={(collection || genre)?.name || ""}
        icon={<Icon24VideoOutline />}
      >
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
