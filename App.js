import React from "react";
import { StyleSheet, View } from "react-native";

import MainNavigator from "./navigation/MainNavigator";
import { LoginScreen, HomePage, NewItem } from "./screens";

export default function App(props) {
  return (
    <View style={styles.container}>
      {/*<LoginScreen/>*/}
      {/*<NewItem></NewItem>*/}
      <MainNavigator props={props} />
      {/* <HomePage></HomePage> */}
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
