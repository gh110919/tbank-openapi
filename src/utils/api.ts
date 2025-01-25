import axios from "axios";
import { environment } from "./environment";

const { BASE_URL, API_VERSION } = environment;

export const mainAPI = axios.create({
  baseURL: `${BASE_URL}/${API_VERSION}`,
});
