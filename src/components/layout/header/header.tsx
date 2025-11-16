import { useRef, useEffect } from "react";
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
  const lastScrollRef = useRef<number>(0);
  const prevWidthRef = useRef<string>("100%");

  const isActiveLink = (path: string) => location.pathname === path;

  useEffect(() => {
    if (!containerRef.current || window.innerWidth > 850) return;

    const container = containerRef.current;

    const animate = async () => {
      const { default: gsap } = await import("gsap");
      if (isMobileOpen) {
        prevWidthRef.current = container.getBoundingClientRect().width + "px";
        gsap.to(container, { width: "100%", duration: 0.2, ease: "power2.out" });
      } else {
        gsap.to(container, {
          width: prevWidthRef.current,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    animate();
  }, [isMobileOpen]);

  useEffect(() => {
    if (window.innerWidth > 850 || isMobileOpen) return;
    const container = containerRef.current;
    if (!container) return;

    let gsap: typeof import("gsap").default;

    const loadGsapAndAnimate = async () => {
      const mod = await import("gsap");
      gsap = mod.default;
    };

    const handleScroll = async () => {
      if (!gsap) {
        await loadGsapAndAnimate();
      }

      const scrollTop = window.scrollY;

      if (scrollTop > lastScrollRef.current && scrollTop > 50) {
        gsap.to(container, { width: "40%", duration: 0.5, ease: "power2.out" });
      } else {
        gsap.to(container, {
          width: "100%",
          duration: 0.5,
          ease: "power2.out",
        });
      }

      lastScrollRef.current = scrollTop;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileOpen]);

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
