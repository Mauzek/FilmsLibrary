import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Movie } from "@/types";

vi.mock("@/api", () => ({
  api: {
    getMovies: vi.fn(),
    searchMovies: vi.fn(),
  },
}));

import { api } from "@/api";
import { MoviesStore } from "@/store/moviesStore";

const movie = (id: number) => ({ id } as Movie);
const response = (docs: Movie[], page: number, pages = 2) => ({
  data: { docs, page, pages, total: pages * docs.length },
});

describe("MoviesStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses the search endpoint for every search page", async () => {
    vi.mocked(api.searchMovies)
      .mockResolvedValueOnce(response([movie(1)], 1))
      .mockResolvedValueOnce(response([movie(2)], 2));

    const store = new MoviesStore();
    await store.searchMovies("Love & Death");
    await store.loadMoreMovies();

    expect(api.getMovies).not.toHaveBeenCalled();
    expect(api.searchMovies).toHaveBeenNthCalledWith(
      2,
      "Love & Death",
      expect.objectContaining({ page: 2 })
    );
    expect(store.movies.map(({ id }) => id)).toEqual([1, 2]);
  });

  it("ignores a response from an older catalog request", async () => {
    const pending: Array<{
      resolve: (value: ReturnType<typeof response>) => void;
    }> = [];
    vi.mocked(api.getMovies).mockImplementation(
      () => new Promise((resolve) => pending.push({ resolve }))
    );

    const store = new MoviesStore();
    const oldRequest = store.loadMovies({ year: "2000-2000" });
    const currentRequest = store.loadMovies({ year: "2020-2020" });

    pending[1].resolve(response([movie(2020)], 1, 1));
    await currentRequest;
    pending[0].resolve(response([movie(2000)], 1, 1));
    await oldRequest;

    expect(store.movies.map(({ id }) => id)).toEqual([2020]);
  });

  it("exposes a load-more failure and supports retry", async () => {
    vi.mocked(api.getMovies)
      .mockResolvedValueOnce(response([movie(1)], 1))
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(response([movie(2)], 2));

    const store = new MoviesStore();
    await store.loadMovies();
    await store.loadMoreMovies();

    expect(store.loadingMoreError).toBe("offline");
    await store.loadMoreMovies();

    expect(store.loadingMoreError).toBeNull();
    expect(store.movies.map(({ id }) => id)).toEqual([1, 2]);
    expect(store.hasMore).toBe(false);
  });
});
