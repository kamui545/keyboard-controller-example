import { ChatMessage } from "@/components/ChatMessage";
import { type Message } from "@/constants/messages";
import { LegendList } from "@legendapp/list";
import React from "react";
import { StyleSheet } from "react-native";

interface ChatLegendListProps {
  data: Message[];
}

export function ChatLegendList({ data }: ChatLegendListProps) {
  return (
    <LegendList
      contentContainerStyle={styles.contentContainer}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ChatMessage message={item.message} reply={item.reply} />
      )}
      maintainScrollAtEnd
      alignItemsAtEnd
      recycleItems
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 12,
  },
});
