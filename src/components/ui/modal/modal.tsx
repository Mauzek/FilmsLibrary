import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon24Cancel } from "@vkontakte/icons";
import styles from "./modal.module.scss";
import type { ModalProps } from "./types";

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  className = "",
  closeOnBackdropClick = true,
  variant = "center",
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeHandlerRef = useRef<() => void>(() => undefined);
  const titleId = useId();
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) throw new Error("Не найден элемент #modal-root в index.html");

  const [isMobile, setIsMobile] = useState(false);
  const [gsapLib, setGsapLib] = useState<typeof import("gsap") | null>(null);
  const currentVariant = isMobile ? "bottom" : variant;
  const THRESHOLD = 80;
  
  useEffect(() => {
    if (isOpen && !gsapLib) {
      import("gsap").then((mod) => setGsapLib(mod));
    }
  }, [isOpen, gsapLib]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const animateOpen = useCallback(() => {
    if (!modalRef.current || !backdropRef.current || !gsapLib) return;
    const gsap = gsapLib.gsap;

    if (currentVariant === "bottom") gsap.set(modalRef.current, { y: "100%" });
    else if (currentVariant === "center")
      gsap.set(modalRef.current, { scale: 0.9, opacity: 0 });
    else if (currentVariant === "side")
      gsap.set(modalRef.current, { x: "100%" });

    gsap.set(backdropRef.current, { opacity: 0, pointerEvents: "auto" });
    gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });

    if (currentVariant === "bottom") {
      gsap.to(modalRef.current, { y: 0, duration: 0.45, ease: "power3.out" });
    } else if (currentVariant === "center") {
      gsap.to(modalRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
      });
    } else if (currentVariant === "side") {
      gsap.to(modalRef.current, { x: 0, duration: 0.45, ease: "power3.out" });
    }
  }, [currentVariant, gsapLib]);

  const animateClose = useCallback((callback?: () => void) => {
    if (!modalRef.current || !backdropRef.current || !gsapLib) {
      callback?.();
      return;
    }
    const gsap = gsapLib.gsap;

    const closeAnim =
      currentVariant === "bottom"
        ? { y: "115%" }
        : currentVariant === "center"
        ? { scale: 0.9, opacity: 0 }
        : { x: "115%" };

    gsap.to(modalRef.current, {
      ...closeAnim,
      duration: 0.35,
      ease: "power3.inOut",
      onComplete: callback,
    });

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: "power3.inOut",
      pointerEvents: "none",
    });
  }, [currentVariant, gsapLib]);

  useEffect(() => {
    if (isOpen && gsapLib) animateOpen();
    else if (!isOpen && gsapLib) animateClose();
  }, [animateClose, animateOpen, gsapLib, isOpen]);

  useEffect(() => {
    const body = document.body;
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      body.style.overflow = "hidden";
      body.style.paddingRight = `${scrollbarW}px`;
    } else {
      gsapLib?.gsap.delayedCall(0.35, () => {
        body.style.overflow = "";
        body.style.paddingRight = "";
      });
    }

    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [isOpen, gsapLib]);

  useEffect(() => {
    if (currentVariant !== "bottom" || !gsapLib) return;
    const gsap = gsapLib.gsap;

    const modal = modalRef.current;
    const content = modal?.querySelector(`.${styles.modal__content}`) as HTMLElement | null;
    if (!modal || !content) return;

    let startY = 0;
    let deltaY = 0;
    let isDraggingNow = false;
    let startScrollTop = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startScrollTop = content.scrollTop;
      deltaY = 0;
      isDraggingNow = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      deltaY = currentY - startY;

      if (startScrollTop <= 0 && deltaY > 0) {
        e.preventDefault();
        isDraggingNow = true;
        gsap.set(modal, { y: deltaY });
        gsap.set(backdropRef.current, {
          opacity: Math.max(0.3, 1 - deltaY / 300),
        });
      }
    };

    const onTouchEnd = () => {
      if (!isDraggingNow) return;
      if (deltaY > THRESHOLD) animateClose(onClose);
      else {
        gsap.to(modal, { y: 0, duration: 0.4, ease: "power3.out" });
        gsap.to(backdropRef.current, { opacity: 1, duration: 0.3 });
      }
      isDraggingNow = false;
    };

    modal.addEventListener("touchstart", onTouchStart, { passive: false });
    modal.addEventListener("touchmove", onTouchMove, { passive: false });
    modal.addEventListener("touchend", onTouchEnd);

    return () => {
      modal.removeEventListener("touchstart", onTouchStart);
      modal.removeEventListener("touchmove", onTouchMove);
      modal.removeEventListener("touchend", onTouchEnd);
    };
  }, [animateClose, currentVariant, gsapLib, isOpen, onClose]);

  const handleCloseModal = useCallback(
    () => animateClose(onClose),
    [animateClose, onClose]
  );
  closeHandlerRef.current = handleCloseModal;

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const modal = modalRef.current;
    if (!modal) return;

    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusFirstElement = () => {
      const firstFocusable = modal.querySelector<HTMLElement>(focusableSelector);
      (firstFocusable ?? modal).focus();
    };
    focusFirstElement();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeHandlerRef.current();
        return;
      }

      if (event.key !== "Tab") return;
      const focusableElements = Array.from(
        modal.querySelectorAll<HTMLElement>(focusableSelector)
      );
      if (focusableElements.length === 0) {
        event.preventDefault();
        modal.focus();
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocusRef.current && document.contains(previousFocusRef.current)) {
        previousFocusRef.current.focus();
      }
      previousFocusRef.current = null;
    };
  }, [isOpen]);

  const handleClickOutside = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && closeOnBackdropClick) {
        handleCloseModal();
      }
    },
    [closeOnBackdropClick, handleCloseModal]
  );

  if (!isOpen) return null;

  const modalClass = `${styles.modal} ${
    currentVariant === "center"
      ? styles.center
      : currentVariant === "side"
      ? styles.side
      : ""
  } ${className}`;

  const modalContent = (
    <div ref={backdropRef} className={styles.backdrop} onClick={handleClickOutside}>
      <div
        ref={modalRef}
        className={modalClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : "Диалог"}
        tabIndex={-1}
      >
        <button className={styles.modal__close} onClick={handleCloseModal} aria-label="Закрыть">
          <Icon24Cancel width={24} />
        </button>
        {isMobile && <div className={styles.modal__dragHandle} />}
        {title && <h2 id={titleId} className={styles.modal__title}>{title}</h2>}
        <div className={styles.modal__content}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, modalRoot);
};
