import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://crudcrud.com/api/acfa39ab41c249aaab560cf9b6890b44",
});

fetch("https://crudcrud.com/api/acfa39ab41c249aaab560cf9b6890b44/config", {
  headers: {
    "Content-Type": "application/json",
  },
  method: "POST",
  body: JSON.stringify({
    theme: "dark",
    lang: "en",
    right: "admin",
  }),
});

fetch("https://crudcrud.com/api/acfa39ab41c249aaab560cf9b6890b44/users", {
  headers: {
    "Content-Type": "application/json",
  },
  method: "POST",
  body: JSON.stringify({
    name: "John Doe",
    email: "demo@demo.com",
  }),
});
