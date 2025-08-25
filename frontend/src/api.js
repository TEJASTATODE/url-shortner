import axios from "axios";

export const API = axios.create({
  baseURL: "https://url-shortner-20g4.onrender.com/api", // Backend API base URL
});
