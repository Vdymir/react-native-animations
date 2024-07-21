import { View, StyleSheet } from "react-native";
import React from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import ScreenLayout from "@/components/ScreenLayout";

const SIZE = 100;
const CIRCLE_RADIUS = SIZE * 2;

export default function PanGesturehandlerView() {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
    ],
  }));

  const pan = Gesture.Pan()
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      translationX.value = event.translationX + prevTranslationX.value;
      translationY.value = event.translationY + prevTranslationY.value;
    })
    .onFinalize(() => {
      const distance = Math.sqrt(
        translationX.value ** 2 + translationY.value ** 2
      );
      if (distance < CIRCLE_RADIUS) {
        translationX.value = withSpring(0);
        translationY.value = withSpring(0);
      }
    })
    .runOnJS(true);

  return (
    <GestureHandlerRootView>
      <ScreenLayout title="PanGesture">
        <View style={styles.circle}>
          <GestureDetector gesture={pan}>
            <Animated.View style={[styles.square, animatedStyles]} />
          </GestureDetector>
        </View>
      </ScreenLayout>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "purple",
    borderRadius: 20,
  },
  circle: {
    height: CIRCLE_RADIUS * 2,
    width: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "purple",
  },
});
