import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";

const listViewAnimations = [
  {
    name: "Introduction",
    link: "/introduction",
  },
  {
    name: "PanGesturehandler",
    link: "/PanGesturehandler",
  },
  {
    name: "Interpole with scroll",
    link: "/InterpoleScroll",
  },
  {
    name: "Swipe animation",
    link: "/SwipeAnimation",
  },
];

export default function ListAnimation() {
  return (
    <View>
      <StatusBar showHideTransition="fade" barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.main}>
          <ThemedText type="title">List animations view</ThemedText>
          <View style={styles.body}>
            {listViewAnimations.map((item) => (
              <Link href={item.link} key={item.name} asChild>
                <Pressable>
                  <View style={styles.box}>
                    <ThemedText>{item.name}</ThemedText>
                    <MaterialIcons
                      name="arrow-forward"
                      size={18}
                      color="black"
                    />
                  </View>
                </Pressable>
              </Link>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
  body: {
    marginTop: 16,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
  },
});
