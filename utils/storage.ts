import { useMMKVBoolean } from "react-native-mmkv";

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
