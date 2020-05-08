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
import { getWasteFoodCollection } from "../Helpers/ItemHelper";
// Reads in the local data and creates an object
// This is then read in by wasteScreen to display data

const readWasted = () => {
  const [theData, setTheData] = React.useState([
    {
      name: "Meat",
      wasted: 1,
      color: "salmon",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ]);

  // Read data and append it to the list
  const appendData = (props) => {
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

  return theData;
};

export default readWasted;

// Issue:
// Each item is a seperate get which means that

// Option 1
// Read all data
