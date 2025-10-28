import { ErrorState } from "@/components";
import { useEffect } from "react";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "Страница не найдена 404 - KINORA";
  }, []);
  return (
    <main role="main" aria-label="Страница не найдена 404 - KINORA">
      <ErrorState error="404" />
    </main>
  );
};

export default NotFoundPage;