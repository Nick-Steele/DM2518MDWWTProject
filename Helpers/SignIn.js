import {Platform} from 'react-native';
import * as Google from 'expo-google-app-auth';
import {IOS_CLIENT_ID, ANDROID_CLIENT_ID} from 'react-native-dotenv';
import Firebase from "../config/Firebase";
import firebase from "firebase";
import {askForNotification} from './Token';

const onSignIn = (googleUser) => {
	// We need to register an Observer on Firebase Auth to make sure auth is initialized.
	var unsubscribe = Firebase.auth().onAuthStateChanged(function(firebaseUser) {
	  unsubscribe();
	  // Check if we are already signed-in Firebase with the correct user.
	  if (!isUserEqual(googleUser, firebaseUser)) {
		// Build Firebase credential with the Google ID token.
		var credential = firebase.auth.GoogleAuthProvider.credential(
			googleUser.idToken,
			googleUser.accessToken);
		// Sign in with credential from the Google user.
		Firebase.auth().signInWithCredential(credential).then(() => {
			askForNotification();
		}).catch(function(error) {
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
		console.log('User already signed-in Firebase.');
	  }
	  
	});
  }
  
  const isUserEqual = (googleUser, firebaseUser) => {
	if (firebaseUser) {
	  var providerData = firebaseUser.providerData;
	  for (var i = 0; i < providerData.length; i++) {
		if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
			providerData[i].uid === googleUser.getBasicProfile().getId()) {
		  // We don't need to reauth the Firebase connection.
		  return true;
		}
	  }
	}
	return false;
  }

  async function signInBrowser() {
	var provider = new firebase.auth.GoogleAuthProvider();
	Firebase.auth().signInWithPopup(provider).then(() => {
		// Ask for push notification token, then get and store token
		askForNotification();

	}).catch((error) => {

	});
  }
  
  async function signInMobile() {
	try {
	  const result = await Google.logInAsync({
		androidClientId: ANDROID_CLIENT_ID,
		iosClientId: IOS_CLIENT_ID,
		scopes: ['profile', 'email'],
	  });
  
	  if (result.type === 'success') {
		onSignIn(result);
		return result.accessToken;
	  } else {
		return { cancelled: true };
	  }

	} catch (e) {
	  return { error: true };
	}
  }

 export const signIn = async () => {
	Platform.OS != 'web' ? signInMobile() : signInBrowser()
  };