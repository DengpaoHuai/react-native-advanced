import { useUser } from "@/contexts/UserContext";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
let counter1 = 0;

const App = () => {
  const [counter, setCounter] = useState(0);
  const { currentUser } = useUser();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);
  return (
    <View>
      {currentUser && <Text>{currentUser.email}</Text>}
      <Text>My App</Text>
      <Link href="/images/create">create</Link>
      <Link href="/images/preview">preview</Link>

      <Link href="/demo-rights">demo</Link>
      <Text
        style={{
          fontSize: 30,
          color: "red",
        }}
      >
        {counter1}
      </Text>
      <Button
        title="counteer"
        onPress={() => {
          counter1++;
          console.log(counter1);
        }}
      ></Button>
      <Text
        style={{
          fontSize: 30,
          color: "red",
        }}
      >
        {counter}
      </Text>
      <Button
        title="counteer"
        onPress={() => {
          setCounter(counter + 1);
          console.log(counter);
        }}
      ></Button>
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
