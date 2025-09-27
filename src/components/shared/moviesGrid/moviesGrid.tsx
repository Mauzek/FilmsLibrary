import { Grid, MovieCard, MovieCardSkeleton } from "@/components";
import type { MoviesGridProps } from "./types";

export const MoviesGrid = ({
  movies,
  columns,
  gap,
  loading = false,
  isLoadingMore = false,
  className = '',
  scrollable = 'none',
  skeletonCount = 10
}: MoviesGridProps) => {
  const renderSkeletons = () => {
    return Array.from({ length: skeletonCount }, (_, index) => (
      <MovieCardSkeleton key={`skeleton-${index}`} />
    ));
  };

  return (
    <Grid columns={columns} gap={gap} className={className} scrollable={scrollable}>
      {loading && renderSkeletons()}
      {!loading && movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      {isLoadingMore && renderSkeletons()}
    </Grid>
  );
};
