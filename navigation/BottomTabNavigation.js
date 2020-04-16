
import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import StorageScreen from '../screens/StorageScreen'
import WasteScreen from '../screens/WasteScreen'
import TestChildScreen from '../screens/TestChildScreen'

const BottomTab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const StorageStack = createStackNavigator();
const WasteStack = createStackNavigator();

const HomeStackScreen = () => (
	<HomeStack.Navigator>
		<HomeStack.Screen name="Home" component={HomeScreen}/>
		<StorageStack.Screen name="TestChildScreen" component={TestChildScreen}/>
	</HomeStack.Navigator>
);

const StorageStackScreen = () => (
	<StorageStack.Navigator>
		<StorageStack.Screen name="Storage" component={StorageScreen}/>
		<StorageStack.Screen name="TestChildScreen" component={TestChildScreen}/>
	</StorageStack.Navigator>
);

const WasteStackScreen = () => (
	<WasteStack.Navigator>
		<WasteStack.Screen name="Waste Analytics" component={WasteScreen}/>
		<StorageStack.Screen name="TestChildScreen" component={TestChildScreen}/>
	</WasteStack.Navigator>
);

export default function BottomTabNavigator() {
	return (
		<BottomTab.Navigator
			tabBarOptions={{

			}}
		>
			<BottomTab.Screen name="Home" component={HomeStackScreen} options={{}}/>
			<BottomTab.Screen name="Storage" component={StorageStackScreen} options={{}}/>
			<BottomTab.Screen name="Waste" component={WasteStackScreen} options={{}}/>
		</BottomTab.Navigator>
	);
}