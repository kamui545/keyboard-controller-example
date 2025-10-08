import type { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  message: string;
  onChange: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
};

export function ChatFooter({ message, onChange, onSubmit }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={message}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        returnKeyType="send"
        placeholder="Type a message..."
        placeholderTextColor="#aaa"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  input: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 8,
    fontSize: 16,
  },
});
