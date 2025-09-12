import { Link, useLocation } from "react-router-dom";
import { SearchForm } from "@/components";
import styles from "./header.module.scss";
import { images } from "@/assets";
import {
  Icon28HomeOutline,
  Icon28FilmStripOutline,
  Icon28LikeOutline,
  Icon28PlayRectangleStackOutline,
  Icon28Profile,
} from "@vkontakte/icons";
import { useUserStore } from "@/store";
import { observer } from "mobx-react-lite";

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
    icon: <Icon28PlayRectangleStackOutline />,
    text: "Коллекции",
  },
  {
    path: "/favourite",
    icon: <Icon28LikeOutline />,
    text: "Избранное",
  },
];

export const Header = observer(() => {
  const location = useLocation();
  const { user } = useUserStore();
  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logo}>
          <img
            src={images.logo}
            alt="Logo KINORA"
            className={styles.header__logoImage}
          />
        </Link>

        <nav className={styles.header__nav}>
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
          {user ? (
            <Link
              to={`/user/${user.uid}`}
              className={`${styles.header__profileLink} ${styles.header__navLink}`}
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="User avatar" />
              ) : (
                <Icon28Profile />
              )}
            </Link>
          ) : (
            <Link
              to="/auth"
              className={`${styles.header__profileLink} ${styles.header__navLink}`}
            >
              <Icon28Profile />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
});
