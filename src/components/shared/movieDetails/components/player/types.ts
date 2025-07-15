export interface PlayerProps {
  kinopoiskId: number;
}

export interface PlayerData {
  id: number;
  content_type: string;
  title: string;
  orig_title: string;
  iframe_src: string;
  translations: Record<string, string>;
}

export interface ApiResponse {
  result: boolean;
  data: PlayerData[];
}

export interface PlayerCollectionData {
  source: string;
  iframeUrl: string;
}

export interface PlayersCollectionData extends PlayerCollectionData {
  success: boolean;
}
