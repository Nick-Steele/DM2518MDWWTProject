import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
  Button,
} from "react-native";

import { PieChart } from "react-native-chart-kit";
import readWasted from "../Helpers/readWasted";
import { getWasteFoodCollection } from "../Helpers/ItemHelper";

const GraphScreen = () => {
  const screenWidth = Dimensions.get("window").width - 32;
  const screenHeight = Dimensions.get("window").height / 3.5;

  // Used to toggle details of graph
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [theGraphTitle, setTheGraphTitle] = React.useState(true);
  const [theData, setTheData] = React.useState([
    {
      name: "dairy",
      wasted: 0,
      color: "skyblue",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "meat",
      wasted: 0,
      color: "salmon",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "vegetables",
      wasted: 0,
      color: "lightgreen",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "fruit",
      wasted: 0,
      color: "yellow",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ]);

  // Get the data
  // Filter data depending on graphType
  // Cycle through filtered data and set variabels using case
  // Update static data with new waste amount for graphType
  const changeGraphType = (props) => {
    getWasteFoodCollection().then((value) => {
      var dairyCount = 0;
      var meatCount = 0;
      var vegetablesCount = 0;
      var fruitCount = 0;

      // Set the graphs title
      setTheGraphTitle(props.graphTitle);

      // Filter data depending on graphType
      var filteredData;

      switch (props.graphType) {
        case "week":
          filteredData = value;
          break;
        case "month":
          filteredData = value;
          break;
        case "year":
          filteredData = value;
          break;
        case "life":
          filteredData = value;
          break;
      }

      console.log("The length of value is: ", value);
      console.log("The graph type is: ", props.graphType);

      // getItems().then( items => var itemDate = new Date(items[0].date) )

      // Cycle through filtered data and set variabels using case
      for (var i = 0; i < filteredData.length; i++) {
        switch (value[i].category) {
          case "dairy":
            dairyCount++;
            break;
          case "meat":
            meatCount++;
            break;
          case "veg":
            vegetablesCount++;
            break;
          case "fruit":
            fruitCount++;
            break;
          default:
          // Do Nothing...
        }
      }
      console.log(dairyCount);
      console.log(meatCount);
      console.log(vegetablesCount);
      console.log(fruitCount);

      // Update static data with new waste amount for graphType
      updateWasteAmount({ name: "dairy", quantity: dairyCount });
      updateWasteAmount({ name: "meat", quantity: meatCount });
      updateWasteAmount({ name: "vegetables", quantity: vegetablesCount });
      updateWasteAmount({ name: "fruit", quantity: fruitCount });
    });
  };

  // Adds a new legend and catagory to chart (Adds to the bottom)
  const addItem = (props) => {
    setTheData((prevItem) => {
      return [
        ...prevItem,
        {
          name: props.name,
          wasted: props.wasted,
          color: props.color,
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
      ];
    });
  };

  const deleteItem = (name) => {
    setTheData((prevItem) => {
      return prevItem.filter((item) => item.name != name);
    });
  };

  const updateWasteAmount = (props) => {
    // Gets the item data
    var newData = theData.filter((item) => item.name == props.name);
    newData[0].wasted = props.quantity;

    // Deletes the item data
    deleteItem((name = props.name));

    // Appends the updated item data
    setTheData((prevItem) => {
      return [...prevItem, newData[0]];
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              changeGraphType({ graphType: "week", graphTitle: "1 Week" });
            }}
          >
            <Text>1 Week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              changeGraphType({ graphType: "month", graphTitle: "1 Month" });
            }}
          >
            <Text>1 Month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              changeGraphType({ graphType: "year", graphTitle: "1 Year" });
            }}
          >
            <Text>1 Year</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              changeGraphType({ graphType: "life", graphTitle: "Life Span" });
            }}
          >
            <Text>Life Span</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            addItem({ name: "Testing", wasted: 5, color: "purple" });
          }}
        >
          <Text>Click to test addItem</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.graphContainer}>
        <View style={styles.graphView}>
          <TouchableOpacity
            onPress={() => {
              setIsEnabled((previousState) => !previousState);
            }}
          >
            <Text style={styles.graphTitle}>{theGraphTitle}</Text>

            <PieChart
              data={theData}
              width={screenWidth}
              height={screenHeight}
              chartConfig={chartConfig}
              style={styles.chartStyle}
              accessor="wasted"
              paddingLeft="15"
              backgroundColor="powderblue"
              absolute={isEnabled} // Switch for absolute number and percentage
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
    // padding: 16,
    flexDirection: "row",
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
  button: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "skyblue",
  },
});

export default GraphScreen;

// const [theData, setTheData] = React.useState([
//   {
//     name: "Dairy",
//     wasted: 5,
//     color: "skyblue",
//     legendFontColor: "#7F7F7F",
//     legendFontSize: 15,
//   },
//   {
//     name: "Meat",
//     wasted: 1,
//     color: "salmon",
//     legendFontColor: "#7F7F7F",
//     legendFontSize: 15,
//   },
//   {
//     name: "Vegetables",
//     wasted: 2,
//     color: "lightgreen",
//     legendFontColor: "#7F7F7F",
//     legendFontSize: 15,
//   },
//   {
//     name: "Fruit",
//     wasted: 2,
//     color: "yellow",
//     legendFontColor: "#7F7F7F",
//     legendFontSize: 15,
//   },
// ]);
