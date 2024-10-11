import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Text, View } from "react-native";

const Submit = () => {
  const submit = () => {
    AsyncStorage.getAllKeys().then((keys) => {
      AsyncStorage.multiGet(keys).then((result) => {
        //get keys with commence avec "rapport-" puis id aléatoire
        result = result.filter((item) => item[0].startsWith("rapport-"));

        console.log(result);
      });
    });
  };

  return (
    <View>
      <Text>Create</Text>
      <Button onPress={submit} title="soumettre rapports"></Button>
    </View>
  );
};

export default Submit;
