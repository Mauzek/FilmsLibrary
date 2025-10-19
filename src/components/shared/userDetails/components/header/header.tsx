import styles from "./header.module.scss";
import {
  Icon28Profile,
  Icon24PenOutline,
  Icon24DoorArrowRightOutline,
  Icon24ChecksOutline,
  Icon24CancelOutline,
} from "@vkontakte/icons";
import type { HeaderProps } from "./types";
import { HeaderSkeletone } from "./headerSkeletone";
import { logout, updateUserProfile } from "@/services";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store";
import { Statistics } from "./statistics";
import { Summary } from "./summary";
import toast from "react-hot-toast";

export const Header = ({
  user: propsUser,
  isLoading,
  statistics,
}: HeaderProps) => {
  const navigation = useNavigate();
  const { setUser, user: ownerUser, clearUser } = useUserStore();
  const [editMode, setEditMode] = useState(false);
  const inputDisplayName = useRef<HTMLInputElement>(null);
  const [headerColor, setHeaderColor] = useState<string | null>(null);
  const isOwner = propsUser?.uid === ownerUser?.uid;
  const user = isOwner ? ownerUser! : propsUser;

  useEffect(() => {
    if (user) {
      if (inputDisplayName.current) {
        inputDisplayName.current.value = user.displayName ?? "Пользователь";
      }
      setHeaderColor(user.profileColor);
    }
  }, [user]);

  if (isLoading || !statistics) return <HeaderSkeletone />;

  const handleLogout = () => {
    logout();
    clearUser();
    navigation("/auth");
  };

  const handleSaveChanges = async () => {
    const newName =
      inputDisplayName.current?.value?.trim() ||
      user.displayName ||
      "Пользователь";

    const updatedUser = {
      ...user,
      displayName: newName,
      profileColor: headerColor,
      updatedAt: new Date().toISOString(),
    };

    if (newName !== user.displayName || headerColor !== user.profileColor) {
      try {
        await updateUserProfile(updatedUser);
        setUser(updatedUser);
        toast.success("Профиль успешно обновлен!");
      } catch (error) {
        console.error("Ошибка обновления профиля:", error);
        toast.error("Не удалось обновить профиль.");
      }
    }
    setEditMode(false);
  };

  const handleCancelChanges = () => {
    setHeaderColor(user.profileColor ?? null);
    setEditMode(false);
  };

  return (
    <header className={styles.header}>
      <section className={styles.header__main}>
        <div
          className={styles.header__profile}
          style={{
            background: headerColor ?? "#191919cc",
          }}
        >
          <div className={styles.header__avatar}>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName ?? "Пользователь"}
              />
            ) : (
              <Icon28Profile />
            )}
          </div>

          <div className={styles.header__info}>
            {editMode ? (
              <>
                <input
                  id="displayName"
                  ref={inputDisplayName}
                  defaultValue={user.displayName ?? "Пользователь"}
                  className={styles.header__input}
                  maxLength={20}
                />
                <div className={styles.header__containerColorPicker}>
                  <input
                    id="headerColor"
                    name="headerColor"
                    type="color"
                    value={headerColor ?? "#191919"}
                    onChange={(e) => setHeaderColor(e.target.value)}
                    className={styles.header__colorPicker}
                  />
                  <label
                    htmlFor="headerColor"
                    className={styles.header__colorLabel}
                  >
                    Цвет шапки
                  </label>
                </div>
              </>
            ) : (
              <h1 className={styles.header__name}>
                {user.displayName ?? "Пользователь"}
              </h1>
            )}

            {!editMode && (
              <span className={styles.header__date}>
                На сайте с{" "}
                {new Date(user.createdAt).toLocaleDateString("ru-RU")}
              </span>
            )}
            <div className={styles["header__info--backdrop"]} />
          </div>

          {isOwner && !editMode && (
            <button
              className={`${styles.header__button} ${styles["header__button--logout"]}`}
              onClick={handleLogout}
            >
              <Icon24DoorArrowRightOutline />
            </button>
          )}

          {isOwner && (
            <div className={styles.header__tools}>
              <button
                className={styles.header__edit}
                onClick={() =>
                  editMode ? handleSaveChanges() : setEditMode((prev) => !prev)
                }
                title={
                  editMode ? "Сохранить изменения" : "Редактировать профиль"
                }
              >
                {editMode ? <Icon24ChecksOutline /> : <Icon24PenOutline />}
              </button>
              <button
                className={`${styles.header__edit} ${
                  styles["header__edit--cancel"]
                } ${editMode ? styles["header__edit--cancel--visible"] : ""}`}
                onClick={handleCancelChanges}
                title="Отменить изменения"
              >
                <Icon24CancelOutline />
              </button>
            </div>
          )}
        </div>

        <Summary headerColor={headerColor} statistics={statistics} />
      </section>

      <Statistics statistics={statistics} />
    </header>
  );
};
