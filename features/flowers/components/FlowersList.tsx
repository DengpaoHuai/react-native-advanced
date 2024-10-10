import { Flower } from "@/types/flowers";
import { useFlowers, useFlowersStore } from "@/zustand/useFlowers";
import { router } from "expo-router";
import { FC } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";

type FlowerListProps = {
  flowers: Flower[];
};

const FlowerList: FC<FlowerListProps> = ({ flowers }) => {
  const { deleteFlower } = useFlowers();

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
                      deleteFlower(item._id);
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
