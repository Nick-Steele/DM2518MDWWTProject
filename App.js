import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { LoginScreen, HomePage } from "./screens";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <LoginScreen></LoginScreen> */}
      <HomePage></HomePage>
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
