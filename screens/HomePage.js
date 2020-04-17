import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

// Change Views holding components into FlatLists
// Load only 5 things
// If > 5 display "Load More Button"
// When pressed navigate to new page with list of all items in that day

const HomePage = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <Text style={[styles.bodyText, styles.topText]}>
          The food is going to expire
        </Text>
        <View style={styles.todayView}>
          <Text style={[styles.bodyText, styles.bodyTextMargin]}>- Today</Text>
          <View style={styles.other}>
            <View style={styles.component}>
              <Text style={styles.center}>Put Component Here...</Text>
            </View>
            <View style={styles.component}>
              <Text style={styles.center}>Put Component Here...</Text>
            </View>
            <View style={styles.component}>
              <Text style={styles.center}>Put Component Here...</Text>
            </View>
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
          <Text style={[styles.bodyText, styles.bodyTextMargin]}>
            - Tomorrow
          </Text>
          <View style={styles.other}>
            <View style={styles.component}>
              <Text style={styles.center}>Put Component Here...</Text>
            </View>
            <View style={styles.component}>
              <Text style={styles.center}>Put Component Here...</Text>
            </View>
          </View>
        </View>

        <View style={styles.threedaysView}>
          <Text style={[styles.bodyText, styles.bodyTextMargin]}>
            - Three days later
          </Text>
          <View style={styles.other}>
            <View style={styles.component}>
              <Text style={styles.center}>Put Component Here...</Text>
            </View>
          </View>
        </View>
        <Text style={[styles.bodyText, styles.bottomText]}>
          click the item for more options
        </Text>
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

export default HomePage;
