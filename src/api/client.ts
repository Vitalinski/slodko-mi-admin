import axios from "axios";
import qs from "qs";
import { useAuthStore } from "@/stores/auth";
import { useToastStore } from "@/stores/toast";
import router from "@/router";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const status = error?.response?.status;

    if (status === 401 && router.currentRoute.value.name !== "LoginPage") {
      const authStore = useAuthStore();
      const toast = useToastStore();

      toast.error("Session expired. Please log in again.");
      authStore.logOut();
    }

    return Promise.reject(error);
  },
);
