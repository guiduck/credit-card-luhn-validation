import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/";

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
