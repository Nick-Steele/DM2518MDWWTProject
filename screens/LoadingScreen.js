import * as React from 'react'
import {View, ActivityIndicator} from 'react-native'

export default function LoadingScreen(){
	return (
		<View style={{flex: 1,justifyContent: 'center', alignContent: 'center'}}>
			<ActivityIndicator size={60} color="grey"/>
		</View>
	)
}