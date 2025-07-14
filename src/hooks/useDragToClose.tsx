import { useRef, useCallback, useState } from "react";
import type { UseDragToCloseProps } from "./types";

export const useDragToClose = ({
  onClose,
  threshold = 100,
}: UseDragToCloseProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const startY = useRef(0);
  const currentY = useRef(0);

  const resetDragState = useCallback(() => {
    setDragY(0);
    setIsDragging(false);
    startY.current = 0;
    currentY.current = 0;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;

      currentY.current = e.touches[0].clientY;
      const deltaY = currentY.current - startY.current;

      if (deltaY > 0) {
        setDragY(deltaY);
      }
    },
    [isDragging]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;

    const deltaY = currentY.current - startY.current;

    if (deltaY > threshold) {
      onClose();
    } else {
      setDragY(0);
    }

    setIsDragging(false);
  }, [isDragging, onClose, threshold]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    startY.current = e.clientY;
    currentY.current = e.clientY;
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      currentY.current = e.clientY;
      const deltaY = currentY.current - startY.current;

      if (deltaY > 0) {
        setDragY(deltaY);
      }
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    const deltaY = currentY.current - startY.current;

    if (deltaY > threshold) {
      onClose();
    } else {
      setDragY(0);
    }

    setIsDragging(false);
  }, [isDragging, onClose, threshold]);

  return {
    dragY,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetDragState,
  };
};
