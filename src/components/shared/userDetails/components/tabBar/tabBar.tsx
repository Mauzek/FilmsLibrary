import styles from "../../userDetails.module.scss";
import { TabBarSkeleton } from "./tabBarSkeleton";
import type { TabBarProps } from "./types";

export const TabBar = ({
  tabs,
  activeTab,
  onChange,
  isLoading,
}: TabBarProps) => {
  if (isLoading) return <TabBarSkeleton />;
  return (
    <nav className={styles.userDetails__tabBar}>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`${styles.userDetails__tabItem} ${
            activeTab === tab ? styles["userDetails__tabItem--active"] : ""
          }`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </div>
      ))}
    </nav>
  );
};
