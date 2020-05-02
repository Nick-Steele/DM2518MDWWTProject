import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StyleSheet } from "react-native";
// import { Icon } from "react-native-elements";
import Icons from "../components/Icons";

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
    <StorageStack.Screen
      name="NewItem"
      component={NewItem}
      options={{ title: "Add New Item!" }}
    />
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
      <BottomTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icons packageType="FontAwesome5" name="home" focused={focused} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Storage"
        component={StorageStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icons packageType="Ionicons" name="md-basket" focused={focused} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Waste"
        component={WasteStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icons packageType="Ionicons" name="md-pie" focused={focused} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "More...",
          tabBarIcon: ({ focused }) => (
            <Icons
              packageType="MaterialCommunityIcons"
              name="dots-horizontal"
              focused={focused}
            />
          ),
        }}
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
