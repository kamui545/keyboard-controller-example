import { ChatMessage } from "@/components/ChatMessage";
import { messages, type Message } from "@/constants/messages";
import type { ChatMode } from "@/utils/storage";
import type { LegendListRenderItemProps } from "@legendapp/list";
import type { ListRenderItemInfo as FlashListRenderItemInfo } from "@shopify/flash-list";
import type { ListRenderItemInfo } from "react-native";

export function getMessages(mode: ChatMode): Message[] {
  switch (mode) {
    case "Empty":
      return [];
    case "Short":
      return messages.slice(-3);
    default:
      return messages;
  }
}

export function keyExtractor(message: Message) {
  return message.id.toString();
}

type RenderMessageProps =
  | ListRenderItemInfo<Message>
  | FlashListRenderItemInfo<Message>
  | LegendListRenderItemProps<Message>;

export function renderMessage({ item }: RenderMessageProps) {
  return <ChatMessage message={item.message} reply={item.reply} />;
}
