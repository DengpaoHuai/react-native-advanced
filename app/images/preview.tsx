import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
const Preview = () => {
  const [rapports, setRapports] = useState([]);

  const demo = async () => {
    console.log("info");
    const directory = await FileSystem.readDirectoryAsync(
      "file:///data/user/0/host.exp.exponent/files"
    );
    console.log(directory);
    const info = await FileSystem.getInfoAsync(
      "file:///data/user/0/host.exp.exponent/cache/651416465551351468.jpg"
    );
    console.log(info);
    const base64 = await FileSystem.readAsStringAsync(info.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log(base64);
  };

  useEffect(() => {
    demo();
    AsyncStorage.getAllKeys().then((keys) => {
      AsyncStorage.multiGet(keys).then((result) => {
        //get keys with commence avec "rapport-" puis id aléatoire
        console.log(result);
        let temp = result.filter((item) => item[0].startsWith("rapport-"));
        console.log(temp);

        setRapports(
          temp.map((item) => {
            return {
              id: item[0],
              ...JSON.parse(item[1]),
            };
          })
        );
        console.log("result");

        console.log(
          temp.map((item) => {
            return {
              id: item[0],
              ...JSON.parse(item[1]),
            };
          })
        );
      });
    });
  }, []);

  return (
    <View>
      <Text>Create</Text>
      {rapports.map((rapport) => {
        return (
          <View>
            <Text>{rapport.name}</Text>
            <Text>{rapport.description}</Text>
            <Image
              source={{
                uri: "file:///data/user/0/host.exp.exponent/cache/651416465551351468.jpg",
              }}
              style={{ width: 200, height: 200, backgroundColor: "red" }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default Preview;
