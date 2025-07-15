export interface Option {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  options: Option[];
  value: PlayerData;
  onChange: (value: PlayerData) => void;
  placeholder?: string;
}

export interface PlayerData {
  source: string;
  iframeUrl: string;
}
