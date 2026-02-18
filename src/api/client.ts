import axios from "axios";
import qs from "qs";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});
