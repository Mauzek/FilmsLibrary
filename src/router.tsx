import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import App from "./App";
import { RouteWrapper } from "./lib";
import { ErrorState } from "./components";
import { MainPageSkeleton } from "./pages/Main/mainPageSkeleton";
import NotFoundPage from "@/pages/NotFound";

const MainPage = lazy(() => import("@/pages/Main"));
const MoviesPage = lazy(() => import("@/pages/Movies"));
const MoviePage = lazy(() => import("@/pages/Movie/[id]"));
const SearchPage = lazy(() => import("@/pages/Search"));
const FavouritePage = lazy(() => import("@/pages/Favourite"));
const CollectionsPage = lazy(() => import("@/pages/Collections"));
const CollectionPage = lazy(() => import("@/pages/Collection/[slug]"));
const AuthPage = lazy(() => import("@/pages/Auth"));
const ProfilePage = lazy(() => import("@/pages/Profile/[id]"));

const PublicRoute = lazy(() => import("@/components/layout/routes/PublicRoute"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
            skeleton={<div style={{ padding: 24 }}>Загрузка фильмов...</div>}
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
            skeleton={<div style={{ padding: 24 }}>Загрузка фильма...</div>}
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
            skeleton={<div style={{ padding: 24 }}>Поиск...</div>}
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
            skeleton={<div style={{ padding: 24 }}>Загрузка избранного...</div>}
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
            skeleton={<div style={{ padding: 24 }}>Загрузка подборок...</div>}
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
            skeleton={<div style={{ padding: 24 }}>Загрузка коллекции...</div>}
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
        element: (
          <RouteWrapper
            Page={PublicRoute}
            skeleton={<div style={{ padding: 24 }}>Загрузка страницы...</div>}
            errorComponent={(props) => (
              <ErrorState
                error={props.error.message}
                title="Ошибка маршрута"
                description="Не удалось загрузить компонент маршрута."
              />
            )}
          />
        ),
        children: [
          {
            path: "/auth",
            element: (
              <RouteWrapper
                Page={AuthPage}
                skeleton={<div style={{ padding: 24 }}>Загрузка авторизации...</div>}
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
            skeleton={<div style={{ padding: 24 }}>Загрузка профиля...</div>}
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
