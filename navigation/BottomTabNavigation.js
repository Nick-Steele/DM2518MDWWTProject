import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Item from '../Helpers/Item'
import {
  StyleSheet,
} from "react-native";

import {
  StorageScreen,
  NewItem,
  ItemScreen,
  HomeScreen,
  GraphScreen,
  SettingsScreen,
} from "../screens";

const BottomTab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const StorageStack = createStackNavigator();
const WasteStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        // headerLeft: (props) => <SignOutUser {...props} />,
        // headerRight: (props) => <LoggedInUser {...props} />,
        headerTitleAlign: "center",
      }}
    />
    <StorageStack.Screen name="ItemScreen" component={ItemScreen} />
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
    <StorageStack.Screen name="NewItem" component={NewItem} options={{title: "Add New Item!"}}/>
    <StorageStack.Screen name="ItemScreen" component={ItemScreen} />
  </StorageStack.Navigator>
);

const WasteStackScreen = () => (
  <WasteStack.Navigator>
    <WasteStack.Screen
      name="Analytics"
      component={GraphScreen}
      options={{
        headerTitleAlign: "center",
      }}
    />
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
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: "More..."}}
      />
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
    marginRight: 16,
  },
});
