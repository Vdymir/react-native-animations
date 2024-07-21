import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Stack } from "expo-router";

interface Props {
  title: string;
  children: React.ReactElement;
  style?: StyleProp<ViewStyle>;
}

export default function ScreenLayout({ title, children, style }: Props) {
  return (
    <View>
      <Stack.Screen
        options={{
          title: title,
          headerBackTitle: "Home",
        }}
      />
      <View style={[styles.main, style]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
