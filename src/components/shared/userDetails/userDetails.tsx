import { useUserStore } from "@/store";
import { Header, TabBar } from "./components";
import type { UserDetailsProps } from "./types";
import styles from "./userDetails.module.scss";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export const UserDetails = observer(
  ({ data, loadingLists, loadingProfile, lists, userId }: UserDetailsProps) => {
    const { user, clearUser } = useUserStore();
    const isOwner = userId === user?.uid;
    console.log(lists);
    const tabLabels: Record<string, string> = {
      favorites: "Избранное",
      planned: "Запланировано",
      dropped: "Брошено",
      watched: "Просмотрено",
    };

    const tabOrder = ["favorites", "planned", "dropped", "watched"];

    const [activeTab, setActiveTab] = useState<string>("favorites");

    const availableTabs = tabOrder.filter((key) => lists[key]);

    return (
      <div className={styles.userDetails}>
        <Header
          user={data}
          isLoading={loadingProfile}
          isOwner={isOwner}
          clearUser={clearUser}
        />

        <TabBar
          tabs={availableTabs.map((key) => tabLabels[key])}
          activeTab={tabLabels[activeTab]}
          isLoading={loadingLists}
          onChange={(label) => {
            const foundKey = Object.keys(tabLabels).find(
              (k) => tabLabels[k] === label
            );
            if (foundKey) setActiveTab(foundKey);
          }}
        />

        {!loadingLists && activeTab && (
          <div>
            <h3>{tabLabels[activeTab]}</h3>
            {lists[activeTab]?.length ? (
              <ul>
                {lists[activeTab].map((m) => (
                  <li key={m.id}>{m.name}</li>
                ))}
              </ul>
            ) : (
              <p>Нет фильмов</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
