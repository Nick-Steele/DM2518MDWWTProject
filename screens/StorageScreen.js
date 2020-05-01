import * as React from "react";
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Item from "../Helpers/Item";
import Listitem from "../components/Listitem";
import { MenuProvider } from "react-native-popup-menu";

export default function StorageScreen({ navigation }) {

  navigation.setOptions({ 
    headerRight: () => (
      <View style={{marginRight:10}}>
        <TouchableOpacity 
        onPress={() => navigation.push("NewItem")}
        style={{padding: 10}}
        >
          <Text style={{color: '#0a84ff', fontSize: 18}}>Add</Text>
        </TouchableOpacity>
      </View>
    ),
    headerLeft: () => (
      <View style={{marginLeft:10}}>
        <TouchableOpacity 
        onPress={() => {alert("Filter")}}
        style={{padding: 10}}
        >
          <Text style={{color: '#0a84ff', fontSize: 18}}>Filter</Text>
        </TouchableOpacity>
      </View>
    )
  })
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
      {
        title: "Cabbage",
        category: "vegetable",
        location: "Pantry",
        amount: 4,
        date: "2020-04-17",
      },
      {
        title: "Cabbage",
        category: "vegetable",
        location: "Pantry",
        amount: 4,
        date: "2020-04-17",
      },
      {
        title: "Cabbage",
        category: "vegetable",
        location: "Pantry",
        amount: 4,
        date: "2020-04-17",
      },
      {
        title: "Cabbage",
        category: "vegetable",
        location: "Pantry",
        amount: 4,
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
    <MenuProvider>
      <SafeAreaView style={styles.safeContainer}>
        <View>
          
          
        </View>
        <ScrollView style={styles.container}>
          <FlatList
            style={{ flex: 1, marginTop: 10}}
            data={TestData.food}
            renderItem={({ item, index }) => {
              return Listitem(item, navigation);
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </SafeAreaView >
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});