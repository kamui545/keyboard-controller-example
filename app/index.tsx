import { ChatFooter } from "@/components/ChatFooter";
import { ChatMessage } from "@/components/ChatMessage";
import { SettingsModal } from "@/components/SettingsModal";
import { messages, type Message } from "@/data/messages";
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

  const [keyboardController, setKeyboardController] = useState(true);
  const [animated, setAnimated] = useState(true);
  const [translatePadding, setTranslatePadding] = useState(true);
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
    <SafeAreaView style={{ flex: 1 }}>
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
        animated={animated}
        onAnimatedChange={setAnimated}
        keyboardController={keyboardController}
        onKeyboardControllerChange={setKeyboardController}
        translatePadding={translatePadding}
        onTranslatePaddingChange={setTranslatePadding}
      />
      <KeyboardView
        behavior={behavior()}
        keyboardVerticalOffset={header}
        style={{ flex: 1 }}
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
  contentContainer: {
    padding: 12,
  },
});
