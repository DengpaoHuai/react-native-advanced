import { apiClient } from "@/lib/api-client";
import { Rigths } from "@/types/rights";
import { create } from "zustand";

type ConfigStore = {
  config: {
    theme: "light" | "dark";
    lang: "fr" | "en";
    right: Rigths;
  };
  loaded: boolean;
  setConfig: () => void;
};

const useConfigStore = create<ConfigStore>((set) => ({
  config: {
    theme: "light",
    lang: "en",
    right: "user",
  },
  loaded: false,
  setConfig: () => {
    apiClient.get("/config").then((response) => {
      set({ config: response.data[1] });
      set({ loaded: true });
    });
  },
}));

export { useConfigStore };
