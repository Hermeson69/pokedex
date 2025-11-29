import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="details"
        options={{
          headerTitle: ({ tintColor }) => (
            <SafeAreaView>
              <View>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: tintColor }}>
                </Text>
                <Text style={{ fontSize: 14, color: "gray" }}>
              
                </Text>
              </View>
            </SafeAreaView>
          ),
          headerBackButtonDisplayMode: "minimal",
          presentation: "fullScreenModal",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}