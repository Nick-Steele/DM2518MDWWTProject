import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { PieChart } from "react-native-chart-kit";
import readWasted from "../Helpers/readWasted";

const GraphScreen = () => {
  const screenWidth = Dimensions.get("window").width - 32;
  const screenHeight = Dimensions.get("window").height / 3.5;
  // Used to toggle details of graph
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [theData, setTheData] = React.useState([
    {
      name: "Dairy",
      wasted: 5,
      color: "skyblue",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Meat",
      wasted: 1,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Vegetables",
      wasted: 2,
      color: "lightgreen",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Fruit",
      wasted: 2,
      color: "yellow",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ]);

  // Adds a new legend and catagory to chart (Adds to the bottom)
  const addItem = (props) => {
    setTheData((prevItem) => {
      return [
        ...prevItem,
        {
          name: name,
          wasted: wasted,
          color: color,
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
      ];
    });
  };

  // Dont Remove... Serves no function... it will make things crash though...
  const chartConfig = {
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Text style={styles.titleText}>Select Analytics</Text>
      <View style={styles.dropDownContainer}>
        <View style={styles.dropDownView}>
          <Text>DropDown Here...</Text>
          <TouchableOpacity
            onPress={() => {
              addItem((name = "Testing"), (wasted = 5), (color = "purple"));
            }}
          >
            <Text>Click to test addItem</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.graphContainer}>
        <View style={styles.graphView}>
          <TouchableOpacity
            onPress={() => {
              setIsEnabled((previousState) => !previousState);
            }}
          >
            <Text style={styles.graphTitle}>Pie Chart</Text>
            <PieChart
              data={theData}
              width={screenWidth}
              height={screenHeight}
              chartConfig={chartConfig}
              style={styles.chartStyle}
              accessor="wasted"
              paddingLeft="15"
              backgroundColor="powderblue"
              absolute={isEnabled} //for the absolute number remove if you want percentage
            />
          </TouchableOpacity>
          <Text style={styles.detailText}>Click for more details...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
    marginTop: 16,
  },
  dropDownContainer: {
    flex: 1,
  },
  dropDownView: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: "center",
    backgroundColor: "white",
  },
  graphContainer: {
    flex: 6,
    paddingTop: 8,
    paddingBottom: 8,
  },
  graphView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  graphTitle: {
    textAlign: "center",
    fontSize: 20,
    padding: 16,
  },
  chartStyle: {
    // flex: 1,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: "powderblue",
  },
  detailText: {
    fontSize: 12,
    marginRight: 24,
    alignSelf: "flex-end",
  },
});

export default GraphScreen;
