import { useEffect } from "react";
import { EmptyState, MoviesGrid, Section } from "@/components";
import { Icon28LikeOutline } from "@vkontakte/icons";
import { useFavouriteStore } from "@/store";

export const FavouritePage = () => {
  const { favourites } = useFavouriteStore();

  useEffect(() => {
    document.title = "Избранное на VK FilmsLib";
  }, []);

  return (
    <main>
      <Section title="Избранное" icon={<Icon28LikeOutline />}>
        {favourites.length > 0 ? (
          <MoviesGrid movies={favourites} />
        ) : (
          <EmptyState
            title="Список избранного пуст"
            description="Вы можете добавить фильмы в избранное, чтобы они отображались здесь"
            icon={<Icon28LikeOutline />}
          />
        )}
      </Section>
    </main>
  );
};
