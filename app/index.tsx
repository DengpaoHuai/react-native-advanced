import { Link, router } from "expo-router";
import { Button, Text, View } from "react-native";

const App = () => {
  return (
    <View>
      <Text>My App</Text>
      <Link href="/demo-rights">demo</Link>
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
