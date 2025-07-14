import type { CollectionMovie } from "@/types";

export interface CollectionProps {
  title: string;
  defaultOpen?: boolean;
  collection: CollectionMovie[];
}

export interface CollectionItemProps {
  movie: CollectionMovie;
}
