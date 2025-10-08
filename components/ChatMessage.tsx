import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";

type ChatMessageProps = {
  message: string;
  reply: boolean;
};

export function ChatMessage({ message, reply }: ChatMessageProps) {
  return (
    <View
      style={[styles.container, reply ? styles.rightAlign : styles.leftAlign]}
    >
      <View
        style={[
          styles.bubble,
          reply ? styles.replyBubble : styles.messageBubble,
        ]}
      >
        <ThemedText
          style={[styles.text, reply ? styles.replyText : styles.messageText]}
        >
          {message}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  leftAlign: {
    alignItems: "flex-start",
  },
  rightAlign: {
    alignItems: "flex-end",
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    maxWidth: "75%",
  },
  messageBubble: {
    backgroundColor: "#E5E5EA",
    borderBottomLeftRadius: 4,
  },
  replyBubble: {
    backgroundColor: "#007AFF",
    borderBottomRightRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
  },
  messageText: {
    color: "#000000",
  },
  replyText: {
    color: "#FFFFFF",
  },
});
