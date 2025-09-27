import styles from "../../userDetails.module.scss";
import { Icon28Profile } from "@vkontakte/icons";
import type { HeaderProps } from "./types";
import { HeaderSkeletone } from "./headerSkeletone";
import { logout } from "@/services";
import { useNavigate } from "react-router-dom";

export const Header = ({ user, isLoading, isOwner, clearUser }: HeaderProps) => {
  const navigation = useNavigate();
  if (isLoading) return <HeaderSkeletone/>;

    const handleLogout = () => {
        logout();
        clearUser();
        navigation('/auth')
    }

  return (
    <header className={styles.userDetails__header}>
      <div className={styles.userDetails__avatar}>
        {user.photoURL ? (
          <img
            src={user.photoURL ?? "/default-avatar.png"}
            alt={user.displayName ?? "User avatar"}
          />
        ) : (
          <Icon28Profile />
        )}
      </div>

      <div className={styles.userDetails__info}>
        <h1 className={styles.userDetails__name}>
          {user.displayName ?? "Пользователь"}
        </h1>
        <span className={styles.userDetails__date}>
          На сайте с {new Date(user.createdAt).toLocaleDateString("ru-RU")}
        </span>
        {isOwner && (
          <button
            className={`${styles.userDetails__button} ${styles["userDetails__button--logout"]}`}
            onClick={handleLogout}
          >
            Выйти
          </button>
        )}
      </div>
    </header>
  );
};
