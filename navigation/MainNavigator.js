import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Firebase from "../config/Firebase";

import BottomTabNavigation from "./BottomTabNavigation";
import AuthNavigation from "./AuthNavigation";
import LoadingScreen from "../screens/LoadingScreen";
<<<<<<< HEAD
import { WasteScreen, HomeScreen } from "../screens";
=======
>>>>>>> 410debfd87a52319382d0836daa67b8c4f4a1028

function MainStackNavigator({ props }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(false);

  // Handle user state changes
  function authenticationObserver(user) {
    setUser(user);
    if (isLoading) setIsLoading(false);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 500);

    const subscriber = Firebase.auth().onAuthStateChanged(
      authenticationObserver
    );
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <LoadingScreen />
      ) : user ? (
        <BottomTabNavigation props={props} />
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
}

export default MainStackNavigator;
