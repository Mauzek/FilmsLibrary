import { useEffect, useRef } from "react";
import styles from "./player.module.scss";
import type { PlayerProps } from "./types";

export const Player = ({ kinopoiskId }: PlayerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kinobox.tv/kinobox.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (containerRef.current && (window as any).kbox) {
        (window as any).kbox(containerRef.current, {
          search: { kinopoisk: kinopoiskId },
          menu: { enable: true, default: "menu_button" },
          players: {
            alloha: {
              position: 1
            },
            videocdn:{
              position: 2
            },
            kodik:{
              position: 3
            },
            collaps:{
              position: 4
            }
          },
          params: {
            all: {
              poster: "",
              episode: 1,
              season: 1,
            },
          },
        });
      }
    };

    return () => {
      try {
        document.body.removeChild(script);
      } catch (e) {
        console.error("Error removing script:", e);
      }
    };
  }, [kinopoiskId]);

  return (
    <section className={styles.playerWrapper} id="player">
      <h3 className={styles.playerWrapper__title}>Смотреть онлайн</h3>
      <div
        // ref={containerRef}
        className={`kinobox_player ${styles.playerWrapper__player}`}
      ></div>
    </section>
  );
};
