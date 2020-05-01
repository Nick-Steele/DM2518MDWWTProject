import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

import Firebase from "../config/Firebase";

const GraphScreen = () => {
  function LoggedInUser() {
    return (
      <View style={styles.profileView}>
        <TouchableOpacity>
          <Image
            style={styles.profileImage}
            source={
              { uri: Firebase.auth().currentUser.photoURL } ||
              require("../assets/profile_placeholder.png")
            }
          />
        </TouchableOpacity>
        <Text style={styles.profileName}>
          {Firebase.auth().currentUser.displayName}
        </Text>
      </View>
    );
  }

  function SignOutUser() {
    return (
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Firebase.auth().signOut();
          }}
        >
          <Image
            style={styles.buttonImage}
            source={require("../assets/profile_placeholder.png")}
          ></Image>
          <Text style={styles.buttonText}>Sign Out</Text>
          <Text style={styles.buttonTab}>></Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.scroll}>
        <View style={styles.profileContainer}>
          <LoggedInUser></LoggedInUser>
        </View>
        <View style={styles.settingsContainer}>
          <Text>Settings</Text>
          <Text>Settings</Text>
          <Text>Settings</Text>
          <Text>Settings</Text>
          <Text>Settings</Text>
          <SignOutUser></SignOutUser>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  scroll: {
    backgroundColor: "white",
  },
  profileContainer: {
    // backgroundColor: "powderblue",
  },
  profileView: {
    alignItems: "center",
    padding: 24,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  profileName: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "500",
  },
  settingsContainer: {
    height: 200,
    backgroundColor: "skyblue",
  },
  buttonView: {
    backgroundColor: "yellow",
  },
  button: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonImage: {
    height: 30,
    width: 30,
  },
  buttonText: {
    color: "#007AFF",
    marginLeft: 16,
  },
  buttonTab: {
    fontSize: 24,
    fontWeight: "600",
    alignSelf: "flex-end",
  },
});

export default GraphScreen;

// Sign Out Button testing
// This works for Android and IOS but not web
// onPress={() =>
//   Alert.alert("Sign Out", "Are you sure you want too sign out?", [
//     {
//       text: "Yes",
//       onPress: () => console.log("Signing out..."),
//       onPress: () => Firebase.auth().signOut(),
//     },
//     {
//       text: "Cancel",
//       onPress: () => console.log("Sign out aborted"),
//       style: "cancel",
//     },
//   ])
// }
