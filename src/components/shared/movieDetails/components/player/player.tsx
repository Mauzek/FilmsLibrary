import styles from "./player.module.scss";
import { useEffect, useState } from "react";
import type { PlayerProps, PlayerData, ApiResponse } from "./types";
import axios from "axios";
import { env } from "@/config";

export const Player = ({ kinopoiskId }: PlayerProps) => {
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = env.playerToken;
  const playerUrl = env.playerLumexUrl;

  useEffect(() => {
    const fetchData = async () => {
      if (!kinopoiskId) return;
      setError(null);

      try {
        const response = await axios.get<ApiResponse>(
          `${playerUrl}=${token}&kinopoisk_id=${kinopoiskId}`
        );

        if (!response.data.result) {
          throw new Error("Не удалось получить данные");
        }

        if (!response.data.data || response.data.data.length === 0) {
          throw new Error("Данные не найдены");
        }

        const playerData = response.data.data[0];
        setPlayer(playerData);
      } catch (err) {
        console.error(err);
        setError("Ошибка загрузки плеера " + error);
      }
    };

    fetchData();
  }, [kinopoiskId, token, error]);

  return (
    <section className={styles.playerWrapper} id="player">
      <h3 className={styles.playerWrapper__title}>Смотреть онлайн</h3>
      <div className={styles.playerWrapper__player}>
        {error && (
          <div className={styles.playerWrapper__error}>Ошибка: {error}</div>
        )}
        {player && (
          <iframe
            src={player.iframe_src}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title={`Плеер для ${player.title}`}
          />
        )}
      </div>
    </section>
  );
};
