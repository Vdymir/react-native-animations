import { BackHandler, Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenLayout from "@/components/ScreenLayout";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
const { width, height } = Dimensions.get("screen");

const WORDS = ["Maduro", "Mamate", "Un", "Huevo"];
const SIZE = 100;

export default function InterpoleScroll() {
  const translateX = useSharedValue(0);

  const handlerScroll = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <ScreenLayout title="Interpole Scroll">
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handlerScroll}
        scrollEventThrottle={16}
        pagingEnabled
      >
        {WORDS.map((item, index) => (
          <ViewScroll
            index={index}
            title={item}
            translateX={translateX}
            key={index.toString()}
          />
        ))}
      </Animated.ScrollView>
    </ScreenLayout>
  );
}

interface Props {
  index: number;
  translateX: SharedValue<number>;
  title: string;
}

export function ViewScroll({ index, title, translateX }: Props) {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const sqStyle = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value, inputRange, [0, 1, 0]);

    const borderRadius = interpolate(translateX.value, inputRange, [
      0,
      SIZE,
      0,
    ]);

    return {
      borderRadius,
      transform: [{ scale }],
    };
  });

  const txtStyle = useAnimatedStyle(() => {
    // first param -> value
    // second param -> array for tracking value in 3 position
    // Third param -> array values with reference to second param
    const translateY = interpolate(translateX.value, inputRange, [
      height / 2,
      0,
      -(height / 2),
    ]);
    const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2]);
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View
      style={[
        {
          backgroundColor: `rgba(0,0,225,0.${index + 2})`,
        },
        styles.view_container,
      ]}
    >
      <Animated.View style={[styles.square, sqStyle]} />

      <Animated.View style={[{ position: "absolute" }, txtStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  view_container: {
    flex: 1,
    width,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE * 2,
    height: SIZE * 2,
    backgroundColor: "rgba(0,0,225, 0.6)",
  },
  text: {
    fontWeight: "700",
    color: "#FFF",
    fontSize: 42,
    textTransform: "uppercase",
  },
});
