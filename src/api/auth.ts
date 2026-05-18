import axios from "axios";
import { api } from "./client";

export async function logInRequest(login: string, password: string) {
  try {
    const { data } = await api.post("/auth/login", { login, password });

    return {
      ok: true as const,
      jwt: data.token,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to log in:",
        error.response?.status,
        error.response?.data?.error,
      );

      return {
        ok: false as const,
        errorCode: error.response?.data?.error,
      };
    }
  }
}

export async function createAdmin(login: string, password: string) {
  try {
    const { data } = await api.post("/auth/create-admin", { login, password });

    return {
      ok: true as const,
      login: data.login,
    };
  } catch (error) {
    console.error("Failed to create admin:", error);
    return {
      ok: false as const,
      errorCode: true,
    };
  }
}
