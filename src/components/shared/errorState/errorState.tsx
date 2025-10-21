import type { ErrorStateProps } from "./types";
import { EmptyState } from "@/components/ui";
import {
  Icon24SadFaceOutline,
  Icon28ClockCircleDashedOutline,
  Icon28ErrorCircleOutline,
  Icon16WifiOutline,
} from "@vkontakte/icons";

export const ErrorState = ({ error, title, description }: ErrorStateProps) => {
  if (!error || typeof error !== "string") {
    return (
      <EmptyState
        title="Произошла ошибка"
        description="Что-то пошло не так. Попробуйте перезагрузить страницу"
        icon={<Icon24SadFaceOutline />}
      />
    );
  }

  const errorCode = error.slice(-3);

  switch (errorCode) {
    case "400":
      return (
        <EmptyState
          title={title || "Неверный запрос"}
          description={description || "Проверьте правильность введенных данных"}
          icon={<Icon24SadFaceOutline />}
        />
      );

    case "404":
      return (
        <EmptyState
          title="Страница не найдена"
          description="Попробуйте перезагрузить страницу или вернуться на главную"
          icon={<Icon24SadFaceOutline />}
        />
      );

    case "403":
      return (
        <EmptyState
          title="Похоже закончились токены"
          description="Вы можете воспользоваться KINORA позже"
          icon={<Icon28ClockCircleDashedOutline />}
        />
      );

    case "500":
      return (
        <EmptyState
          title="Ошибка сервера"
          description="Произошла внутренняя ошибка сервера. Попробуйте позже"
          icon={<Icon28ErrorCircleOutline />}
        />
      );

    default:
      if (
        error.toLowerCase().includes("network") ||
        error.toLowerCase().includes("connection")
      ) {
        return (
          <EmptyState
            title="Проблемы с подключением"
            description="Проверьте интернет-соединение и попробуйте снова"
            icon={<Icon16WifiOutline />}
          />
        );
      }

      return (
        <EmptyState
          title={title || "Произошла ошибка"}
          description={
            description ||
            "Что-то пошло не так. Попробуйте перезагрузить страницу"
          }
          icon={<Icon24SadFaceOutline />}
        />
      );
  }
};
