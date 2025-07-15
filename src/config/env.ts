export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  apiKey: import.meta.env.VITE_API_TOKEN,
  playerToken: import.meta.env.VITE_PLAYER_TOKEN,
} as const;
