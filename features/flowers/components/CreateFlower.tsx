import { Text, View, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flower } from "@/types/flowers";
import { flowerSchema, useCreateFlower } from "../api/create-flower";
import CustomTextInput from "@/components/ui/inputs/TextInput";

const CreateFlower = () => {
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

  const { onSubmit } = useCreateFlower();

  return (
    <View
      style={{
        backgroundColor: "lightblue",
      }}
    >
      <CustomTextInput<Flower>
        control={control}
        name="name"
        placeholder="name"
      />

      {errors.name && <Text>This is required.</Text>}

      <CustomTextInput<Flower>
        control={control}
        name="description"
        placeholder="description"
      />
      {errors.description && <Text>This is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default CreateFlower;
