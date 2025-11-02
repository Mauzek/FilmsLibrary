import { useEffect } from "react";
import { EmptyState, MoviesGrid, Section } from "@/components";
import { Icon28LikeOutline } from "@vkontakte/icons";
import { useUserStore } from "@/store";

const FavouritePage = () => {
  const { lists } = useUserStore();

  useEffect(() => {
    document.title = "Избранное на KINORA";
  }, []);

  return (
    <main>
      <Section title="Избранное" icon={<Icon28LikeOutline />}>
        {lists.favorites.length > 0 ? (
          <MoviesGrid movies={lists.favorites} />
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

export default FavouritePage;