import { Header } from "./components";
import type { UserDetailsProps } from "./types";
import styles from "./userDetails.module.scss";
import { useCallback, useMemo, useState } from "react";
import { MoviesGrid } from "../moviesGrid";
import { EmptyState, Tabs } from "@/components/ui";
import { Icon56HealthOutline } from "@vkontakte/icons";

export const UserDetails = 
  ({ data, loadingLists, loadingProfile, lists }: UserDetailsProps) => {
    const [activeTab, setActiveTab] = useState<string>("favorites");
    const tabs: Record<string, string> = {
      favorites: "Избранное",
      planned: "В планах",
      dropped: "Брошено",
      watched: "Просмотрено",
    };

    const statistics = useMemo(() => {
      if (loadingLists || !lists) return null;

      const { favorites, planned, dropped, watched } = lists;
      const allCount =
        favorites.length + planned.length + dropped.length + watched.length;
      const maxValue = Math.max(
        favorites.length,
        planned.length,
        dropped.length,
        watched.length
      );
      const safePercent = (count: number) =>
        maxValue > 0 ? (count / maxValue) * 100 : 0;

      return {
        all: allCount,
        favorites: {
          count: favorites.length,
          percent: safePercent(favorites.length),
        },
        planned: {
          count: planned.length,
          percent: safePercent(planned.length),
        },
        dropped: {
          count: dropped.length,
          percent: safePercent(dropped.length),
        },
        watched: {
          count: watched.length,
          percent: safePercent(watched.length),
        },
      };
    }, [lists, loadingLists]);

    const handleSelectCategory = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        const tab = e.currentTarget.dataset.value || "favorites";
        setActiveTab(tab);
      },
      []
    );

    return (
      <div className={styles.userDetails}>
        <Header
          user={data}
          isLoading={loadingProfile}
          statistics={statistics}
        />

        <Tabs
          activeTab={activeTab}
          tabs={tabs}
          isLoading={loadingLists}
          onSelect={handleSelectCategory}
          className={styles.userDetails__tabBar}
        />

        {loadingLists ? (
          <MoviesGrid
            loading
            skeletonCount={7}
            columns={7}
            gap={10}
            movies={[]}
          />
        ) : lists?.[activeTab]?.length ? (
          <MoviesGrid
            movies={lists[activeTab]}
            columns={7}
            gap={10}
            className={styles.userDetails__mobileGrid}
            loading={false}
            skeletonCount={7}
          />
        ) : (
          <EmptyState
            title={`Список "${tabs[activeTab] || activeTab}" пуст`}
            description="Добавьте фильмы, чтобы они отображались здесь"
            icon={<Icon56HealthOutline />}
          />
        )}
      </div>
    );
  }

