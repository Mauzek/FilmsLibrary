import { Grid, MovieCard } from "@/components";
import type { MoviesGridProps } from "./types";

export const MoviesGrid = ({ movies, columns, gap }: MoviesGridProps) => {
  return (
    <Grid columns={columns} gap={gap}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Grid>
  );
};
