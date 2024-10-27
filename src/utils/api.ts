import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openai.com/v1/chat",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  },
});

export default api;
