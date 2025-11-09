import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { StoreProvider } from "./store-provider.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </StrictMode>
);

  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('[SW] Registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('[SW] Registration failed:', error);
        });
    });
  }
