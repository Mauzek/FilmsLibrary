import type { User } from "@/types";

export interface HeaderProps{
    user: User;
    isLoading: boolean;
    isOwner: boolean;
    clearUser: () => void;
}