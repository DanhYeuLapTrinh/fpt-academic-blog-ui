import axios from "axios";

const baseURL = "https://api.fblog.ngrok.io/"
export default axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type' : 'application/json',
  },
});

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type' : 'application/json',
  },
});