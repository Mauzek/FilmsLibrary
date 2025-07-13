import { Grid, MovieCard, MovieCardSkeleton } from "@/components";
import type { MoviesGridProps } from "./types";

export const MoviesGrid = ({
  movies,
  columns,
  gap,
  loading = false,
  isLoadingMore = false,
}: MoviesGridProps) => {
  const renderSkeletons = () => {
    return Array.from({ length: 10 }, (_, index) => (
      <MovieCardSkeleton key={`skeleton-${index}`} />
    ));
  };

  return (
    <Grid columns={columns} gap={gap}>
      {loading && renderSkeletons()}
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      {isLoadingMore && renderSkeletons()}
    </Grid>
  );
};
