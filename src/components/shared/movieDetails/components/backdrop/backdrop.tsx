import styles from "./backdrop.module.scss";
import type { BackdropProps } from "./types";

export const Backdrop = ({ backdropUrl, title }: BackdropProps) => {
  if (!backdropUrl) return null;

  return (
    <div
      className={styles.backdrop}
      style={{
        backgroundImage: `url(${backdropUrl})`,
      }}
      role="img"
      aria-label={title ? `${title} backdrop` : "Movie backdrop"}
    />
  );
};
