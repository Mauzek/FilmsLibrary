import { describe, expect, it, vi } from "vitest";
import { api, buildQuery } from "@/api/utils";
import { apiClient } from "@/api/config";

describe("movie API query building", () => {
  it("keeps reserved characters inside one parameter", () => {
    const query = buildQuery({ query: "Love & Death" });

    expect(new URLSearchParams(query).get("query")).toBe("Love & Death");
  });

  it("serializes arrays as repeated parameters", () => {
    const query = buildQuery({ "genres.name": ["драма", "комедия"] });
    const params = new URLSearchParams(query);

    expect(params.getAll("genres.name")).toEqual(["драма", "комедия"]);
  });

  it("adds the poster constraint without malformed separators", async () => {
    const get = vi.spyOn(apiClient, "get").mockResolvedValue({} as never);

    await api.getMovies();

    expect(get).toHaveBeenCalledWith("/movie?notNullFields=poster.url");
  });
});
