import { Suspense, type ComponentType, type ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

interface RouteWrapperProps<T extends Record<string, unknown> = Record<string, never>> {
  Page: ComponentType<T>;
  skeleton?: ReactNode;
  errorComponent?: ComponentType<FallbackProps>;
  errorTitle?: string;
  errorDescription?: string;
}

export function RouteWrapper<T extends Record<string, unknown> = Record<string, never>>({
  Page,
  skeleton,
  errorComponent: ErrorComponent,
  errorTitle,
  errorDescription,
}: RouteWrapperProps<T>) {
  return (
    <ErrorBoundary
      fallbackRender={(fallbackProps) =>
        ErrorComponent ? (
          <ErrorComponent {...fallbackProps} />
        ) : (
          <div style={{ padding: 24 }}>
            <h2>{errorTitle || "Произошла ошибка"}</h2>
            <p>{errorDescription || fallbackProps.error?.message}</p>
          </div>
        )
      }
    >
      <Suspense fallback={skeleton ?? <div>Загрузка страницы...</div>}>
        <Page {...({} as T)} />
      </Suspense>
    </ErrorBoundary>
  );
}
