import { Link } from "expo-router";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Root() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Link href="/chat" asChild>
        <Button title="Open Chat" />
      </Link>
    </SafeAreaView>
  );
}
