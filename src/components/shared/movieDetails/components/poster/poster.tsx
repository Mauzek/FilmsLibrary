import styles from "./poster.module.scss";
import type { PosterProps } from "./types";
import { Icon24LikeOutline, Icon24Like } from "@vkontakte/icons";
import { images } from "@/assets";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useFavouriteStore } from "@/store";
import { FavoriteModal } from "@/components/shared/favoriteModal";

export const Poster = observer(
  ({ poster, title, movie }: PosterProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const favouriteStore = useFavouriteStore();

    const posterUrl = poster?.url ?? poster?.previewUrl ?? images.noPoster;
    const isFavouriteMovie = favouriteStore.isFavourite(movie);

    const handleToggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const handleConfirmAction = () => {
      if (isFavouriteMovie) {
        favouriteStore.removeFromFavourites(movie);
      } else {
        favouriteStore.addToFavourites(movie);
      }
      setIsModalOpen(false);
    };

    return (
      <div className={styles.posterWrapper}>
        <img
          src={posterUrl}
          alt={title ? `${title} poster` : "Movie poster"}
          className={styles.posterWrapper__poster}
        />
        <button
          className={`${styles.posterWrapper__likeButton} ${
            isFavouriteMovie ? styles["posterWrapper__likeButton--active"] : ""
          }`}
          onClick={handleToggleModal}
          aria-label={
            isFavouriteMovie ? "Убрать из избранного" : "Добавить в избранное"
          }
        >
          {isFavouriteMovie ? <Icon24Like /> : <Icon24LikeOutline />}
        </button>
        <a href="#player" className={styles.posterWrapper__link}>
          Смотреть
        </a>

        <FavoriteModal
          handleConfirmAction={handleConfirmAction}
          isOpen={isModalOpen}
          handleToggleModal={handleToggleModal}
          isFavouriteMovie={isFavouriteMovie}
          movieName={title}
        />
      </div>
    );
  }
);
