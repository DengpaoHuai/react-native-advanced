import FlowerList from "@/features/flowers/components/FlowersList";
import FlowerListSkeleton from "@/features/flowers/components/FlowersListSkeleton";
import { useFlowers } from "@/zustand/useFlowers";

const FlowersListScreen = () => {
  const { isLoading, flowers } = useFlowers();

  if (isLoading) {
    return <FlowerListSkeleton></FlowerListSkeleton>;
  }

  /*if (error) {
    return <Text>{error}</Text>;
  }*/

  return <FlowerList flowers={flowers || []} />;
};

export default FlowersListScreen;
