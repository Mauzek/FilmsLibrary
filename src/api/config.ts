import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { env } from "@/config";

const instance = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": env.apiKey,
  },
});

const apiClient = setupCache(instance, {
  ttl: 2 * 60 * 1000, 
});

export { apiClient };