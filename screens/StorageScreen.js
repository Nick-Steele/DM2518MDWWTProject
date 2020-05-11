import * as React from "react";

import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getItems } from "../Helpers/ItemHelper";
import Listitem from "../components/Listitem";
import { MenuProvider } from "react-native-popup-menu";
import LoadingScreen from "./LoadingScreen";

export default function StorageScreen({ navigation }) {
  navigation.setOptions({
    headerRight: () => (
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.push("SearchItems")}
          style={{ padding: 10 }}
        >
          <Text style={{ color: "#0a84ff", fontSize: 18 }}>Add</Text>
        </TouchableOpacity>
      </View>
    ),
    headerLeft: () => (
      <View style={{ marginLeft: 10 }}>
        <TouchableOpacity
          onPress={() => {
            alert("Filter");
          }}
          style={{ padding: 10 }}
        >
          <Text style={{ color: "#0a84ff", fontSize: 18 }}>Filter</Text>
        </TouchableOpacity>
      </View>
    ),
  });

  const [state, setState] = React.useState({allFood: [], visibleFood: []});
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getItems().then((x) => setState({allFood: x, visibleFood: x}));
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("IM in focus");
      getItems().then((x) => setState({allFood: x, visibleFood: x}));

    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return <LoadingScreen />;
  } else {
    return (
      <MenuProvider>
        <SafeAreaView style={styles.safeContainer}>
          <View>
          </View>
            <FlatList
              style={{ flex: 1, marginTop: 10 }}
              data={state.visibleFood}
              renderItem={({ item, index }) => {
                return Listitem(item, navigation);
              }}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={13}
            />
       </SafeAreaView>
      </MenuProvider>
    );
  }
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
