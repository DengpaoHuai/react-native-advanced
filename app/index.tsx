import { useUser } from "@/contexts/UserContext";
import { Link, router } from "expo-router";
import { Button, Text, View } from "react-native";

const App = () => {
  const { currentUser } = useUser();

  return (
    <View>
      {currentUser && <Text>{currentUser.email}</Text>}
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
