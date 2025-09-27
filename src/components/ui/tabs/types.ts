export interface CollectionsNavigationProps {
  tabs: Record<string, string>;
  activeTab: string | null;
  onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isLoading?: boolean;
};