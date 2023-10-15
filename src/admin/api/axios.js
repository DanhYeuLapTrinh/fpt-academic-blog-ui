import axios from "axios";
export const axiosConfig = axios.create({
  baseURL: "https://api.fblog.ngrok.io/",
  headers: { "Content-Type": "application/json" },
});
