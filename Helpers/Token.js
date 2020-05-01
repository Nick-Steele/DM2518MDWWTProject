import {Platform, Vibration} from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Firebase from "../config/Firebase";

const _handleNotification = notification => {
  Vibration.vibrate();
  console.log(notification);
};

const addUserPushNotification = pushToken => {
  currentUid = Firebase.auth().currentUser.uid;
  Firebase.firestore().collection('tokens').doc(currentUid).set({
    expoPushToken : pushToken
  }).then(() => console.log("Push notificaton added!")).catch(error => console.error("Couldn't add the push notification ", error));
}

const registerForPushNotifications = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync();
    // register token
    addUserPushNotification(token);
    console.log(token);
  } else {
  console.log('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
};

export const askForNotification = async () => {
	registerForPushNotifications();
	Notifications.addListener(_handleNotification);
}