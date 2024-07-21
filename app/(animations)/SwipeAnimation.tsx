import { View } from "react-native";
import React, { useState } from "react";
import ScreenLayout from "@/components/ScreenLayout";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SwipeCard from "@/components/SwipeCard";

const ANIMALS = [
  "Dog",
  "Pig",
  "Cat",
  "Chicken",
  "Cow",
  "Pony",
  "Tiger",
  "Monkey",
];

export default function SwipeAnimation() {
  const [animalList, setAnimalList] = useState(ANIMALS);

  const onDeleteAnimal = (animal: string) => {
    setAnimalList((prev) => prev.filter((item) => item !== animal));
  };

  return (
    <GestureHandlerRootView>
      <ScreenLayout
        title="Swipe Animation"
        style={{
          justifyContent: "flex-start",
        }}
      >
        <View>
          {animalList.map((animal) => (
            <SwipeCard
              animal={animal}
              key={animal}
              onPress={() => {
                onDeleteAnimal(animal);
              }}
            />
          ))}
        </View>
      </ScreenLayout>
    </GestureHandlerRootView>
  );
}
