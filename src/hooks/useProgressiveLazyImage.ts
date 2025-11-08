import { useState, useEffect, useRef } from "react";

const imageCache = new Map<string, boolean>();

export function useProgressiveLazyImage(previewUrl?: string, fullUrl?: string) {
  const ref = useRef<HTMLImageElement | null>(null);

  const [imgSrc, setImgSrc] = useState(() => {
    if (fullUrl && imageCache.get(fullUrl)) return fullUrl;
    return previewUrl || "";
  });

  const [isLoaded, setIsLoaded] = useState(() => {
    if (fullUrl && imageCache.get(fullUrl)) return true;
    return false;
  });

  useEffect(() => {
    if (!fullUrl || imageCache.get(fullUrl)) return;

    setImgSrc(previewUrl || "");
    setIsLoaded(false);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.src = fullUrl;
            img.onload = () => {
              imageCache.set(fullUrl, true);
              setImgSrc(fullUrl);
              setIsLoaded(true);
            };
            img.onerror = () => setIsLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [previewUrl, fullUrl]);

  return { imgSrc, isLoaded, ref };
}
