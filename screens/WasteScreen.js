import * as React from 'react'
import {View, Text, TouchableHighlight} from 'react-native'

export default function WasteScreen({navigation}){
	return (
		<View>
			<Text>WasteScreen</Text>
			<TouchableHighlight onPress={() => navigation.push("TestChildScreen")}>
				<Text style={{color: '#007AFF'}}>Yai</Text>
			</TouchableHighlight>
		</View>
	)
}