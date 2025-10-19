export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  closeOnBackdropClick?: boolean;
  variant?: "center" | "side";
}
