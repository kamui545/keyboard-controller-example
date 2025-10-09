import { ChatEmpty } from "@/components/ChatEmpty";
import { keyExtractor, renderMessage } from "@/utils/messages";
import type { ChatListProps } from "@/utils/types";
import { LegendList } from "@legendapp/list";
import React from "react";

export function ChatLegendList({ data }: ChatListProps) {
  return (
    <LegendList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderMessage}
      ListEmptyComponent={<ChatEmpty />}
      maintainScrollAtEnd
      alignItemsAtEnd
      recycleItems
    />
  );
}
