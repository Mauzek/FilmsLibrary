import { Modal } from "@/components/ui";
import styles from "./favoriteModal.module.scss";
import type { FavoriteModalProps } from "./types";

export const FavoriteModal = ({
  isOpen,
  isFavouriteMovie,
  handleToggleModal,
  movieName,
  handleConfirmAction,
}: FavoriteModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleToggleModal}
      title={
        isFavouriteMovie ? "Удалить из избранного?" : "Добавить в избранное?"
      }
      closeOnBackdropClick={true}
      closeOnEscape={true}
      className={styles["modal--small"]}
    >
      <div className={styles.modal}>
        <div className={styles.modal__content}>
          <p className={styles.modal__text}>
            {isFavouriteMovie ? (
              <>
                Вы уверены, что хотите удалить <span>{movieName}</span> из
                избранного?
              </>
            ) : (
              <>
                Хотите добавить <span>{movieName}</span> в избранное?
              </>
            )}
          </p>
        </div>

        <div className={styles.modal__actions}>
          <button className={styles.modal__button} onClick={handleToggleModal}>
            Отмена
          </button>
          <button
            className={`${styles.modal__button} ${
              isFavouriteMovie
                ? styles["modal__button--remove"]
                : styles["modal__button--add"]
            }`}
            onClick={handleConfirmAction}
          >
            {isFavouriteMovie ? "Удалить" : "Добавить"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
