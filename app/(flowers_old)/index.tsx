import FlowerList from "@/features/flowers/components/FlowersList";
import FlowerListSkeleton from "@/features/flowers/components/FlowersListSkeleton";
import useFetch from "@/hooks/useFetch";
import { Flower } from "@/types/flowers";
import { ActivityIndicator, Text } from "react-native";

const FlowersListScreen = () => {
  const { data: flowers, loading, error } = useFetch<Flower[]>("/flowers");

  console.log(loading);

  if (loading) {
    return <FlowerListSkeleton></FlowerListSkeleton>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return <FlowerList flowers={flowers || []} />;
};

export default FlowersListScreen;
