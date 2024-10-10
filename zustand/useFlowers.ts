import { apiClient } from "@/lib/api-client";
import { Flower } from "@/types/flowers";
import { useEffect, useState } from "react";
import { create } from "zustand";

type FlowersStore = {
  flowers: Flower[];
  setFlowers: (flowers: Flower[]) => void;
  addFlower: (flower: Flower) => void;
  deleteFlower: (id: string) => void;
};

const useFlowersStore = create<FlowersStore>((set) => ({
  flowers: [],
  setFlowers: (flowers: Flower[]) => set({ flowers }),
  addFlower: (flower: Flower) =>
    set((state) => ({ flowers: [...state.flowers, flower] })),
  deleteFlower: (id: string) =>
    set((state) => ({
      flowers: state.flowers.filter((flower) => flower._id !== id),
    })),
}));

const useFlowers = () => {
  const { setFlowers, flowers, ...rest } = useFlowersStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setIsLoading(true);
    apiClient.get("/flowers").then((response) => {
      setFlowers(response.data);
      setIsLoading(false);
    });
  }, []);

  const addFlower = async (flower: Omit<Flower, "_id">) => {
    const response = await apiClient.post("/flowers", flower);
    rest.addFlower(response.data);
  };

  const deleteFlower = async (id: string) => {
    await apiClient.delete(`/flowers/${id}`);
    rest.deleteFlower(id);
  };

  return {
    flowers,
    addFlower,
    deleteFlower,
    isLoading,
  };
};

export { useFlowersStore, useFlowers };
