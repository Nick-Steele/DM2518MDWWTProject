import React from "react";
import { StyleSheet, View } from "react-native";

import MainNavigator from "./navigation/MainNavigator";
import { LoginScreen, NewItem } from "./screens";

export default function App(props) {
  return (
    <View style={styles.container}>
      {/*<LoginScreen/>*/}
      {/*<NewItem></NewItem>*/}
      <MainNavigator props={props} />
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
