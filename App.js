import React from "react";
import { StyleSheet, Text, View } from "react-native";

import LoginScreen from "./screens/loginScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen></LoginScreen>
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
