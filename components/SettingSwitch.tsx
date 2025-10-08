import React from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

interface SettingSwitchProps {
  title: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export function SettingSwitch({
  title,
  description,
  value,
  onValueChange,
  disabled = false,
}: SettingSwitchProps) {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={() => !disabled && onValueChange(!value)}
      underlayColor="#f0f0f0"
      disabled={disabled}
    >
      <View style={styles.inner}>
        <View>
          <Text style={[styles.title, disabled && styles.disabledText]}>
            {title}
          </Text>
          {description && (
            <Text style={[styles.description, disabled && styles.disabledText]}>
              {description}
            </Text>
          )}
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
        />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#aaa",
    gap: 16,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  disabledText: {
    opacity: 0.5,
  },
});
