import "./App.scss";
import { Layout } from "@/components";
import { Route, Routes } from "react-router-dom";
import {
  CollectionPage,
  CollectionsPage,
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
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/movies/search" element={<SearchPage />} />
          <Route path="/favourite" element={<FavouritePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:slug" element={<CollectionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
