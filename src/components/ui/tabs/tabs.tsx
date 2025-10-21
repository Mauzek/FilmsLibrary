import type { CollectionsNavigationProps } from "./types";
import styles from "./tabs.module.scss";
import { TabsSkeleton } from "./tabsSkeleton";

export const Tabs = ({
  tabs,
  activeTab,
  onSelect,
  className,
  isLoading,
}: CollectionsNavigationProps) => {
  const tabList =  Object.keys(tabs);
  if (isLoading) return <TabsSkeleton className={className} />;
  return (
    <nav className={`${styles.navigation} ${className}`}>
      {tabList.map((tab) => (
        <button
          data-value={tab}
          className={`${styles.navigation__button} ${
            activeTab === tab ? styles["navigation__button--active"] : ""
          }`}
          key={tab}
          onClick={onSelect}
        >
          {tabs[tab]}
        </button>
      ))}
    </nav>
  );
};
