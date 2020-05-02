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
  Alert,
} from "react-native";

import Firebase from "../config/Firebase";
import Icons from "../components/Icons";

const SettingsScreen = () => {
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
            Firebase.auth().signOut();
          }}
        >
          <View style={styles.textIconView}>
            <Icons packageType="Ionicons" name="md-log-out" focused={false} />
            <Text style={styles.buttonText}>Sign Out</Text>
          </View>
          <View></View>
        </TouchableOpacity>
      </View>
    );
  }

  function LinkButton(props) {
    return (
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert("Test");
          }}
        >
          <View style={styles.textIconView}>
            <Icons
              packageType={props.packageType}
              name={props.name}
              focused={false}
            />
            <Text style={styles.buttonText}>{props.text}</Text>
          </View>
          <View style={styles.iconEnd}>
            <Icons
              packageType="Ionicons"
              name="md-arrow-dropright"
              focused={false}
            />
          </View>
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
          <LinkButton
            text="Units"
            packageType="Ionicons"
            name="md-stats"
          ></LinkButton>
          <LinkButton
            text="Location"
            packageType="Ionicons"
            name="md-locate"
          ></LinkButton>
          <LinkButton
            text="Time Zone"
            packageType="Ionicons"
            name="md-time"
          ></LinkButton>
          <LinkButton
            text="Date Format"
            packageType="Ionicons"
            name="md-calendar"
          ></LinkButton>
          <LinkButton
            text="Settings"
            packageType="Ionicons"
            name="md-settings"
          ></LinkButton>
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
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    marginBottom: 10,
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
    fontSize: 20,
    fontWeight: "400",
  },
  settingsContainer: {
    backgroundColor: "skyblue",
  },
  buttonView: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    backgroundColor: "#fafafa",
  },
  button: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textIconView: {
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#007AFF",
    marginLeft: 5,
    fontSize: 18,
    padding: 10,
  },
  buttonTab: {
    fontSize: 24,
    fontWeight: "600",
  },
  iconEnd: {
    marginRight: 8,
    justifyContent: "center",
  },
});

export default SettingsScreen;

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
