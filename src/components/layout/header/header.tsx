import { useRef, useEffect, useCallback } from "react";
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
import { useUserStore, useSearchStore } from "@/store";
import { observer } from "mobx-react-lite";

const tabs = [
  { path: "/", icon: <Icon28HomeOutline />, text: "Главная" },
  { path: "/movies", icon: <Icon28FilmStripOutline />, text: "Фильмы" },
  {
    path: "/collections",
    icon: <Icon28PlayRectangleStackOutline />,
    text: "Коллекции",
  },
  { path: "/favourite", icon: <Icon28LikeOutline />, text: "Избранное" },
];

export const Header = observer(() => {
  const location = useLocation();
  const { user } = useUserStore();
  const { isMobileOpen } = useSearchStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const headerStateRef = useRef<"expanded" | "collapsed" | "mobile-open">("expanded");
  const gsapRef = useRef<typeof import("gsap").default | null>(null);

  const isActiveLink = (path: string) => location.pathname === path;

  const loadGsap = useCallback(async () => {
    if (!gsapRef.current) {
      const { default: gsap } = await import("gsap");
      gsapRef.current = gsap;
    }
    return gsapRef.current;
  }, []);

  const updateHeader = useCallback(async () => {
    const container = containerRef.current;
    if (!container || window.innerWidth > 850) return;

    const gsap = await loadGsap();

    let targetState: "expanded" | "collapsed" | "mobile-open" = "expanded";
    if (isMobileOpen) {
      targetState = "mobile-open";
    } else if (window.scrollY > 15) {
      targetState = "collapsed";
    } else {
      targetState = "expanded";
    }

    if (headerStateRef.current === targetState) return;
    headerStateRef.current = targetState;

    switch (targetState) {
      case "expanded":
        gsap.to(container, { width: "100%", duration: 0.3, ease: "power2.out" });
        break;
      case "collapsed":
        gsap.to(container, { width: "40%", duration: 0.3, ease: "power2.out" });
        break;
      case "mobile-open":
        gsap.to(container, { width: "100%", duration: 0.2, ease: "power2.out" });
        break;
    }
  }, [isMobileOpen, loadGsap]);

  useEffect(() => {
    updateHeader();
  }, [isMobileOpen, updateHeader]);

  useEffect(() => {
    if (window.innerWidth > 850 || isMobileOpen) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateHeader();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateHeader(); 

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isMobileOpen, updateHeader]);

  return (
    <header className={styles.header}>
      <div ref={containerRef} className={styles.header__container}>
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
