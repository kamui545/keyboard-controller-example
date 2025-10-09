import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function ChatEmpty() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No messages yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  text: {
    fontSize: 16,
    color: "#999",
  },
});
