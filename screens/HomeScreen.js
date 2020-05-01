import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList
} from "react-native";
import Listitem from "../components/Listitem";
import { MenuProvider } from "react-native-popup-menu";

// Change Views holding components into FlatLists
// Load only 5 things
// If > 5 display "Load More Button"
// When pressed navigate to new page with list of all items in that day
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
  ],
};


export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <MenuProvider>
      <ScrollView style={styles.container}>
        <Text style={[styles.bodyText, styles.topText]}>
          The food is going to expire
        </Text>
        <View style={[styles.todayView, styles.commonView]}>
          <Text style={[styles.bodyText, styles.bodyTextMargin]}>Today</Text>
          <ScrollView style={styles.other}>
            <FlatList
              style={{ flex: 1}}
              data={TestData.food}
              renderItem={({ item, index }) => {
                return Listitem(item, navigation);
              }}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.loadMoreView}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Alert", "Loading more items");
                }}
              >
                <Text>Load more...</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View style={[styles.tomorrowView, styles.commonView]}>
          <Text style={[styles.bodyText, styles.bodyTextMargin]}>This week</Text>
          <ScrollView style={styles.other}>
            <FlatList
              style={{ flex: 1}}
              data={TestData.food}
              renderItem={({ item, index }) => {
                return Listitem(item, navigation);
              }}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.loadMoreView}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Alert", "Loading more items");
                }}
              >
                <Text>Load more...</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View style={[styles.threedaysView, styles.commonView]}>
          <Text style={[styles.bodyText, styles.bodyTextMargin]}>This month</Text>
          <ScrollView style={styles.other}>
            <FlatList
              style={{ flex: 1}}
              data={TestData.food}
              renderItem={({ item, index }) => {
                return Listitem(item, navigation);
              }}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.loadMoreView}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Alert", "Loading more items");
                }}
              >
                <Text>Load more...</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <Text style={[styles.bodyText, styles.bottomText]}>
          click the item for more options
        </Text>
      </ScrollView>
      </MenuProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    
  },
  commonView: {
    flex: 1,
    margin: 20,
    marginLeft: 40,
    marginRight: 40,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    borderRadius: 10
  },
  todayView: {
    backgroundColor: "powderblue",
  },
  tomorrowView: {
    backgroundColor: "lightgreen",
  },
  threedaysView: {
    backgroundColor: "salmon",
    
  },
  bodyText: {
    fontSize: 18,
    padding: 10
  },
  topText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'grey',
    fontSize: 22
  },
  bodyTextMargin: {
    textAlign: 'center'
  },
  bottomText: {
    alignSelf: "flex-end",
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    
  },
  other: {
    flex: 1,
    backgroundColor: "#fafafa",
    minHeight: 70,
    maxHeight: 210,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  component: {
    height: 100,
    borderBottomWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  loadMoreView: {
    alignItems: "center",
    backgroundColor: "#fafafa",
    padding: 20,
    color: 'grey',
  },
});
