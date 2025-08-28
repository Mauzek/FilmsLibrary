export interface SectionProps {
  children: React.ReactNode;
  title: string;
  icon: React.ReactElement;
  isFiltered?: boolean;
  className?: string;
  headerClassName?: string;
}