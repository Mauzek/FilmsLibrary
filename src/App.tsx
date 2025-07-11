import "./App.scss";
import { Layout } from "@/components";
import { Route, Routes } from "react-router-dom";
import {
  FavouritePage,
  MainPage,
  MoviePage,
  MoviesPage,
  NotFoundPage,
  SearchPage,
} from "@/pages";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/movies/search" element={<SearchPage />} />
          <Route path="/favourite" element={<FavouritePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
