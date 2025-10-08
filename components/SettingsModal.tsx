import {
  useAnimated,
  useKeyboardController,
  useListType,
  useTranslatePadding,
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

export function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const insets = useSafeAreaInsets();

  const [animated, setAnimated] = useAnimated();
  const [keyboardController, setKeyboardController] = useKeyboardController();
  const [translatePadding, setTranslatePadding] = useTranslatePadding();
  const [listType, setListType] = useListType();

  const listTypes: ListType[] = ["FlatList", "FlashList", "LegendList"];

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
            <Text style={styles.sectionTitle}>List Type</Text>
            <View style={styles.listTypeContainer}>
              {listTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  activeOpacity={0.7}
                  style={[
                    styles.listTypeButton,
                    listType === type && styles.listTypeButtonActive,
                  ]}
                  onPress={() => setListType(type)}
                >
                  <Text
                    style={[
                      styles.listTypeButtonText,
                      listType === type && styles.listTypeButtonTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <SettingSwitch
            title="animateAutoScrollToBottom"
            description="FlashList only"
            value={animated}
            onValueChange={setAnimated}
          />

          <SettingSwitch
            title="Keyboard Controller"
            value={keyboardController}
            onValueChange={setKeyboardController}
          />

          <SettingSwitch
            title="Translate with Padding"
            description="Keyboard Controller only"
            value={translatePadding}
            onValueChange={setTranslatePadding}
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
  listTypeContainer: {
    flexDirection: "row",
    gap: 8,
  },
  listTypeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
  },
  listTypeButtonActive: {
    backgroundColor: "#007AFF",
  },
  listTypeButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  listTypeButtonTextActive: {
    color: "#FFFFFF",
  },
});
