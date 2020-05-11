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

  const [mat, setMat] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getItems().then((x) => setMat(x));
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  console.log(mat);
  if (loading) {
    console.log("loading true", mat);
    return <LoadingScreen />;
  } else {
    console.log("loading false", mat);
    return (
      <MenuProvider>
        <SafeAreaView style={styles.safeContainer}>
          <View></View>
          <ScrollView style={styles.container}>
            <FlatList
              style={{ flex: 1, marginTop: 10 }}
              data={mat}
              renderItem={({ item, index }) => {
                return Listitem(item, navigation);
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
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
