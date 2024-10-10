import { router } from "expo-router";
import { Button, Text, View } from "react-native";

const App = () => {
  return (
    <View>
      <Text>My App</Text>
      <Button
        title="Press me"
        onPress={() => {
          router.push("/flowers");
        }}
      ></Button>
    </View>
  );
};

export default App;
