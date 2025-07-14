import { createPortal } from "react-dom";
import { Icon24Cancel } from "@vkontakte/icons";
import styles from "./modal.module.scss";
import type { ModalProps } from "./types";
import { useModal, useDragToClose } from "@/hooks";

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  className = "",
  closeOnBackdropClick = true,
  closeOnEscape = true,
}: ModalProps) => {
  const { isVisible, shouldRender } = useModal({
    isOpen,
    onClose,
    closeOnEscape,
  });

  const {
    dragY,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    resetDragState,
  } = useDragToClose({ onClose });

  if (!isOpen && dragY !== 0) {
    resetDragState();
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  if (!shouldRender) return null;

  const modalContent = (
    <div
      className={`${styles.overlay} ${
        isVisible ? styles["overlay--open"] : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`${styles.modal} ${isVisible ? styles["modal--open"] : ""} ${
          isDragging ? styles["modal--dragging"] : ""
        } ${className}`}
        style={{
          transform: isDragging ? `translateY(${dragY}px)` : undefined,
        }}
      >
        {title && (
          <div
            className={styles.modal__header}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
          >
            <h2 className={styles.modal__title}>{title}</h2>
            <button
              className={styles.modal__closeButton}
              onClick={onClose}
              type="button"
              aria-label="Закрыть"
            >
              <Icon24Cancel />
            </button>
          </div>
        )}
        <div className={styles.modal__content}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
