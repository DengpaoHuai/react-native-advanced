import { router } from "expo-router";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { useFlowers } from "../api/get-flowers";
import FlowerListSkeleton from "./FlowersListSkeleton";

const FlowerList = () => {
  const { data: flowers, isLoading } = useFlowers();

  if (isLoading) {
    return <FlowerListSkeleton></FlowerListSkeleton>;
  }

  return (
    <>
      <View
        style={{
          backgroundColor: "lightblue",
        }}
      >
        <Button
          title="Create a flower"
          onPress={() => {
            router.push("/flowers/create");
          }}
        ></Button>
        <View>
          <FlatList
            data={flowers}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>{item.name}</Text>
                  <Text>{item.description}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      // deleteFlower(item._id);
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#e74c3c",
                        padding: 10,
                        margin: 10,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        Delete
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
      </View>
    </>
  );
};

export default FlowerList;
