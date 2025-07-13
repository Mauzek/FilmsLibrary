import { Section } from "@/components";
import styles from "./movies.module.scss";
import { Icon24VideoOutline } from "@vkontakte/icons";
import { useMoviesStore } from "@/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { MoviesGrid } from "@/components";
import { useInfiniteScroll } from "@/hooks";

// const mocks = [
//   {
//     id: 8365835,
//     name: null,
//     alternativeName: "Spyder Games",
//     type: "tv-series",
//     typeNumber: 2,
//     year: 2001,
//     description: null,
//     shortDescription: null,
//     status: "completed",
//     rating: {
//       kp: 8.3,
//       imdb: 0,
//       filmCritics: 0,
//       russianFilmCritics: 0,
//       await: 0,
//     },
//     votes: {
//       kp: 0,
//       imdb: 0,
//       filmCritics: 0,
//       russianFilmCritics: 0,
//       await: 0,
//     },
//     movieLength: null,
//     totalSeriesLength: 30,
//     seriesLength: null,
//     ratingMpaa: null,
//     ageRating: null,
//     genres: [
//       {
//         name: "драма",
//       },
//     ],
//     countries: [
//       {
//         name: "США",
//       },
//     ],
//     releaseYears: [
//       {
//         start: 2001,
//         end: 2001,
//       },
//     ],
//     top10: null,
//     top250: null,
//     isSeries: true,
//     ticketsOnSale: false,
//   },
//   {
//     id: 8365836,
//     name: null,
//     alternativeName: "Apt. 2F",
//     type: "tv-series",
//     typeNumber: 2,
//     year: 1997,
//     description: null,
//     shortDescription: null,
//     status: "completed",
//     rating: {
//       kp: 6,
//       imdb: 0,
//       filmCritics: 0,
//       russianFilmCritics: 0,
//       await: 0,
//     },
//     votes: {
//       kp: 0,
//       imdb: 0,
//       filmCritics: 0,
//       russianFilmCritics: 0,
//       await: 0,
//     },
//     movieLength: null,
//     totalSeriesLength: 30,
//     seriesLength: null,
//     ratingMpaa: null,
//     ageRating: null,
//     genres: [
//       {
//         name: "комедия",
//       },
//     ],
//     countries: [
//       {
//         name: "США",
//       },
//     ],
//     releaseYears: [
//       {
//         start: 1997,
//         end: 1997,
//       },
//     ],
//     top10: null,
//     top250: null,
//     isSeries: true,
//     ticketsOnSale: false,
//   },
//   {
//     id: 924778,
//     name: null,
//     alternativeName: "OSS 77: Operazione fior di loto",
//     enName: null,
//     type: "movie",
//     typeNumber: 1,
//     year: 1965,
//     description: null,
//     shortDescription: null,
//     status: null,
//     rating: {
//       kp: 4,
//       imdb: 4.7,
//       filmCritics: 0,
//       russianFilmCritics: 0,
//       await: 0,
//     },
//     votes: {
//       kp: 1,
//       imdb: 26,
//       filmCritics: 0,
//       russianFilmCritics: 0,
//       await: 0,
//     },
//     movieLength: 94,
//     totalSeriesLength: null,
//     seriesLength: null,
//     ratingMpaa: null,
//     ageRating: null,
//     genres: [
//       {
//         name: "приключения",
//       },
//     ],
//     countries: [
//       {
//         name: "Франция",
//       },
//       {
//         name: "Италия",
//       },
//     ],
//     top10: null,
//     top250: null,
//     isSeries: false,
//     ticketsOnSale: false,
//   },
//   {
//     id: 8379982,
//     name: "Легендарный принц: Рождение аристократа",
//     alternativeName: "Aristocratic Birth: Prince of Legend",
//     type: "tv-series",
//     typeNumber: 2,
//     year: 2019,
//     description: null,
//     shortDescription: null,
//     status: "completed",
//     rating: {
//       kp: 0,
//       imdb: 0,
//       filmCritics: 0,
//       russianFilmCritics: 0,
//       await: 0,
//     },
//     votes: {
//       kp: 0,
//       imdb: 0,
//       filmCritics: 0,
//       russianFilmCritics: 0,
//       await: 0,
//     },
//     movieLength: null,
//     totalSeriesLength: null,
//     seriesLength: 22,
//     ratingMpaa: null,
//     ageRating: null,
//     poster: {
//       url: "https://image.openmoviedb.com/kinopoisk-images/10900341/a63dd161-394f-4921-949d-a597f0ee14a7/600x900",
//       previewUrl:
//         "https://image.openmoviedb.com/kinopoisk-images/10900341/a63dd161-394f-4921-949d-a597f0ee14a7/300x450",
//     },
//     genres: [
//       {
//         name: "мелодрама",
//       },
//     ],
//     countries: [
//       {
//         name: "Япония",
//       },
//     ],
//     releaseYears: [
//       {
//         start: 2019,
//         end: 2020,
//       },
//     ],
//     top10: null,
//     top250: null,
//     isSeries: true,
//     ticketsOnSale: false,
//   },
//   {
//     id: 8380490,
//     name: "SPEC: Сага",
//     alternativeName: "SICK'S - Jo no Shou",
//     type: "tv-series",
//     typeNumber: 2,
//     year: 2018,
//     description: null,
//     shortDescription: null,
//     status: "completed",
//     rating: {
//       kp: 0,
//       imdb: 0,
//       filmCritics: 0,
//       russianFilmCritics: 0,
//       await: 0,
//     },
//     votes: {
//       kp: 0,
//       imdb: 0,
//       filmCritics: 0,
//       russianFilmCritics: 0,
//       await: 0,
//     },
//     movieLength: null,
//     totalSeriesLength: null,
//     seriesLength: 2,
//     ratingMpaa: null,
//     ageRating: null,
//     poster: {
//       url: "https://image.openmoviedb.com/kinopoisk-images/10809116/e01761f2-38b4-443e-a4e9-bd48c5794af8/600x900",
//       previewUrl:
//         "https://image.openmoviedb.com/kinopoisk-images/10809116/e01761f2-38b4-443e-a4e9-bd48c5794af8/300x450",
//     },
//     genres: [
//       {
//         name: "детектив",
//       },
//       {
//         name: "фэнтези",
//       },
//       {
//         name: "комедия",
//       },
//     ],
//     countries: [
//       {
//         name: "Япония",
//       },
//     ],
//     releaseYears: [
//       {
//         start: 2018,
//         end: 2018,
//       },
//     ],
//     top10: null,
//     top250: null,
//     isSeries: true,
//     ticketsOnSale: false,
//   },
//   {
//     id: 8365831,
//     name: null,
//     alternativeName: "Julie and Carol at Carnegie Hall",
//     enName: null,
//     type: "movie",
//     typeNumber: 1,
//     year: 1962,
//     description: null,
//     shortDescription: null,
//     status: null,
//     rating: {
//       kp: 0,
//       imdb: 0,
//       filmCritics: 0,
//       russianFilmCritics: 0,
//       await: 0,
//     },
//     votes: {
//       kp: 0,
//       imdb: 0,
//       filmCritics: 0,
//       russianFilmCritics: 0,
//       await: 0,
//     },
//     movieLength: 51,
//     totalSeriesLength: null,
//     seriesLength: null,
//     ratingMpaa: null,
//     ageRating: null,
//     genres: [
//       {
//         name: "документальный",
//       },
//       {
//         name: "комедия",
//       },
//       {
//         name: "музыка",
//       },
//     ],
//     countries: [
//       {
//         name: "США",
//       },
//     ],
//     top10: null,
//     top250: null,
//     isSeries: false,
//     ticketsOnSale: false,
//   },
//   {
//     id: 8380903,
//     name: null,
//     alternativeName: "Raiders of the Stone Ring",
//     enName: null,
//     type: "movie",
//     typeNumber: 1,
//     year: 1968,
//     description: null,
//     shortDescription: null,
//     status: null,
//     rating: {
//       kp: 0,
//       imdb: 0,
//       filmCritics: 0,
//       russianFilmCritics: 0,
//       await: 0,
//     },
//     votes: {
//       kp: 0,
//       imdb: 0,
//       filmCritics: 0,
//       russianFilmCritics: 0,
//       await: 0,
//     },
//     movieLength: 25,
//     totalSeriesLength: null,
//     seriesLength: null,
//     ratingMpaa: null,
//     ageRating: null,
//     genres: [
//       {
//         name: "короткометражка",
//       },
//       {
//         name: "фантастика",
//       },
//       {
//         name: "фэнтези",
//       },
//       {
//         name: "приключения",
//       },
//     ],
//     countries: [
//       {
//         name: "США",
//       },
//     ],
//     top10: null,
//     top250: null,
//     isSeries: false,
//     ticketsOnSale: false,
//   },
// ];

export const MoviesPage = observer(() => {
  const {
    loading,
    movies,
    isLoadingMore,
    isFirstLoad,
    hasMore,
    loadMoreMovies,
    loadMovies,
  } = useMoviesStore();
  
  
  useEffect(() => {
    if (isFirstLoad) {
      loadMovies();
    }
  }, [loadMovies, isFirstLoad]);
  

  useInfiniteScroll({
    hasMore,
    loading: isLoadingMore || loading,
    onLoadMore: loadMoreMovies,
    threshold: 500,
  });

  return (
    <section className={styles.page}>
      <Section title="Фильмы" icon={<Icon24VideoOutline />} isFiltered={true}>
        <MoviesGrid movies={movies} loading={loading} isLoadingMore={isLoadingMore} />
      </Section>
    </section>
  );
});
