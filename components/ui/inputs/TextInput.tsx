import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextInput } from "react-native";

function CustomTextInput<T extends FieldValues>({
  control,
  name,
  placeholder,
}: {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
        />
      )}
    />
  );
}

export default CustomTextInput;
