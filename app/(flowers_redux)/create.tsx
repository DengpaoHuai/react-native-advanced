import { Text, View, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Flower } from "@/types/flowers";
import { addFlower } from "@/store/asyncThunk/flowers.thunk";
import { useAppDispatch } from "@/store/store";

export default function FlowerForm() {
  const flowerSchema = z.object({
    name: z.string().min(3).max(25),
    description: z.string(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Flower>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(flowerSchema),
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (data: Omit<Flower, "_id">) => {
    await dispatch(addFlower(data));
    router.push("/flowers");
  };

  return (
    <View
      style={{
        backgroundColor: "lightblue",
      }}
    >
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {errors.name && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="description"
      />
      {errors.description && <Text>This is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
