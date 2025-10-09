import { ChatEmpty } from "@/components/ChatEmpty";
import { keyExtractor, renderMessage } from "@/utils/messages";
import { styles } from "@/utils/styles";
import type { ChatListProps } from "@/utils/types";
import React from "react";
import { FlatList } from "react-native";

export function ChatFlatList({ data }: ChatListProps) {
  const messages = data.toReversed();

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={messages}
      keyExtractor={keyExtractor}
      renderItem={renderMessage}
      ListEmptyComponent={<ChatEmpty />}
      inverted={messages.length > 0} // avoid upside down empty state message due to inverted.
    />
  );
}
