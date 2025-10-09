import { ChatEmpty } from "@/components/ChatEmpty";
import { type Message } from "@/constants/messages";
import { keyExtractor, renderMessage } from "@/utils/messages";
import { useAnimated } from "@/utils/storage";
import { FlashList } from "@shopify/flash-list";
import React from "react";

interface ChatFlashListProps {
  data: Message[];
}

export function ChatFlashList({ data }: ChatFlashListProps) {
  const [animated] = useAnimated();

  return (
    <FlashList
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
