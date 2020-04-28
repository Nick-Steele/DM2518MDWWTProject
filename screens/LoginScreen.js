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
  Vibration
} from "react-native";
import {signIn} from '../Helpers/SignIn'

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
