import { ChatFlashList } from "@/components/ChatFlashList";
import { ChatFlatList } from "@/components/ChatFlatList";
import { ChatFooter } from "@/components/ChatFooter";
import { ChatLegendList } from "@/components/ChatLegendList";
import { SettingsModal } from "@/components/SettingsModal";
import { type Message } from "@/constants/messages";
import { getMessages } from "@/utils/messages";
import {
  useChatMode,
  useKeyboardController,
  useListType,
  useTranslatePadding,
} from "@/utils/storage";
import { useHeaderHeight } from "@react-navigation/elements";
import { Stack } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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

  // Persists settings with MMKV
  const [keyboardController] = useKeyboardController();
  const [translatePadding] = useTranslatePadding();
  const [listType] = useListType();
  const [chatMode] = useChatMode();

  const [settingsVisible, setSettingsVisible] = useState(false);

  const messages = getMessages(chatMode);
  const lastMessageId = useRef(messages[messages.length - 1]?.id);
  const [data, setData] = useState<Message[]>(messages);

  // update when switch chat mode
  useEffect(() => {
    const newMessages = getMessages(chatMode);
    lastMessageId.current = newMessages[newMessages.length - 1]?.id;
    setData(newMessages);
  }, [chatMode]);

  function addMessage(message: string) {
    lastMessageId.current++;

    setData([
      ...data,
      {
        id: lastMessageId.current,
        message: message,
        reply: false,
      },
    ]);
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

  function renderList() {
    switch (listType) {
      case "FlatList":
        return <ChatFlatList data={data} />;
      case "LegendList":
        return <ChatLegendList data={data} />;
      default:
        return <ChatFlashList data={data} />;
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          title: listType,
          headerBackButtonDisplayMode: "minimal",
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
        {renderList()}
        <ChatFooter onSubmit={addMessage} />
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
});
