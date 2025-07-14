import styles from "./movieDetails.module.scss";
import type { MovieDetailsProps } from "./types";
import { Backdrop, Poster, Info, Rating } from "./components";
import { MovieDetailsSkeleton } from "./movieDetailsSkeleton";
import { Section, MoviesGrid } from "@/components";
import { Icon24StarsOutline } from "@vkontakte/icons";
import { Player } from "./components/player";

export const MovieDetails = ({ movie, loading = false }: MovieDetailsProps) => {
  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  const backdropUrl = movie.backdrop?.url
    ? movie.backdrop?.url.replace(/\/orig$/, "/1920x1080")
    : movie.poster?.url;

  const title = movie.name || movie.alternativeName || movie.enName;

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
        <Player kinopoiskId={movie.id} />
        {movie.similarMovies && movie.similarMovies.length > 0 && (
          <Section title="Похожие фильмы" icon={<Icon24StarsOutline />}>
            <MoviesGrid movies={movie.similarMovies} />
          </Section>
        )}
      </div>
    </div>
  );
};
