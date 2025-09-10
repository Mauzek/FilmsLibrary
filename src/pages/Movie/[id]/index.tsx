import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/api";
import type { Movie } from "@/types";
import { ErrorState, MovieDetails } from "@/components";
import { useRecentMoviesStore } from "@/store";
import { observer } from "mobx-react-lite";

export const MoviePage = observer(() => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const recentStore = useRecentMoviesStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const res = await api.getMovieById(id!);
        setMovie(res.data);
        recentStore.addToRecentMovies(res.data);
        document.title = `${
          res.data.name ?? res.data.alternativeName
        } на KINORA`;
        const metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescription) {
          metaDescription.setAttribute(
            "content",
            movie
              ? `"${movie.description}"`
              : "Поиск фильмов в библиотеке KINORA"
          );
        }
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, recentStore]);

  return (
    <main
      role="main"
      aria-label={
        movie && movie.name
          ? `Фильм "${movie.name ?? movie.alternativeName}". Описание ${
              movie.description ?? movie.shortDescription
            }`
          : "Страница фильмa"
      }
    >
      {error ? (
        <ErrorState
          error={error}
          title="Фильм не найден"
          description="Возможно, вы ошиблись при вводе адреса или такого фильма не существует"
        />
      ) : loading ? (
        <MovieDetails movie={{} as Movie} loading />
      ) : (
        <MovieDetails movie={movie} loading={loading} />
      )}
    </main>
  );
});
