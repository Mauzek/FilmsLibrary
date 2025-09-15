import type { Movie, User } from "@/types";

export interface UserDetailsProps{
    data: User;
    userId: string;
    lists: Record<string, Movie[]>;
    loadingProfile: boolean;
    loadingLists: boolean;
}