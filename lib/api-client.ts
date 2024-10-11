import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://crudcrud.com/api/3c394a4a766e46eb8f1550fe1045e85a",
});

fetch("https://crudcrud.com/api/3c394a4a766e46eb8f1550fe1045e85a/users", {
  headers: {
    "Content-Type": "application/json",
  },
  method: "POST",
  body: JSON.stringify({
    name: "John Doe",
    email: "demo@demo.com",
  }),
});
