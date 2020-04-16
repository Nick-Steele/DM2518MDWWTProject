import React from "react";
import { StyleSheet, View, } from "react-native";
import LoginScreen from "./screens/loginScreen";
import NewItem from "./screens/NewItem";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <LoginScreen></LoginScreen> */}
      <NewItem></NewItem>
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