import type { User, UserListsStatistics } from "@/types";

export interface HeaderProps {
  user: User;
  isLoading: boolean;
  statistics: UserListsStatistics | null;
}

export interface StatisticsProps {
  statistics: UserListsStatistics;
}

export interface SummaryProps {
  statistics: UserListsStatistics;
  headerColor: string | null;
}
