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
import {getItems} from "../Helpers/ItemHelper";
import LoadingScreen from "./LoadingScreen";
import moment from 'moment';

// Change Views holding components into FlatLists
// Load only 5 things
// If > 5 display "Load More Button"
// When pressed navigate to new page with list of all items in that day
const TestData = {
  food: [
    {
      name: "Cabbage",
      category: "vegetable",
      storage: "Pantry",
      quantity: 4,
      expirydate: "2020-04-17",
    },
    {
      name: "Cabbage",
      category: "vegetable",
      storage: "Pantry",
      quantity: 4,
      expirydate: "2020-04-17",
    },
    {
      name: "Cabbage",
      category: "vegetable",
      storage: "Pantry",
      quantity: 4,
      expirydate: "2020-04-17",
    },
    {
      name: "Cabbage",
      category: "vegetable",
      storage: "Pantry",
      quantity: 4,
      expirydate: "2020-04-17",
    },
    {
      name: "Cabbage",
      category: "vegetable",
      storage: "Pantry",
      quantity: 4,
      expirydate: "2020-04-17",
    },
    {
      name: "Cabbage",
      category: "vegetable",
      storage: "Pantry",
      quantity: 4,
      expirydate: "2020-04-17",
    },
    {
      name: "Cabbage",
      category: "vegetable",
      storage: "Pantry",
      quantity: 4,
      expirydate: "2020-04-17",
    },
    {
      name: "Cabbage",
      category: "vegetable",
      storage: "Pantry",
      quantity: 4,
      expirydate: "2020-04-17",
    },
  ],
};

const TestData2 = {
  food: [
    {
      name: "Cabbage",
      category: "vegetable",
      storage: "Pantry",
      quantity: 4,
      expirydate: "2020-04-17",
    },
    {
      name: "Cabbage",
      category: "vegetable",
      storage: "Pantry",
      quantity: 4,
      expirydate: "2020-04-17",
    },
    {
      name: "Cabbage",
      category: "vegetable",
      storage: "Pantry",
      quantity: 4,
      expirydate: "2020-04-17",
    },
  ]
}

const TestData3 = {
  food: [
    {
      name: "Cabbage",
      category: "vegetable",
      storage: "Pantry",
      quantity: 4,
      expirydate: "2020-04-17",
    },
    {
      name: "Cabbage",
      category: "vegetable",
      storage: "Pantry",
      quantity: 4,
      expirydate: "2020-04-17",
    },
    {
      name: "Cabbage",
      category: "vegetable",
      storage: "Pantry",
      quantity: 4,
      expirydate: "2020-04-17",
    },
    {
      name: "Cabbage",
      category: "vegetable",
      storage: "Pantry",
      quantity: 4,
      expirydate: "2020-04-17",
    },
  ]
}

export default function HomeScreen({ navigation }) {
  const [mat, setMat] = React.useState(0)
  const [todayFood, setTodayFood]  = React.useState([]);
  const [weekFood, setWeekFood]  = React.useState([]);
  const [monthFood, setMonthFood]  = React.useState([]);
  const [loading, setLoading] = React.useState(true)
  React.useEffect(()=>{
      getItems().then(items=>{
        let todaysDate = new Date().toISOString().slice(0,10);
        let endOfWeekDate = moment().add('days', 7).format("YYYY-MM-DD");
        let endOfMonthDate = moment().add('days', 31).format("YYYY-MM-DD");
        setMat(items);
        setTodayFood(items.filter(item => item.expirydate == todaysDate));
        items = items.filter(item => item.expirydate != todaysDate);
        setWeekFood(items.filter(item => moment(item.expirydate).isBetween(todaysDate, endOfWeekDate)))
        items = items.filter(item => !moment(item.expirydate).isBetween(todaysDate, endOfWeekDate));
        setMonthFood(items.filter(item => moment(item.expirydate).isBetween(endOfWeekDate, endOfMonthDate)));
        console.log(todayFood);
        console.log(weekFood);
        console.log(monthFood);
      });
      setTimeout(()=>{
        setLoading(false)
      },500)
  },[])
  if(loading){
    return(
      <LoadingScreen/>
    )
  }
  else{
  return (
    <SafeAreaView style={styles.safeContainer}>
      <MenuProvider>
      <ScrollView style={styles.container}>
        <Text style={[styles.bodyText, styles.topText]}>
          The food is going to expire
        </Text>
        <View style={[styles.todayView]}>
          <Text style={[styles.bodyText, styles.bodyTextMargin]}>Today</Text>
          {/*<ScrollView style={styles.other}>*/}
            <FlatList
              style={{ flex: 1}}
              data={todayFood}
              renderItem={({ item, index }) => {
                return Listitem(item, navigation);
              }}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={3}
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
          {/*</ScrollView>*/}
        </View>

        <View style={[styles.tomorrowView]}>
          <Text style={[styles.bodyText, styles.bodyTextMargin]}>This week</Text>
          {/*<ScrollView style={styles.other}>*/}
            <FlatList
              style={{ flex: 1}}
              data={weekFood}
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
          {/*</ScrollView>*/}
        </View>

        <View style={[styles.threedaysView]}>
          <Text style={[styles.bodyText, styles.bodyTextMargin]}>This month</Text>
          {/*<ScrollView style={styles.other}>*/}
            <FlatList
              style={{ flex: 1}}
              data={monthFood}
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
          {/*</ScrollView>*/}
        </View>
      </ScrollView>
      </MenuProvider>
    </SafeAreaView>
  );
  }
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
  tomorrowView: {
    backgroundColor: "lightgreen",
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
  threedaysView: {
    backgroundColor: "salmon",
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
    padding: 20
  },
});
