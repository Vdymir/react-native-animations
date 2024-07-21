import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import ScreenLayout from "@/components/ScreenLayout";

const SIZE = 100.0;

export default function IntroductionView() {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      borderRadius: (opacity.value * SIZE) / 2,
      transform: [
        { scale: scale.value },
        { rotate: `${scale.value * 2 * Math.PI}rad` },
      ],
    };
  }, []);

  useEffect(() => {
    // withRepeat, when its value is -1, it is infinite
    opacity.value = withRepeat(withSpring(0.5, { duration: 1000 }), -1, true);
    scale.value = withRepeat(withSpring(2, { duration: 1000 }), -1, true);

    // stop animation when this component is unmounted
    return () => {
      cancelAnimation(opacity);
      cancelAnimation(scale);
    };
  }, []);

  return (
    <ScreenLayout title="Introduction">
      <Animated.View style={[styles.box, reanimatedStyle]} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: SIZE,
    height: SIZE,
    borderRadius: 8,
    backgroundColor: "blue",
  },
});
