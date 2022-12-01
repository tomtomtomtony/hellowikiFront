import { defineStore } from "pinia";
import { getItemlLocalStorage } from "@/stores/storage";

export const useLoginStore = defineStore("userToken", {
  state: () => {
    return {
      user: getItemlLocalStorage("userAndToken"),
    };
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["userAndToken"],
      },
    ],
  },
  actions: {},
});
