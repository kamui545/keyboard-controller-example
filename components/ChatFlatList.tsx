import { ChatMessage } from "@/components/ChatMessage";
import { type Message } from "@/constants/messages";
import { useAnimated } from "@/utils/storage";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

interface ChatFlatListProps {
  data: Message[];
}

export function ChatFlatList({ data }: ChatFlatListProps) {
  const [animated] = useAnimated();

  return (
    <FlatList
      maintainVisibleContentPosition={{
        autoscrollToBottomThreshold: 0.2,
        minIndexForVisible: 0,
      }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ChatMessage message={item.message} reply={item.reply} />
      )}
      data={data}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 12,
  },
});
