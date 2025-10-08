import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </KeyboardProvider>
  );
}
