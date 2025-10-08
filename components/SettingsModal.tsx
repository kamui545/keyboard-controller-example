import {
  useAnimated,
  useKeyboardController,
  useTranslatePadding,
} from "@/utils/storage";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const insets = useSafeAreaInsets();

  const [animated, setAnimated] = useAnimated();
  const [keyboardController, setKeyboardController] = useKeyboardController();
  const [translatePadding, setTranslatePadding] = useTranslatePadding();

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

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Animated</Text>
            <Switch value={animated} onValueChange={setAnimated} />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Keyboard Controller</Text>
            <Switch
              value={keyboardController}
              onValueChange={setKeyboardController}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Translate with Padding</Text>
            <Switch
              value={translatePadding}
              onValueChange={setTranslatePadding}
            />
          </View>
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
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingLabel: {
    fontSize: 16,
  },
});
