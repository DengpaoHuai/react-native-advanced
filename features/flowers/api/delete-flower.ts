import { apiClient } from "@/lib/api-client";
import { Flower } from "@/types/flowers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const deleteFlower = async (id: string) => {
  await waitFor(2500);
  //throw new Error("Failed to delete flower");
  return await apiClient.delete(`/flowers/${id}`);
};

export const useDeleteFlower = () => {
  const queryClient = useQueryClient();
  const deleteFlowerMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteFlower(id);
    },
    mutationKey: ["flowers"],
    onMutate: (id: string) => {
      const previousFlowers = queryClient.getQueryData(["flowers"]);
      queryClient.setQueryData(["flowers"], (old: Flower[]) => {
        return old.filter((flower: Flower) => flower._id !== id);
      });
      return { previousFlowers };
    },
    onError: (err, variables, context) => {
      if (!context?.previousFlowers) return;
      queryClient.setQueryData(["flowers"], context.previousFlowers);
    },
  });

  return {
    deleteFlower: (id: string) => deleteFlowerMutation.mutateAsync(id),
  };
};
