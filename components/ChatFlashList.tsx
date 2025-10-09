import { ChatMessage } from "@/components/ChatMessage";
import { type Message } from "@/constants/messages";
import { useAnimated } from "@/utils/storage";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet } from "react-native";

interface ChatFlashListProps {
  data: Message[];
}

export function ChatFlashList({ data }: ChatFlashListProps) {
  const [animated] = useAnimated();

  return (
    <FlashList
      contentContainerStyle={styles.contentContainer}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ChatMessage message={item.message} reply={item.reply} />
      )}
      maintainVisibleContentPosition={{
        autoscrollToBottomThreshold: 0.2,
        animateAutoScrollToBottom: animated,
        startRenderingFromBottom: true,
      }}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 12,
  },
});
