import { ChatEmpty } from "@/components/ChatEmpty";
import { type Message } from "@/constants/messages";
import { keyExtractor, renderMessage } from "@/utils/messages";
import { LegendList } from "@legendapp/list";
import React from "react";

interface ChatLegendListProps {
  data: Message[];
}

export function ChatLegendList({ data }: ChatLegendListProps) {
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
