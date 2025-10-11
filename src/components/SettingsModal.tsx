import {
  useAnimated,
  useChatMode,
  useKeyboardController,
  useListType,
  useTranslatePadding,
  type ChatMode,
  type ListType,
} from "@/utils/storage";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SettingSwitch } from "./SettingSwitch";

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

const listTypes: ListType[] = ["FlatList", "FlashList", "LegendList"];
const chatModes: ChatMode[] = ["Long", "Short", "Empty"];

interface SettingButtonProps<T extends string> {
  value: T;
  label: T;
  isActive: boolean;
  onPress: () => void;
}

function SettingButton<T extends string>({
  value,
  label,
  isActive,
  onPress,
}: SettingButtonProps<T>) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, isActive && styles.buttonActive]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, isActive && styles.buttonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const insets = useSafeAreaInsets();

  const [animated, setAnimated] = useAnimated();
  const [keyboardController, setKeyboardController] = useKeyboardController();
  const [translatePadding, setTranslatePadding] = useTranslatePadding();
  const [listType, setListType] = useListType();
  const [chatMode, setChatMode] = useChatMode();

  const isFlashList = listType === "FlashList";

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={[styles.modalContent, { paddingBottom: insets.bottom }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onClose}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>List</Text>
            <View style={styles.buttonContainer}>
              {listTypes.map((type) => (
                <SettingButton
                  key={type}
                  value={type}
                  label={type}
                  isActive={listType === type}
                  onPress={() => setListType(type)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chat</Text>
            <View style={styles.buttonContainer}>
              {chatModes.map((mode) => (
                <SettingButton
                  key={mode}
                  value={mode}
                  label={mode}
                  isActive={chatMode === mode}
                  onPress={() => setChatMode(mode)}
                />
              ))}
            </View>
          </View>

          <SettingSwitch
            title="animateAutoScrollToBottom"
            description="FlashList only"
            value={isFlashList && animated}
            onValueChange={setAnimated}
            disabled={!isFlashList}
          />

          <SettingSwitch
            title="Keyboard Controller"
            value={keyboardController}
            onValueChange={setKeyboardController}
          />

          <SettingSwitch
            title="Translate with Padding"
            description="Keyboard Controller only"
            value={keyboardController && translatePadding}
            onValueChange={setTranslatePadding}
            disabled={!keyboardController}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 300,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#666",
    fontWeight: "300",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  buttonTextActive: {
    color: "#FFFFFF",
  },
});
