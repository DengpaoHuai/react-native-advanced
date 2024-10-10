import FlowerList from "@/features/flowers/components/FlowersList";
import FlowerListSkeleton from "@/features/flowers/components/FlowersListSkeleton";
import { apiClient } from "@/lib/api-client";
import { setAllFlowers } from "@/store/asyncThunk/flowers.thunk";
import { RootState, useAppDispatch } from "@/store/store";
import { useEffect } from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

const FlowersListScreen = () => {
  const dispatch = useAppDispatch();
  const { flowers, isLoading, error } = useSelector(
    (state: RootState) => state.flowers
  );

  useEffect(() => {
    apiClient.get("/flowers").then((response) => {
      dispatch(setAllFlowers());
    });
  }, []);

  if (isLoading) {
    return <FlowerListSkeleton></FlowerListSkeleton>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return <FlowerList flowers={flowers || []} />;
};

export default FlowersListScreen;
