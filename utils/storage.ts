import { useMMKVBoolean, useMMKVString } from "react-native-mmkv";

export type ListType = "FlatList" | "FlashList" | "LegendList";
export type ChatMode = "Long" | "Short" | "Empty";

export function useKeyboardController() {
  const [value, setValue] = useMMKVBoolean("keyboardController");

  return [value ?? true, setValue] as const;
}

export function useAnimated() {
  const [value, setValue] = useMMKVBoolean("animated");

  return [value ?? true, setValue] as const;
}

export function useTranslatePadding() {
  const [value, setValue] = useMMKVBoolean("translatePadding");

  return [value ?? true, setValue] as const;
}

export function useListType() {
  const [value, setValue] = useMMKVString("listType");

  return [(value as ListType) ?? "FlashList", setValue] as const;
}

export function useChatMode() {
  const [value, setValue] = useMMKVString("chatMode");

  return [(value as ChatMode) ?? "Long", setValue] as const;
}
