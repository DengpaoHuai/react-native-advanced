import { apiClient } from "@/lib/api-client";
import { Flower } from "@/types/flowers";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getFlowers = async () => {
  const response = await apiClient.get("/flowers");
  return response.data as Flower[];
};

export const getUsersQueryOptions = () => {
  return queryOptions({
    queryKey: ["flowers"],
    queryFn: getFlowers,
  });
};

export const useFlowers = () => {
  return useQuery({
    ...getUsersQueryOptions(),
  });
};
