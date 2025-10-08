import { ChatFooter } from "@/components/ChatFooter";
import { ChatMessage } from "@/components/ChatMessage";
import { SettingsModal } from "@/components/SettingsModal";
import { messages, type Message } from "@/constants/messages";
import {
  useAnimated,
  useKeyboardController,
  useTranslatePadding,
} from "@/utils/storage";
import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList } from "@shopify/flash-list";
import { Stack } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Button,
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import {
  KeyboardAvoidingView,
  type KeyboardAvoidingViewProps,
} from "react-native-keyboard-controller";

export default function HomeScreen() {
  const header = useHeaderHeight();

  const lastMessageId = useRef(messages[messages.length - 1].id);

  // Persists settings with MMKV
  const [animated] = useAnimated();
  const [keyboardController] = useKeyboardController();
  const [translatePadding] = useTranslatePadding();

  const [settingsVisible, setSettingsVisible] = useState(false);

  const [message, setMessage] = useState("");
  const [data, setData] = useState<Message[]>(messages);

  function addMessage() {
    lastMessageId.current++;

    setData([
      ...data,
      {
        id: lastMessageId.current,
        message: message,
        reply: false,
      },
    ]);

    setMessage("");
  }

  function behavior(): KeyboardAvoidingViewProps["behavior"] {
    if (Platform.OS === "android") {
      return undefined;
    }

    if (keyboardController && translatePadding) {
      return "translate-with-padding";
    }

    return "padding";
  }

  const KeyboardView = keyboardController
    ? KeyboardAvoidingView
    : RNKeyboardAvoidingView;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          title: "FlashList",
          headerRight() {
            return (
              <Button
                onPress={() => setSettingsVisible(true)}
                title="Settings"
              />
            );
          },
        }}
      />
      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
      <KeyboardView
        behavior={behavior()}
        keyboardVerticalOffset={header}
        style={styles.keyboardView}
      >
        <FlashList
          maintainVisibleContentPosition={{
            autoscrollToBottomThreshold: 0.2,
            animateAutoScrollToBottom: animated, // does not work properly with `react-native-keyboard-controller`
            startRenderingFromBottom: true,
          }}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ChatMessage message={item.message} reply={item.reply} />
          )}
          data={data}
        />
        <ChatFooter
          message={message}
          onChange={setMessage}
          onSubmit={addMessage}
        />
      </KeyboardView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  contentContainer: {
    padding: 12,
  },
});
