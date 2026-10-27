import { describe, expect, it } from "vitest";
import { FiltersStore } from "@/store/filtersStore";

describe("FiltersStore", () => {
  it("round-trips selected filters through URL parameters", () => {
    const store = new FiltersStore();
    store.setGenres(["драма", "комедия"]);
    store.setCountries(["Россия"]);
    store.setRating([7, 10]);
    store.setYear([2000, 2020]);

    const restored = new FiltersStore();
    restored.deserializeFilters(store.serializeFilters());

    expect(restored.activeFilters).toEqual(store.activeFilters);
    expect(restored.getApiFilters()).toEqual({
      "genres.name": ["драма", "комедия"],
      "countries.name": ["Россия"],
      "rating.kp": "7-10",
      year: "2000-2020",
    });
  });
});
