import SkeletonLoader from "expo-skeleton-loader";
import { View } from "react-native";

const size = 100;
const FlowerListSkeleton = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <SkeletonLoader>
        <SkeletonLoader.Container style={[{ flex: 1, flexDirection: "row" }]}>
          <SkeletonLoader.Item
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              marginRight: 20,
              backgroundColor: "lightgray",
            }}
          />
          <SkeletonLoader.Container style={{ paddingVertical: 10 }}>
            <SkeletonLoader.Item
              style={{ width: 220, height: 20, marginBottom: 5 }}
            />
            <SkeletonLoader.Item style={{ width: 150, height: 20 }} />
          </SkeletonLoader.Container>
        </SkeletonLoader.Container>
      </SkeletonLoader>
    </View>
  );
};

export default FlowerListSkeleton;
