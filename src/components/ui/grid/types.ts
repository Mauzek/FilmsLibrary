export interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
  scrollable?: 'none' | 'all' | 'mobile' | 'desktop';
}