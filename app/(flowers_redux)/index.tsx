import FlowerList from "@/features/flowers/components/FlowersList";
import FlowerListSkeleton from "@/features/flowers/components/FlowersListSkeleton";
import { apiClient } from "@/lib/api-client";
import { setAllFlowers } from "@/store/asyncThunk/flowers.thunk";
import { RootState, useAppDispatch } from "@/store/store";
import { Flower } from "@/types/flowers";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

const getFlowers = async () => {
  const response = await apiClient.get("/flowers");
  return response.data;
};

const FlowersListScreen = () => {
  const { data, isLoading, error } = useQuery<Flower[]>({
    queryKey: ["flowers"],
    queryFn: getFlowers,
  });

  if (isLoading) {
    return <FlowerListSkeleton></FlowerListSkeleton>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return <FlowerList flowers={data || []} />;
};

export default FlowersListScreen;
