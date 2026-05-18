import { defineStore } from "pinia";
import { useRouter } from "vue-router";

import { logInRequest } from "@/api/auth";
import { useOrdersStore } from "@/stores/orders";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  async function logIn(login: string, password: string) {
    const result = await logInRequest(login, password);

    if (result?.ok && result.jwt) {
      localStorage.setItem("admin_token", result.jwt);
      router.push("/");
      const ordersStore = useOrdersStore();
      ordersStore.loadNewOrdersCount();
    } else {
      return { errorCode: result?.errorCode };
    }
  }

  function logOut() {
    localStorage.removeItem("admin_token");
    router.push("/login");
  }

  return {
    logIn,
    logOut,
  };
});
