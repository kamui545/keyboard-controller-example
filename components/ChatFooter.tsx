import { IconSymbol } from "@/components/ui/IconSymbol";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  onSubmit: (message: string) => void;
};

export function ChatFooter({ onSubmit }: Props) {
  const [message, setMessage] = useState("");

  function handleSubmit() {
    onSubmit(message);
    setMessage("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <IconSymbol name="arrow.up" color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
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
