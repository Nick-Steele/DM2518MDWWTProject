import * as React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Item from "../Helpers/Item";

export default function StorageScreen({ navigation }) {
  //   const item = Item();
  return (
    <View>
      <Text>StorageScreen</Text>
      <TouchableHighlight
        onPress={() => {
          navigation.push("TestChildScreen");
        }}
      >
        <Text style={{ color: "#007AFF" }}>Yai</Text>
      </TouchableHighlight>
    </View>
  );
}
