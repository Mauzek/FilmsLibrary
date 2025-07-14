import { ErrorState } from "@/components";
import { useEffect } from "react";

export const NotFoundPage = () => {
  useEffect(() => {
    document.title = "Страница не найдена 404 - VK FilmsLib";
  }, []);
  return (
    <main role="main" aria-label="Страница не найдена 404 - VK FilmsLib">
      <ErrorState error="404" />
    </main>
  );
};
