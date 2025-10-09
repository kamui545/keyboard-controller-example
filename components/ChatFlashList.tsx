import { ChatEmpty } from "@/components/ChatEmpty";
import { keyExtractor, renderMessage } from "@/utils/messages";
import { useAnimated } from "@/utils/storage";
import { styles } from "@/utils/styles";
import type { ChatListProps } from "@/utils/types";
import { FlashList } from "@shopify/flash-list";
import React from "react";

export function ChatFlashList({ data }: ChatListProps) {
  const [animated] = useAnimated();

  return (
    <FlashList
      contentContainerStyle={styles.list}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderMessage}
      ListEmptyComponent={<ChatEmpty />}
      maintainVisibleContentPosition={{
        autoscrollToBottomThreshold: 0.2,
        animateAutoScrollToBottom: animated,
        startRenderingFromBottom: true,
      }}
    />
  );
}
