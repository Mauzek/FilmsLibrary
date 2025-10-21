export interface ListModalProps {
  movieName?: string;
  collectionName: string
  isOpen: boolean;
  isListMovie: boolean;
  handleToggleModal: () => void;
  handleConfirmAction: () => void;
}
