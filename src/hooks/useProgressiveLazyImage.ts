import { useState, useEffect, useRef } from "react";

const imageCache = new Map<string, boolean>();

export function useProgressiveLazyImage(previewUrl?: string, fullUrl?: string) {
  const ref = useRef<HTMLImageElement | null>(null);

  const isFullCached = !!(fullUrl && imageCache.get(fullUrl));
  const [imgSrc, setImgSrc] = useState(() =>
    isFullCached ? fullUrl! : null
  );
  const [isLoaded, setIsLoaded] = useState(isFullCached);

  useEffect(() => {
    if (isFullCached) return;

    let hasStartedLoading = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasStartedLoading) return;

          hasStartedLoading = true;

          if (previewUrl) {
            const previewImg = new Image();
            previewImg.src = previewUrl;
            previewImg.onload = () => {
              setImgSrc((prev) => (prev === null ? previewUrl : prev));
            };
          }

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
