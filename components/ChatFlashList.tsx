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
      maintainVisibleContentPosition={{
        autoscrollToBottomThreshold: 0.2,
        animateAutoScrollToBottom: animated,
        startRenderingFromBottom: true,
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
