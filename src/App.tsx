import "./App.scss";
import { Layout, PublicRoute } from "@/components";
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
import AuthPage from "./pages/Auth";
import ProfilePage from "./pages/Profile/[id]";

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
          <Route element={<PublicRoute />}>
            <Route path="/auth" element={<AuthPage />} />
          </Route>
          <Route path="/user/:id" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
