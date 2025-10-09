import { ChatEmpty } from "@/components/ChatEmpty";
import { type Message } from "@/constants/messages";
import { keyExtractor, renderMessage } from "@/utils/messages";
import React from "react";
import { FlatList } from "react-native";

interface ChatFlatListProps {
  data: Message[];
}

export function ChatFlatList({ data }: ChatFlatListProps) {
  const messages = data.toReversed();

  return (
    <FlatList
      data={messages}
      keyExtractor={keyExtractor}
      renderItem={renderMessage}
      ListEmptyComponent={<ChatEmpty />}
      inverted={messages.length > 0} // avoid upside down empty state message due to inverted.
    />
  );
}
