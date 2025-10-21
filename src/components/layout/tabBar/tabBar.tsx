import { Link, useLocation } from "react-router-dom";
import {
  Icon28HomeOutline,
  Icon28FilmStripOutline,
  Icon28LikeOutline,
  Icon28PlayRectangleStackOutline,
  Icon28Profile,
} from "@vkontakte/icons";
import styles from "./tabBar.module.scss";
import { useUserStore } from "@/store";
import { observer } from "mobx-react-lite";

interface Tab {
  path: string;
  icon: React.ReactNode;
  isProfile?: boolean;
}

const tabs = [
  {
    path: "/",
    icon: <Icon28HomeOutline />,
  },
  {
    path: "/movies",
    icon: <Icon28FilmStripOutline />,
  },
  {
    path: "/auth",
    icon: <Icon28Profile />,
    isProfile: true,
  },
  {
    path: "/collections",
    icon: <Icon28PlayRectangleStackOutline />,
  },
  {
    path: "/favourite",
    icon: <Icon28LikeOutline />,
  },
];

export const TabBar = observer(() => {
  const location = useLocation();
  const {user} = useUserStore();

  const isActiveLink = (tab: Tab) => {
    if (tab?.isProfile) {
      return location.pathname === "/auth" || location.pathname.startsWith("/user/");
    }
    return location.pathname === tab.path;
  };

  const getLinkTo = (tab: Tab) => {
    if (tab.isProfile) {
      return user ? `/user/${user.uid}` : "/auth";
    }
    return tab.path;
  };

  const getIcon = (tab: Tab) => {
    if (tab.isProfile && user && user.photoURL) {
      return (
        <img
          src={user.photoURL}
          alt="User avatar"
          className={styles.tabBar__avatar}
        />
      );
    }
    return tab.icon;
  };

  return (
    <div className={styles.tabBar}>
      <nav className={styles.tabBar__nav}>
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={getLinkTo(tab)}
            className={`${styles.tabBar__item} ${
              isActiveLink(tab) ? styles["tabBar__item--active"] : ""
            }`}
          >
            <div className={styles.tabBar__icon}>{getIcon(tab)}</div>
          </Link>
        ))}
      </nav>
    </div>
  );
});
