import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
} from "react-native";
import * as Google from "expo-google-app-auth";
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from "react-native-dotenv";
import Firebase from "../config/Firebase";
import firebase from "firebase";

const onSignIn = (googleUser) => {
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );
      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    } else {
      console.log("User already signed-in Firebase.");
    }
  });
};

const isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};

const signIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  Firebase.auth().signInWithPopup(provider);
};

async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: ANDROID_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      onSignIn(result);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logoSizeView}>
            <Image
              style={styles.logo}
              source={require("../assets/mainLogo.png")}
            ></Image>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailsSizeView}>
            <TextInput style={styles.userNameText} placeholder="Username..." />
            <TextInput
              style={styles.userNameText}
              secureTextEntry={true}
              placeholder="Password..."
            />
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Alert", "Forgot your password button pressed");
              }}
            >
              <View style={styles.btnForgotView}>
                <Text style={styles.btnForgotText}>Forgot your password?</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <View style={styles.btnSizeView}>
            <TouchableOpacity
              onPress={() => {
                Platform.OS != "web" ? signInWithGoogleAsync() : signIn();
              }}
            >
              <View style={styles.btnGoogleLoginView}>
                <Image
                  style={styles.googleImage}
                  source={{
                    uri:
                      "https://techcrunch.com/wp-content/uploads/2013/05/google-plus-logo.png?w=730&crop=1 ",
                  }}
                ></Image>
                <Text style={styles.btnGoogleLoginText}>
                  Sign in with Google
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Alert", "Login button pressed");
              }}
            >
              <View style={styles.btnLoginView}>
                <Text style={styles.btnLoginText}>Login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Alert", "Register button pressed");
              }}
            >
              <View style={styles.btnRegisterView}>
                <Text style={styles.btnRegisterText}>Register</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Alert", "Terms of service button pressed");
              }}
            >
              <View style={styles.btnTermsView}>
                <Text style={styles.btnTermsText}>Terms of service</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  logoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoSizeView: {
    flex: 1,
    maxWidth: 500,
    maxHeight: 500,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 1,
    resizeMode: "contain",
    minWidth: 300,
  },

  detailsContainer: {
    flex: 1,
    paddingLeft: 60,
    paddingRight: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsSizeView: {
    flex: 1,
    maxWidth: 600,
  },
  userNameText: {
    fontSize: 20,
    height: 60,
    paddingTop: 20,
    borderBottomWidth: 1,
  },
  btnForgotView: {
    alignSelf: "flex-end",
  },
  btnForgotText: {
    color: "grey",
    alignSelf: "flex-end",
    paddingTop: 8,
  },

  btnContainer: {
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnGoogleLoginView: {
    borderRadius: 5,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#db4a37",
  },
  googleImage: {
    width: 30,
    height: 30,
  },
  btnGoogleLoginText: {
    color: "white",
    padding: 15,
  },
  btnLoginView: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 16,
  },
  btnLoginText: {
    color: "white",
    padding: 15,
  },
  btnRegisterView: {
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 16,
  },
  btnRegisterText: {
    color: "black",
    padding: 15,
  },
  btnTermsView: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnTermsText: {
    color: "grey",
  },
  btnSizeView: {
    flex: 1,
    maxWidth: 600,
  },
});

export default LoginScreen;
