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
  loaded: true,
  setConfig: () => {
    // apiClient.get("/config").then((response) => {});
  },
}));

export { useConfigStore };
