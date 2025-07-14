import { Icon64Play } from "@vkontakte/icons";
import styles from "./player.module.scss";


export const Player = () => {
  return (
    <section className={styles.playerWrapper} id="player">
      <h3 className={styles.playerWrapper__title}>Смотреть онлайн</h3>
      <div
        className={`${styles.playerWrapper__player}`}
      ><Icon64Play/></div>
    </section>
  );
};
