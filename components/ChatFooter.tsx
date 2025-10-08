import { IconSymbol } from "@/components/ui/IconSymbol";
import type { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  message: string;
  onChange: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
};

export function ChatFooter({ message, onChange, onSubmit }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        multiline
        value={message}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        placeholder="Type a message..."
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <IconSymbol name="arrow.up" color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 20,
    fontSize: 16,
    maxHeight: 160,
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 50,
  },
});
