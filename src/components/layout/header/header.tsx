import { Link, useLocation } from "react-router-dom";
import { SearchForm } from "@/components";
import styles from "./header.module.scss";
import { images } from "@/assets";
import {
  Icon28HomeOutline,
  Icon28FilmStripOutline,
  Icon28LikeOutline,
  Icon28PlayRectangleStackOutline,
} from "@vkontakte/icons";

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

export const Header = () => {
  const location = useLocation();

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logo}>
          <img
            src={images.logo}
            alt="Logo VK FilmsLib"
            className={styles.header__logoImage}
          />
        </Link>

        <nav
          className={styles.header__nav}
        >
          <ul className={styles.header__navList}>
            {tabs.map((tab) => (
              <li key={tab.path} className={styles.header__navItem}>
                <Link
                  to={tab.path}
                  className={`${styles.header__navLink} ${
                    isActiveLink(tab.path)
                      ? styles["header__navLink--active"]
                      : ""
                  }`}                 
                >
                  {tab.icon} {tab.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.header__search}>
          <SearchForm />
        </div>
      </div>
    </header>
  );
};
