import { apiClient } from "@/lib/api-client";
import { Flower } from "@/types/flowers";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { z } from "zod";

export const flowerSchema = z.object({
  name: z.string().min(3).max(25),
  description: z.string(),
});

export const addFlower = async (data: Omit<Flower, "_id">) => {
  const response = await apiClient.post("/flowers", data);
  return response.data;
};

export const useCreateFlower = () => {
  const mutate = useMutation({
    mutationFn: async (data: Omit<Flower, "_id">) => {
      await addFlower(data);
    },
    mutationKey: ["flowers"],
    onSuccess: () => {
      router.push("/flowers");
    },
  });

  return {
    onSubmit: (data: Omit<Flower, "_id">) => mutate.mutateAsync(data),
  };
};
