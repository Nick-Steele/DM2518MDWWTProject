import * as React from "react";
import { View, Text, TouchableHighlight, FlatList, Button } from "react-native";
import Item from "../Helpers/Item";
import Listitem from "../components/Listitem";
import { MenuProvider } from "react-native-popup-menu";

export default function StorageScreen({ navigation }) {
  //   const item = Item();
  const TestData = {
    food: [
      {
        title: "Cabbage",
        category: "vegetable",
        location: "Pantry",
        amount: 1,
        date: "2020-04-17",
      },
      {
        title: "Cabbage",
        category: "vegetable",
        location: "Pantry",
        amount: 2,
        date: "2020-04-17",
      },
      {
        title: "Cabbage",
        category: "vegetable",
        location: "Pantry",
        amount: 3,
        date: "2020-04-17",
      },
      {
        title: "Cabbage",
        category: "vegetable",
        location: "Pantry",
        amount: 4,
        date: "2020-04-17",
      },
    ],
  };
  return (
    <View>
      <View>
        <Button
          title="Test Child Screen"
          onPress={() => {
            navigation.push("TestChildScreen");
          }}
        ></Button>
      </View>
      <MenuProvider>
      <View style={{ marginTop: 30 }}>
            <FlatList
              data={TestData.food}
              renderItem={({ item }) => {
                return Listitem(item);
              }}
            />
          </View>
      </MenuProvider>
    </View>
  );
}
