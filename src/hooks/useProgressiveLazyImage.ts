import { useState, useEffect, useRef } from "react";

const imageCache = new Map<string, boolean>();

export function useProgressiveLazyImage(previewUrl?: string, fullUrl?: string) {
  const ref = useRef<HTMLImageElement | null>(null);

  // 💡 Если full уже загружено — сразу показать его
  const isFullCached = !!(fullUrl && imageCache.get(fullUrl));
  const [imgSrc, setImgSrc] = useState(() =>
    isFullCached ? fullUrl! : ""
  );
  const [isLoaded, setIsLoaded] = useState(isFullCached);

  useEffect(() => {
    // Если полное изображение уже закэшировано, ничего не делаем
    if (isFullCached) return;

    let hasStartedLoading = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasStartedLoading) return;

          hasStartedLoading = true;

          // Сначала грузим превью (если есть)
          if (previewUrl) {
            const previewImg = new Image();
            previewImg.src = previewUrl;
            previewImg.onload = () => {
              // Подставляем превью только если полная версия ещё не загрузилась
              setImgSrc((prev) => (prev === "" ? previewUrl : prev));
            };
          }

          // Затем грузим полное изображение
          if (fullUrl) {
            const fullImg = new Image();
            fullImg.src = fullUrl;
            fullImg.onload = () => {
              imageCache.set(fullUrl, true);
              setImgSrc(fullUrl);
              setIsLoaded(true);
            };
            fullImg.onerror = () => setIsLoaded(true);
          }

          observer.disconnect();
        });
      },
      { rootMargin: "200px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [previewUrl, fullUrl, isFullCached]);

  return { imgSrc, isLoaded, ref };
}
