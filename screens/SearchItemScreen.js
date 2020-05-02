import React from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";

export default function SearchItemScreen({ navigation }) {
  navigation.setOptions({
    headerRight: () => (
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.push("NewItem")}
          style={{ padding: 10 }}
        >
          <Text style={{ color: "#0a84ff", fontSize: 18 }}>Add</Text>
        </TouchableOpacity>
      </View>
    ),
  });

  return (
    <View style={styles.container}>
      <Text>Search Existing Items PAge</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
  },
});
