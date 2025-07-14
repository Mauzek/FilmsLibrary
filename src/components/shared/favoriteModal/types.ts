export interface FavoriteModalProps {
  movieName?: string;
  isOpen: boolean;
  isFavouriteMovie: boolean;
  handleToggleModal: () => void;
  handleConfirmAction: () => void;
}
