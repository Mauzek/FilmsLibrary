import { useEffect, useCallback, useState } from "react";
import type { UseModalProps } from "./types";

export const useModal = ({
  isOpen,
  onClose,
  closeOnEscape = true,
  animationDuration = 300,
}: UseModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        onClose();
      }
    },
    [onClose, closeOnEscape]
  );

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, animationDuration]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscape]);

  return {
    isVisible,
    shouldRender,
  };
};
