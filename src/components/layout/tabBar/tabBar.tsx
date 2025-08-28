import { Link, useLocation } from "react-router-dom";
import {
  Icon28HomeOutline,
  Icon28FilmStripOutline,
  Icon28LikeOutline,
  Icon28PlayRectangleStackOutline,
} from "@vkontakte/icons";
import styles from "./tabBar.module.scss";

const tabs = [
  {
    path: "/",
    icon: <Icon28HomeOutline />,
    text: "Главная",
  },
  {
    path: "/movies",
    icon: <Icon28FilmStripOutline />,
    text: "Фильмы",
  },
    {
    path: "/collections",
    icon: <Icon28PlayRectangleStackOutline/>,
    text: "Коллекции",
  },
  {
    path: "/favourite",
    icon: <Icon28LikeOutline />,
    text: "Избранное",
  },
];

export const TabBar = () => {
  const location = useLocation();

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={styles.tabBar}>
      <nav className={styles.tabBar__nav}>
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`${styles.tabBar__item} ${
              isActiveLink(tab.path) ? styles["tabBar__item--active"] : ""
            }`}
          >
            <div className={styles.tabBar__icon}>
              {tab.icon}
            </div>
            <span className={styles.tabBar__text}>
              {tab.text}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
