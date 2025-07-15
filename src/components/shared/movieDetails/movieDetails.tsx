import styles from "./movieDetails.module.scss";
import { useMemo } from "react";
import {
  Backdrop,
  Poster,
  Info,
  Rating,
  Collection,
  PlayersCollection,
} from "./components";
import { MovieDetailsSkeleton } from "./movieDetailsSkeleton";
import { Section, MoviesGrid } from "@/components";
import { Icon24StarsOutline } from "@vkontakte/icons";
import type { MovieDetailsProps } from "./types";
import type { CollectionMovie } from "@/types";

export const MovieDetails = ({ movie, loading = false }: MovieDetailsProps) => {
  const backdropUrl = movie.backdrop?.url
    ? movie.backdrop?.url.replace(/\/orig$/, "/1920x1080")
    : movie.poster?.url;

  const title = movie.name || movie.alternativeName || movie.enName;

  const сurrentCollection = useMemo(() => {
    if (!movie.sequelsAndPrequels) return [];

    const currentMovie: CollectionMovie = {
      id: movie.id,
      name: movie.name,
      alternativeName: movie.alternativeName,
      rating: movie.rating,
      type: movie.type,
      year: movie.year!,
      poster: movie.poster!,
    };

    return [currentMovie, ...movie.sequelsAndPrequels];
  }, [movie]);

  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  return (
    <div className={styles.movieDetails}>
      <Backdrop backdropUrl={backdropUrl} title={title} />

      <div className={styles.movieDetails__content}>
        <section className={styles.movieDetails__header}>
          <div className={styles.movieDetails__leftColumn}>
            <Poster poster={movie.poster} title={title} movie={movie} />
            <Rating
              rating={movie.rating}
              votes={movie.votes}
              className="rating--mobile"
              externalId={{
                kpId: movie.id,
                imdbId: movie.externalId?.imdb,
              }}
            />
          </div>
          <Info movie={movie} />
        </section>
        {movie.sequelsAndPrequels && movie.sequelsAndPrequels?.length > 0 && (
          <Collection
            title="Сиквелы и приквелы"
            collection={сurrentCollection}
          />
        )}
        <PlayersCollection kinopoiskId={movie.id} />
        {movie.similarMovies && movie.similarMovies.length > 0 && (
          <Section title="Похожие фильмы" icon={<Icon24StarsOutline />}>
            <MoviesGrid movies={movie.similarMovies} />
          </Section>
        )}
      </div>
    </div>
  );
};
