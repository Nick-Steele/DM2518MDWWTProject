import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  Platform
} from "react-native";
import Listitem from "../components/Listitem";
import { MenuProvider } from "react-native-popup-menu";
import {getItems} from "../Helpers/ItemHelper";
import LoadingScreen from "./LoadingScreen";
import moment from 'moment';

export default function HomeScreen({ navigation }) {
  const [food, setFood] = React.useState({today: [], week: [], month:[] })
  const [loading, setLoading] = React.useState(true);

  const todaysDate = moment().format("YYYY-MM-DD");
  const endOfWeekDate = moment().add('days', 7).format("YYYY-MM-DD");
  const endOfMonthDate = moment().add('days', 31).format("YYYY-MM-DD");

  // React.useEffect(() => {
  //   getItems().then((items) => {
  //     let todaysItems = items.filter((item) => moment(item.date).isSame(todaysDate));
  //     let thisWeeksItems = items.filter((item) => moment(item.date).isBetween(todaysDate, endOfWeekDate));
  //     let thisMonthsItems = items.filter((item) => moment(item.date).isBetween(endOfWeekDate, endOfMonthDate));
  //     setFood({today: todaysItems, week: thisWeeksItems, month: thisMonthsItems});
  //   });
  //   setTimeout(()=>{
  //     setLoading(false)
  //   },1000)
  // }, []);

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     getItems().then((items) => {
  //     let todaysItems = items.filter((item) => moment(item.date).isSame(todaysDate));
  //     let thisWeeksItems = items.filter((item) => moment(item.date).isBetween(todaysDate, endOfWeekDate));
  //     let thisMonthsItems = items.filter((item) => moment(item.date).isBetween(endOfWeekDate, endOfMonthDate));
  //     setFood({today: todaysItems, week: thisWeeksItems, month: thisMonthsItems});
  //   });
  //   setTimeout(()=>{
  //     setLoading(false)
  //   },1000)
  //   });
  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

  // if(loading){
  //   return(
  //     <LoadingScreen/>
  //   )
  // } else {
    return (
      <SafeAreaView style={Platform.OS == 'web' ? styles.safeContainer : styles.safeContainer2}>
        <MenuProvider>
        <ScrollView style={styles.container}>
          <Text style={[styles.bodyText, styles.topText]}>
            The food is going to expire
          </Text>
          <View style={[styles.todayView]}>
            <Text style={[styles.bodyText, styles.bodyTextMargin]}>Today</Text>
            {food.today != 0 ? (
              <FlatList
              style={{ flex: 1, maxHeight: Platform.OS == 'android' ? 2000 : 400 }}
              data={food.today}
              renderItem={({ item, index }) => {
                return Listitem(item, navigation);
              }}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={6}
            />) : (
              <Text style={[styles.bodyText, styles.bodyTextMargin]}>You have no food that will expire today!</Text>
            )}
          </View>

          <View style={[styles.tomorrowView]}>
            <Text style={[styles.bodyText, styles.bodyTextMargin]}>This week</Text>
            {food.week != 0 ? (
              <FlatList
              style={{ flex: 1, maxHeight: Platform.OS == 'android' ? 2000 : 400 }}
              data={food.week}
              renderItem={({ item, index }) => {
                return Listitem(item, navigation);
              }}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={6}
            />
            ):(
              <Text style={[styles.bodyText, styles.bodyTextMargin]}>You have no food that will expire this week!</Text>
            )}
          </View>

          <View style={[styles.threedaysView]}>
            <Text style={[styles.bodyText, styles.bodyTextMargin]}>This month</Text>
            {food.month != 0 ? (
              <FlatList
              style={{ flex: 1, maxHeight: Platform.OS == 'android' ? 2000 : 400}}
              data={food.month}
              renderItem={({ item, index }) => {
                return Listitem(item, navigation);
              }}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={6}
            />
            ):(
              <Text style={[styles.bodyText, styles.bodyTextMargin]}>You have no food that will expire this month!</Text>
            )}
          </View>
        </ScrollView>
        </MenuProvider>
      </SafeAreaView>
    );
  }
// }

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1
  },
  safeContainer2: {
    flex: 1,
  },
  container: {
    //flex: Platform.OS == 'web' ? 1 : 1,
    flexDirection: 'column'
  },
  todayView: {
    backgroundColor: "powderblue",
    flex: 1,
    flexDirection: 'column',
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
    borderRadius: 10,
    overflow: 'visible'
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
    padding: 10,
  },
  topText: {
    marginTop: 20,
    textAlign: "center",
    color: "grey",
    fontSize: 22,
  },
  bodyTextMargin: {
    textAlign: "center",
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
    borderBottomRightRadius: 10,
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
