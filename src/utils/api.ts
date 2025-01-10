import axios from "axios";

export const mainAPI = axios.create({
  baseURL: "https://rest-api-test.tinkoff.ru",
  withCredentials: true,
});
