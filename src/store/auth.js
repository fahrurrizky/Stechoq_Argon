import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { setCookies, certCookies } from "@/plugins/cookies";

import * as s$auth from "@/services/auth";

export const d$auth = defineStore("auth", () => {
  // initial state
  const user = ref({
    id: undefined,
    name: undefined,
    role: undefined,
  });

  // action
  const setUser = () => {
    try {
      const { id, name, role } = certCookies();

      user.value = {
        id,
        name,
        role,
      };

      return "User Authenticated";
    } catch (error) {
      user.value = {
        id: undefined,
        name: undefined,
        role: undefined,
      };

      throw error;
    }
  };

  const login = async (body) => {
    try {
      const { data } = await s$auth.login(body);
      setCookies("CERT", data.token, { datetime: data.expiresAt });
      return true;
    } catch ({ error, message }) {
      throw error;
    }
  };

  const register = async (body) => {
    try {
      const { data } = await s$auth.register(body);
      return data;
    } catch ({ error, message }) {
      throw error;
    }
  };

  // getter
  const g$user = computed(() => user.value);
  const isLoggedIn = computed(() => !!user.value.id);

  return {
    // action
    setUser,
    login,
    register,

    // getter
    g$user,
    isLoggedIn,
  };
});
