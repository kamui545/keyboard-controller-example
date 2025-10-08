import { ChatMessage } from "@/components/ChatMessage";
import { type Message } from "@/constants/messages";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

interface ChatLegendListProps {
  data: Message[];
}

export function ChatLegendList({ data }: ChatLegendListProps) {
  // TODO: Replace with actual LegendList implementation once @legendapp/list is installed
  // For now, using FlatList as a placeholder
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
