import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from "../screens/LoginScreen"

const Stack = createStackNavigator();

export default function AuthNavigation(){
	return (
		<Stack.Navigator
		screenOptions={{
			headerShown: false
		  }}>
			<Stack.Screen name="Login" component={LoginScreen}/>
		</Stack.Navigator>
	)
}