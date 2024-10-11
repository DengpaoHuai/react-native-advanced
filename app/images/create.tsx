import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Image, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import CustomTextInput from "@/components/ui/inputs/TextInput";
import * as ImagePicker from "expo-image-picker";
import { useId, useState } from "react";
import * as FileSystem from "expo-file-system";
import {
  manipulateAsync,
  FlipType,
  SaveFormat,
  ImageResult,
} from "expo-image-manipulator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type Rapport = {
  name: string;
  description: string;
  pathToImage: string;
};

const rapportSchema = z.object({
  name: z.string().min(3).max(25),
  description: z.string(),
});

const Create = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Rapport, "pathToImage">>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(rapportSchema),
  });
  const [image, setImage] = useState<ImageResult | null>(null);
  // ImagePicker.requestMediaLibraryPermissionsAsync();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      // setImage(result.assets[0].uri);
      const manipResult = await manipulateAsync(result.assets[0].uri, [], {
        compress: 1,
        format: SaveFormat.JPEG,
      });
      console.log(manipResult);
      setImage(manipResult);
    }
  };
  const id = "651416465551351468";
  const onSubmit = async (data: Omit<Rapport, "pathToImage">) => {
    console.log(id);
    console.log(data);
    if (!image?.uri) return;
    console.log(id);
    console.log(data);
    //convert image to base64
    const base64 = await FileSystem.readAsStringAsync(image.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await FileSystem.writeAsStringAsync(
      FileSystem.cacheDirectory + id + ".jpg",
      base64,
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );
    console.log("response");
    const newRapport = {
      ...data,
      pathToImage: FileSystem.cacheDirectory + id + ".jpg",
    };
    AsyncStorage.setItem("rapport-" + id, JSON.stringify(newRapport));
    router.push("/images/preview");
    // console.log(image);
    /* realm.write(() => {
        return realm.create(Rapport, {
          description,
        });
      });*/
  };

  return (
    <View>
      <Text>Create</Text>
      <CustomTextInput<Omit<Rapport, "pathToImage">>
        control={control}
        name="name"
        placeholder="name"
      />

      {errors.name && <Text>This is required.</Text>}

      <CustomTextInput<Omit<Rapport, "pathToImage">>
        control={control}
        name="description"
        placeholder="description"
      />
      {errors.description && <Text>This is required.</Text>}

      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Create;
