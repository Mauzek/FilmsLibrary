import { useEffect, useState } from "react";
import styles from "./player.module.scss";
import type { PlayerCollectionData, PlayerProps, PlayersCollectionData } from "./types";
import axios from "axios";
import { CustomSelect } from "@/components/ui";

export const PlayersCollection = ({ kinopoiskId }: PlayerProps) => {
  const [players, setPlayers] = useState<PlayersCollectionData[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerCollectionData>({ source: "", iframeUrl: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!kinopoiskId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://fbphdplay.top/api/players?kinopoisk=${kinopoiskId}`
        );

        if (response.status === 200 && response.data) {
          setPlayers(response.data);
          if (response.data.length > 0) {
            setSelectedPlayer({
              source: response.data[0].source,
              iframeUrl: response.data[0].iframeUrl,
            });
          }
        }
      } catch (error) {
        console.error("Ошибка загрузки плееров:", error);
        setError("Ошибка при загрузке плееров");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [kinopoiskId]);

  const playerOptions = players
    .filter((player) => player.iframeUrl !== null)
    .map((player) => ({
      value: player.iframeUrl,
      label: player.source,
    }));

  return (
    <section className={styles.playerWrapper} id="player">
      <div className={styles.playerWrapper__header}>
        <h3 className={styles.playerWrapper__title}>Смотреть онлайн</h3>
        {playerOptions.length > 0 && (
          <CustomSelect
            options={playerOptions}
            value={selectedPlayer}
            onChange={setSelectedPlayer}
            placeholder="Выберите плеер"
          />
        )}
      </div>

      <div className={styles.playerWrapper__player}>
        {loading && (
          <div className={styles.playerWrapper__loading}>
            Загрузка плееров...
          </div>
        )}

        {error && (
          <div className={styles.playerWrapper__error}>Ошибка: {error}</div>
        )}
        {selectedPlayer && (
          <iframe
            src={selectedPlayer.iframeUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title={`Плеер ${selectedPlayer.source || "видео"}`}
          />
        )}
        {!loading && !error && players.length === 0 && (
          <div className={styles.playerWrapper__noPlayers}>
            Плееры не найдены для данного фильма
          </div>
        )}
      </div>
    </section>
  );
};
