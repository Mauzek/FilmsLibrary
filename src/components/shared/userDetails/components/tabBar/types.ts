export interface TabBarProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  isLoading: boolean;
};