import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
const { width } = Dimensions.get("screen");

const WIDTH_BOX = width;
const HEIGHT_BOX = 50;
const LIMIT_TRANSLATION = WIDTH_BOX * 0.3;

interface Props {
  animal: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function SwipeCard({ animal, onPress = () => {} }: Props) {
  const translateX = useSharedValue(0);
  const prevTranslateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const height = useSharedValue(HEIGHT_BOX);

  const boxAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const pan = Gesture.Pan()
    .onStart(() => {
      prevTranslateX.value = translateX.value;
    })
    .onUpdate(({ translationX }) => {
      if (prevTranslateX.value === 0) {
        if (translationX > 0) return;
        if (Math.abs(translationX) >= LIMIT_TRANSLATION) return;

        translateX.value = translationX + prevTranslateX.value;
      }
    })
    .onFinalize(({ translationX }) => {
      if (Math.abs(translationX) > LIMIT_TRANSLATION) {
        translateX.value = withDelay(3000, withTiming(0, { duration: 500 }));
        return;
      }
      translateX.value = withTiming(0, { duration: 500 });
    })
    .runOnJS(true);

  const handlePress = (event: GestureResponderEvent) => {
    opacity.value = withTiming(0);
    height.value = withTiming(0);
    setTimeout(() => {
      onPress(event);
    }, 500);
  };
  return (
    <Animated.View style={{ opacity, height }}>
      <View style={styles.hidden}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, boxAnimation]}>
            <View style={styles.left}>
              <MaterialIcons name="arrow-right" size={16} color="#939185" />
              <Text style={styles.text}>{animal}</Text>
            </View>
            <MaterialIcons name="arrow-back-ios" size={16} color="#939185" />
          </Animated.View>
        </GestureDetector>
        <TouchableOpacity
          style={styles.box_hidden}
          activeOpacity={0.6}
          onPress={handlePress}
        >
          <MaterialIcons name="delete" size={26} color="#FFF" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    overflow: "hidden",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: WIDTH_BOX,
    height: HEIGHT_BOX,
    padding: 5,
    backgroundColor: "#F5F7F8",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "gray",
    zIndex: 1,
  },
  box_hidden: {
    width: WIDTH_BOX,
    height: HEIGHT_BOX,
    paddingRight: 10,
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "absolute",
    zIndex: -1,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.2,
    color: "#939185",
  },
});
