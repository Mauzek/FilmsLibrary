export interface CollectionsNavigationProps {
  categories: string[];
  activeCategory: string | null;
  onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
};