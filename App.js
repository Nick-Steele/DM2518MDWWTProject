import React from "react";
import { StyleSheet, View, } from "react-native";

import ShowList from "./components/Example";
import { MenuProvider } from "react-native-popup-menu";

export default function App(props) {
  return (
    <MenuProvider>
      <View style={styles.container}>
        {/* <LoginScreen></LoginScreen> */}
        {/* <NewItem></NewItem> */}
        <ShowList></ShowList>
      </View>
    </MenuProvider>
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
