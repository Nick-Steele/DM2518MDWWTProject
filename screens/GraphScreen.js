import * as React from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

const GraphScreen = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <Text style={[styles.bodyText, styles.topText]}>Select Analytics</Text>
        <View style={styles.todayView}>
          <View style={styles.other}>
            <View style={styles.component}></View>
            <View style={styles.component}></View>
            <View style={styles.component}></View>
            <View style={styles.loadMoreView}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Alert", "Loading more items");
                }}
              >
                <Text>Load more...</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.tomorrowView}>
          <View style={styles.other}>
            <View style={styles.component}></View>
            <View style={styles.component}></View>
          </View>
        </View>

        <View style={styles.threedaysView}>
          <View style={styles.other}>
            <View style={styles.component}></View>
          </View>
        </View>
      </ScrollView>
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
  todayView: {
    flex: 1,
    backgroundColor: "powderblue",
    marginBottom: 8,
  },
  tomorrowView: {
    flex: 1,
    backgroundColor: "lightgreen",
    marginBottom: 8,
  },
  threedaysView: {
    flex: 1,
    backgroundColor: "yellow",
  },
  bodyText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  topText: {
    marginLeft: 16,
    marginTop: 16,
  },
  bodyTextMargin: {
    marginLeft: 40,
  },
  bottomText: {
    alignSelf: "flex-end",
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  other: {
    flex: 1,
    backgroundColor: "pink",
  },
  component: {
    height: 100,
    borderBottomWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  loadMoreView: {
    alignItems: "center",
    backgroundColor: "orange",
    padding: 8,
  },
});

export default GraphScreen;
