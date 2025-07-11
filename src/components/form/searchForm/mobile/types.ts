export interface MobileSearchFormProps {
  isExpanded: boolean;
  handleToggleExpand: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleClose: () => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  mobileInputRef: React.RefObject<HTMLInputElement>;
}
