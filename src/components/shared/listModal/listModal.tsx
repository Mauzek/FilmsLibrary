import { Modal } from "@/components/ui";
import styles from "./listModal.module.scss";
import type { ListModalProps } from "./types";

export const ListModal = ({
  isOpen,
  isListMovie,
  handleToggleModal,
  movieName,
  collectionName,
  handleConfirmAction,
}: ListModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleToggleModal}
      title={
        isListMovie ? `Удалить из "${collectionName}"?` : `Добавить в "${collectionName}"?`
      }
      closeOnBackdropClick={true}
      className={styles["modal--small"]}
    >
      <div className={styles.modal}>
        <div className={styles.modal__content}>
          <p className={styles.modal__text}>
            {isListMovie ? (
              <>
                Вы уверены, что хотите удалить <span>{movieName}</span> из списка "{collectionName}"?
              </>
            ) : (
              <>
                Хотите добавить <span>{movieName}</span> в список "{collectionName}"?
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
              isListMovie
                ? styles["modal__button--remove"]
                : styles["modal__button--add"]
            }`}
            onClick={handleConfirmAction}
          >
            {isListMovie ? "Удалить" : "Добавить"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
