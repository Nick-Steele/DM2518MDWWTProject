import React from "react";
import { StyleSheet, View } from "react-native";
import MainNavigator from "./navigation/MainNavigator";
import { LoginScreen, NewItem, TestChildScreen } from "./screens";

import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default function App(props) {
  return (
    <View style={styles.container}>
      {/* <LoginScreen/> */}
      {/* <NewItem></NewItem> */}
      {<MainNavigator props={props} />}
      {/* <Item><TestChildScreen/></Item>  */}
      {/* <TestChildScreen/> */}
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
