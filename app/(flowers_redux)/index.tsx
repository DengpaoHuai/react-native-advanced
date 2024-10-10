import { useFlowersRedux } from "@/features/flowers/api/get-flowers-redux";
import FlowerList from "@/features/flowers/components/FlowersList";
import FlowerListSkeleton from "@/features/flowers/components/FlowersListSkeleton";
import { Text } from "react-native";

const FlowersListScreen = () => {
  const { flowers, isLoading, error } = useFlowersRedux();

  if (isLoading) {
    return <FlowerListSkeleton></FlowerListSkeleton>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return <FlowerList />;
};

export default FlowersListScreen;
