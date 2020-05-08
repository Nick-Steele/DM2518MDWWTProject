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

// Reads in the local data and creates an object
// This is then read in by wasteScreen to display data

const readWasted = () => {
  const [theData, setTheData] = React.useState([
    {
      name: "Meat",
      wasted: 1,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ]);
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
