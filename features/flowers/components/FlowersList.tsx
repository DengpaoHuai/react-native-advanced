import { Flower } from "@/types/flowers";
import { router } from "expo-router";
import { FC } from "react";
import { Button, FlatList, Text, View } from "react-native";

type FlowerListProps = {
  flowers: Flower[];
};

const FlowerList: FC<FlowerListProps> = ({ flowers }) => {
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
