import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Firebase from "../config/Firebase";

import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

import {
  StorageScreen,
  WasteScreen,
  NewItem,
  TestChildScreen,
  HomeScreen,
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
      <TouchableHighlight onPress={() => Firebase.auth().signOut()}>
        <Text style={{ color: "#007AFF" }}>Sign Out</Text>
      </TouchableHighlight>
    </View>
  );
}

function HeaderTitle() {
  return (
    <View style={{ paddingLeft: 16 }}>
      <Text style={styles.headerText}>Home</Text>
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
        headerTitle: (props) => <HeaderTitle {...props} />,
      }}
    />
    <StorageStack.Screen name="TestChildScreen" component={TestChildScreen} />
  </HomeStack.Navigator>
);

const StorageStackScreen = () => (
  <StorageStack.Navigator>
    <StorageStack.Screen name="Storage" component={StorageScreen} />
    <StorageStack.Screen name="TestChildScreen" component={TestChildScreen} />
  </StorageStack.Navigator>
);

const WasteStackScreen = () => (
  <WasteStack.Navigator>
    <WasteStack.Screen name="Waste Analytics" component={WasteScreen} />
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
