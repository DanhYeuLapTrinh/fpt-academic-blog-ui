import axios from "axios";

export default axios.create({
  baseURL: "https://api.fblog.ngrok.io/",
  headers: {
    'Content-Type' : 'application/json',
  },
});