import styles from "./poster.module.scss";
import type { PosterProps } from "./types";
import { Icon24AddOutline, Icon24ChecksOutline } from "@vkontakte/icons";
import { images } from "@/assets";
import { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { ListModal } from "@/components/shared/listModal";
import {
  setMovieList,
  getMovieList,
  removeMovie,
  type ListType,
} from "@services/firebase";
import { useUserStore } from "@/store";
import { toast } from "react-hot-toast";

const LISTS: { key: ListType; label: string }[] = [
  { key: "favorites", label: "Избранное" },
  { key: "watched", label: "Просмотрено" },
  { key: "planned", label: "В планах" },
  { key: "dropped", label: "Брошено" },
];

export const Poster = observer(({ poster, title, movie }: PosterProps) => {
  const { user, addMovieToList, removeMovieFromList } = useUserStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [activeList, setActiveList] = useState<ListType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentList, setCurrentList] = useState<{
    key: ListType;
    label: string;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const posterUrl = poster?.url ?? poster?.previewUrl ?? images.noPoster;

  useEffect(() => {
    if (!user) return;
    (async () => {
      const list = await getMovieList(movie.id);
      setActiveList(list);
    })();
  }, [movie.id, user]);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    if (isDropdownOpen) setShowOptions(false);
  };

  const handleShowOptions = () => {
    setShowOptions(true);
  };

  const handleOpenModal = (list: { key: ListType; label: string }) => {
    setCurrentList(list);
    setIsModalOpen(true);
  };

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleConfirmAction = async () => {
    if (!currentList) return;

    try {
      if (activeList === currentList.key) {
        await removeMovie(movie.id);
        setActiveList(null);
        removeMovieFromList(currentList.key, movie.id);
        toast.success(`Удалено из списка "${currentList.label}"`);
      } else {
        await setMovieList(movie, currentList.key);
        setActiveList(currentList.key);
        addMovieToList(currentList.key, movie);
        toast.success(`Добавлено в список "${currentList.label}"`);
      }
    } catch (err) {
      console.error("Ошибка при обновлении списка:", err);
      toast.error("Не удалось обновить список. Попробуйте снова.");
    } finally {
      setIsDropdownOpen(false);
      setShowOptions(false);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeListLabel = LISTS.find((l) => l.key === activeList)?.label;

  return (
    <div className={styles.posterWrapper}>
      <img
        src={posterUrl}
        alt={title ? `${title} poster` : "Movie poster"}
        className={styles.posterWrapper__poster}
      />

      <div className={styles.posterWrapper__likeWrapper}>
        {user && (
          <button
            className={`${styles.posterWrapper__likeButton} ${
              activeList
                ? styles[`posterWrapper__likeButton--${activeList}`]
                : ""
            } ${
              isDropdownOpen ? styles["posterWrapper__likeButton--open"] : ""
            }`}
            onClick={handleToggleDropdown}
          >
            {activeList ? <Icon24ChecksOutline /> : <Icon24AddOutline />}
          </button>
        )}

        <div
          ref={dropdownRef}
          className={`${styles.posterWrapper__dropDown} ${
            isDropdownOpen ? styles["posterWrapper__dropDown--open"] : ""
          }`}
        >
          {!showOptions ? (
            <button
              className={`${styles.posterWrapper__mainAction} ${
                styles[`posterWrapper__mainAction--${activeList}`]
              }`}
              onClick={handleShowOptions}
            >
              {activeList ? `В "${activeListLabel}"` : "Добавить в список"}
            </button>
          ) : (
            <div
              className={`${styles.posterWrapper__options} ${
                showOptions ? styles["posterWrapper__options--visible"] : ""
              }`}
            >
              {LISTS.map((list) => (
                <button
                  key={list.key}
                  className={
                    activeList === list.key
                      ? styles[`posterWrapper__options--${activeList}`]
                      : ""
                  }
                  onClick={() => handleOpenModal(list)}
                >
                  {list.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <a href="#player" className={styles.posterWrapper__link}>
        Смотреть
      </a>

      {currentList && (
        <ListModal
          handleConfirmAction={handleConfirmAction}
          isOpen={isModalOpen}
          handleToggleModal={handleToggleModal}
          isListMovie={activeList === currentList.key}
          movieName={title}
          collectionName={currentList.label}
        />
      )}
    </div>
  );
});
