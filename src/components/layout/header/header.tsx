import { Link, useLocation } from "react-router-dom";
import { SearchForm } from "@/components";
import styles from "./header.module.scss";
import { useState } from "react";
import { images } from "@/assets";
import {
  Icon28HomeOutline,
  Icon28FilmStripOutline,
  Icon28LikeOutline,
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
    path: "/favourite",
    icon: <Icon28LikeOutline />,
    text: "Избранное",
  },
];

export const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
          className={`${styles.header__nav} ${
            isMobileMenuOpen ? styles["header__nav--open"] : ""
          }`}
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
                  onClick={
                    isMobileMenuOpen
                      ? () => setIsMobileMenuOpen(false)
                      : undefined
                  }
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

        <button
          className={`${styles.header__burger} ${
            isMobileMenuOpen ? styles["header__burger--active"] : ""
          }`}
          onClick={toggleMobileMenu}
          aria-label="Меню"
        >
          <span className={styles.header__burgerLine}></span>
          <span className={styles.header__burgerLine}></span>
          <span className={styles.header__burgerLine}></span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className={styles.header__overlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};
