import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Firebase from "../config/Firebase";

import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";

import {
  StorageScreen,
  WasteScreen,
  NewItem,
  TestChildScreen,
  HomeScreen,
  GraphScreen,
} from "../screens";

const BottomTab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const StorageStack = createStackNavigator();
const WasteStack = createStackNavigator();

function LoggedInUser() {
  return (
    <View style={styles.signedInView}>
      <Image
        style={styles.image}
        source={
          Firebase.auth().currentUser.photoURL ||
          "../assets/profile_placeholder.png"
        }
      />
      <Text>{Firebase.auth().currentUser.displayName}</Text>
    </View>
  );
}

function SignOutUser() {
  return (
    <View style={{ paddingLeft: 16 }}>
      <TouchableOpacity
        onPress={() => {
          Firebase.auth().signOut();
        }}
        // This works for Android and IOS but not web
        // onPress={() =>
        //   Alert.alert("Sign Out", "Are you sure you want too sign out?", [
        //     {
        //       text: "Yes",
        //       onPress: () => console.log("Signing out..."),
        //       onPress: () => Firebase.auth().signOut(),
        //     },
        //     {
        //       text: "Cancel",
        //       onPress: () => console.log("Sign out aborted"),
        //       style: "cancel",
        //     },
        //   ])
        // }
      >
        <Text style={{ color: "#007AFF" }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerLeft: (props) => <SignOutUser {...props} />,
        headerRight: (props) => <LoggedInUser {...props} />,
        headerTitleAlign: "center",
      }}
    />
    <StorageStack.Screen name="TestChildScreen" component={TestChildScreen} />
  </HomeStack.Navigator>
);

const StorageStackScreen = () => (
  <StorageStack.Navigator>
    <StorageStack.Screen
      name="Storage"
      component={StorageScreen}
      options={{
        headerTitleAlign: "center",
      }}
    />
    <StorageStack.Screen name="TestChildScreen" component={TestChildScreen} />
  </StorageStack.Navigator>
);

const WasteStackScreen = () => (
  <WasteStack.Navigator>
    <WasteStack.Screen
      name="Waste Analytics"
      component={WasteScreen}
      options={{
        headerTitleAlign: "center",
      }}
    />
    <StorageStack.Screen name="TestChildScreen" component={TestChildScreen} />
  </WasteStack.Navigator>
);

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator tabBarOptions={{}}>
      <BottomTab.Screen name="Home" component={HomeStackScreen} options={{}} />
      <BottomTab.Screen
        name="Storage"
        component={StorageStackScreen}
        options={{}}
      />
      <BottomTab.Screen
        name="Waste"
        component={WasteStackScreen}
        options={{}}
      />

      <BottomTab.Screen name="Add Item" component={NewItem} options={{}} />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "bold",
  },
  signedInView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 16,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 8,
  },
});
