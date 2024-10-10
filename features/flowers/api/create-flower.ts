import { Flower } from "@/types/flowers";
import { router } from "expo-router";
import { z } from "zod";

export const flowerSchema = z.object({
  name: z.string().min(3).max(25),
  description: z.string(),
});

export const useCreateFlower = () => {
  const onSubmit = async (data: Omit<Flower, "_id">) => {
    //  await addFlower(data);
    router.push("/flowers");
  };

  return {
    onSubmit,
  };
};
