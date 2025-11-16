import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import { lazy } from "react";
import App from "./App";
import { RouteWrapper } from "./lib";
import { ErrorState } from "./components";
import { MainPageSkeleton } from "./pages/Main/mainPageSkeleton";
import NotFoundPage from "@/pages/NotFound";
import { MoviesPageSkeleton } from "./pages/Movies/moviesPageSkeleton";
import { CollectionPageSkeleton } from "./pages/Collection/[slug]/collectionPageSkeleton";
import { CollectionsPageSkeleton } from "./pages/Collections/collectionsPageSkeleton";
import { FavouritePageSkeleton } from "./pages/Favourite/favouritePageSkeleton";
import { PublicRoute } from "@/components/layout/routes/PublicRoute";
import { AuthPageSkeleton } from "./pages/Auth/authPageSkeleton";
import { SearchPageSkeleton } from "./pages/Search/searchPageSkeleton";
import { ProfilePageSkeleton } from "./pages/Profile/[id]/profilePageSkeleton";
import { MovieDetailsSkeleton } from "./components/shared/movieDetails/movieDetailsSkeleton";
const MainPage = lazy(() => import("@/pages/Main"));
const MoviesPage = lazy(() => import("@/pages/Movies"));
const MoviePage = lazy(() => import("@/pages/Movie/[id]"));
const SearchPage = lazy(() => import("@/pages/Search"));
const FavouritePage = lazy(() => import("@/pages/Favourite"));
const CollectionsPage = lazy(() => import("@/pages/Collections"));
const CollectionPage = lazy(() => import("@/pages/Collection/[slug]"));
const AuthPage = lazy(() => import("@/pages/Auth"));
const ProfilePage = lazy(() => import("@/pages/Profile/[id]"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <>
    <ScrollRestoration/>
    <App /></>,
    children: [
      {
        index: true,
        element: (
          <RouteWrapper
            Page={MainPage}
            skeleton={<MainPageSkeleton />}
            errorComponent={(props) => (
              <ErrorState
                error={props.error.message}
                title="Ошибка загрузки главной страницы"
                description="Не удалось загрузить данные. Попробуйте перезагрузить страницу."
              />
            )}
          />
        ),
      },
      {
        path: "/movies",
        element: (
          <RouteWrapper
            Page={MoviesPage}
            skeleton={<MoviesPageSkeleton />}
            errorComponent={(props) => (
              <ErrorState
                error={props.error.message}
                title="Ошибка загрузки фильмов"
                description="Не удалось загрузить список фильмов."
              />
            )}
          />
        ),
      },
      {
        path: "/movie/:id",
        element: (
          <RouteWrapper
            Page={MoviePage}
            skeleton={<MovieDetailsSkeleton />}
            errorComponent={(props) => (
              <ErrorState
                error={props.error.message}
                title="Ошибка загрузки фильма"
                description="Не удалось загрузить информацию о фильме."
              />
            )}
          />
        ),
      },
      {
        path: "/movies/search",
        element: (
          <RouteWrapper
            Page={SearchPage}
            skeleton={<SearchPageSkeleton />}
            errorComponent={(props) => (
              <ErrorState
                error={props.error.message}
                title="Ошибка поиска"
                description="Не удалось выполнить поиск фильмов."
              />
            )}
          />
        ),
      },
      {
        path: "/favourite",
        element: (
          <RouteWrapper
            Page={FavouritePage}
            skeleton={<FavouritePageSkeleton />}
            errorComponent={(props) => (
              <ErrorState
                error={props.error.message}
                title="Ошибка избранного"
                description="Не удалось загрузить список избранных фильмов."
              />
            )}
          />
        ),
      },
      {
        path: "/collections",
        element: (
          <RouteWrapper
            Page={CollectionsPage}
            skeleton={<CollectionsPageSkeleton />}
            errorComponent={(props) => (
              <ErrorState
                error={props.error.message}
                title="Ошибка загрузки подборок"
                description="Не удалось загрузить список подборок."
              />
            )}
          />
        ),
      },
      {
        path: "/collections/:slug",
        element: (
          <RouteWrapper
            Page={CollectionPage}
            skeleton={<CollectionPageSkeleton />}
            errorComponent={(props) => (
              <ErrorState
                error={props.error.message}
                title="Ошибка коллекции"
                description="Не удалось загрузить выбранную коллекцию."
              />
            )}
          />
        ),
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/auth",
            element: (
              <RouteWrapper
                Page={AuthPage}
                skeleton={<AuthPageSkeleton />}
                errorComponent={(props) => (
                  <ErrorState
                    error={props.error.message}
                    title="Ошибка авторизации"
                    description="Не удалось загрузить страницу входа."
                  />
                )}
              />
            ),
          },
        ],
      },
      {
        path: "/user/:id",
        element: (
          <RouteWrapper
            Page={ProfilePage}
            skeleton={<ProfilePageSkeleton />}
            errorComponent={(props) => (
              <ErrorState
                error={props.error.message}
                title="Ошибка профиля"
                description="Не удалось загрузить страницу пользователя."
              />
            )}
          />
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
