import axios from "axios";

const api = axios.create({
  baseURL: "https://api-production-6a7f3.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;