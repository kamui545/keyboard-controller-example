import { ChatMessage } from "@/components/ChatMessage";
import { type Message } from "@/constants/messages";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

interface ChatFlatListProps {
  data: Message[];
}

export function ChatFlatList({ data }: ChatFlatListProps) {
  const messages = [...data].toReversed();

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={messages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ChatMessage message={item.message} reply={item.reply} />
      )}
      inverted
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 12,
  },
});
