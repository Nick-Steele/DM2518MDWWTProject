import React from "react";
import { StyleSheet, View, } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import NewItem from "./screens/NewItem";
import MainNavigator from "./navigation/MainNavigator"

export default function App(props) {
  return (
    <View style={styles.container}>
      {/*<LoginScreen/>*/}
      {/*<NewItem></NewItem>*/}
      <MainNavigator props={props}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "grey",
    // alignItems: "center",
    // justifyContent: "center",
  },
});