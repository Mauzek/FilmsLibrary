import { useUserStore } from "@/store";
import { Header } from "./components";
import type { UserDetailsProps } from "./types";
import styles from "./userDetails.module.scss";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { MoviesGrid } from "../moviesGrid";
import { Tabs } from "@/components/ui";

export const UserDetails = observer(
  ({ data, loadingLists, loadingProfile, lists, userId }: UserDetailsProps) => {
    const { user, clearUser } = useUserStore();
    const [activeTab, setActiveTab] = useState<string>("favorites");
    const isOwner = userId === user?.uid;

    const tabs: Record<string, string> = {
      favorites: "Избранное",
      planned: "Запланировано",
      dropped: "Брошено",
      watched: "Просмотрено",
    };

    const handleSelectCategory = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        const tab = e.currentTarget.dataset.value || "favorites";
        setActiveTab(tab);
      }, []);

    return (
      <div className={styles.userDetails}>
        <Header
          user={data}
          isLoading={loadingProfile}
          isOwner={isOwner}
          clearUser={clearUser}
        />

        <Tabs
          activeTab={activeTab}
          tabs={tabs}
          isLoading={loadingLists}
          onSelect={handleSelectCategory}
          className={styles.userDetails__tabBar}
        />

        {activeTab && (
          <MoviesGrid
            movies={lists[activeTab]}
            columns={7}
            gap={10}
            className={styles.userDetails__mobileGrid}
            loading={loadingLists}
            skeletonCount={7}
          />
        )}
      </div>
    );
  }
);
