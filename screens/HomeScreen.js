import * as React from 'react'
import {View, Text, TouchableHighlight} from 'react-native'
import Firebase from '../config/Firebase'

export default function HomeScreen({navigation}){
	return (
		<View>
			<Text>Hello {Firebase.auth().currentUser.displayName}!</Text>
			<TouchableHighlight onPress={() => navigation.push("TestChildScreen")} >
				<Text style={{color: '#007AFF'}}>Yai</Text>
			</TouchableHighlight>
			<TouchableHighlight onPress={() => Firebase.auth().signOut()} >
				<Text style={{color: '#007AFF'}}>Sign Out</Text>
			</TouchableHighlight>
		</View>
	)
}