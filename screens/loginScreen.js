import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import Firebase from '../config/Firebase'
import firebase from 'firebase'

const signIn = () => {
  /*var provider = new firebase.auth.GoogleAuthProvider();
  Firebase.auth().signInWithPopup(provider)*/
  // Using a redirect.
firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token.
    var token = result.credential.accessToken;
  }
  var user = result.user;
});
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithRedirect(provider);
}

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Image
            style={styles.logo}
            source={{
              uri:
                "https://designshack.net/wp-content/uploads/hipster-logos.jpg",
            }}
          ></Image>
        </View>

        <View style={styles.detailsContainer}>
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

        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => {
              signIn();
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
              <Text style={styles.btnGoogleLoginText}>Sign in with Google</Text>
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
  logoView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "grey",
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: 150,
    alignItems: "center",
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 60,
    paddingRight: 60,
    justifyContent: "center",
    // backgroundColor: "lightgrey",
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
    justifyContent: "center",
    paddingLeft: 50,
    paddingRight: 50,
    // backgroundColor: "skyblue",
  },
  btnGoogleLoginView: {
    borderRadius: 5,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
});

export default LoginScreen;
