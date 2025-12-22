import { useEffect, useState } from "react";
import styles from "./player.module.scss";
import type {
  PlayerCollectionData,
  PlayerProps,
  PlayersCollectionData,
} from "./types";
import axios from "axios";
import { CustomSelect } from "@/components/ui";
import { env } from "@/config";
import { useUserStore } from "@/store";
import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

export const PlayersCollection = observer(({ kinopoiskId }: PlayerProps) => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [players, setPlayers] = useState<PlayersCollectionData[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerCollectionData>({
    type: "",
    iframeUrl: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const playersList = env.playersListUrl;

  useEffect(() => {
    if (!user) return;
    if (!kinopoiskId) return;
    
    const fetchPlayers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${playersList}=${kinopoiskId}`);
        console.log(response.data);
        
        if (response.status === 200 && response.data) {
          const playersData = response.data.data || response.data;
          if (Array.isArray(playersData)) {
            setPlayers(playersData);
            
            if (playersData.length > 0) {
              setSelectedPlayer({
                type: playersData[0].type,
                iframeUrl: playersData[0].iframeUrl,
              });
            }
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
  }, [kinopoiskId, user, playersList]);

  const playerOptions = players
    .filter((player) => player.iframeUrl !== null && player.iframeUrl !== "")
    .map((player) => ({
      value: player.iframeUrl,
      label: player.type, 
    }));

  if (!user) {
    return (
      <section className={styles.playerWrapper} id="player">
        <div className={styles.playerWrapper__header}>
          <h3 className={styles.playerWrapper__title}>Смотреть онлайн</h3>
        </div>
        <div className={styles.playerWrapper__player}>
          <p>Чтобы смотреть фильмы онлайн, войдите в аккаунт</p>
          <button
            onClick={() =>
              navigate(
                `/auth?redirect=${encodeURIComponent(location.pathname)}`
              )
            }
            className={styles.playerWrapper__authButton}
          >
            Войти
          </button>
        </div>
      </section>
    );
  }

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
  
        {!loading && !error && selectedPlayer.iframeUrl && (
          <iframe
            src={selectedPlayer.iframeUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title={`Плеер ${selectedPlayer.type || "видео"}`}
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
});