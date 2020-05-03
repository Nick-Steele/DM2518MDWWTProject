import * as React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

export default function Icons(props) {
  return (
    <IconFromPackage
      packageType={props.packageType}
      name={props.name}
      focused={props.focused}
    ></IconFromPackage>
  );
}

const IconFromPackage = (props) => {
  switch (props.packageType) {
    case "Ionicons":
      return (
        <Ionicons
          name={props.name}
          size={30}
          style={{ marginBottom: -3 }}
          color={props.focused ? "grey" : "lightgrey"}
        />
      );
      break;

    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons
          name={props.name}
          size={30}
          style={{ marginBottom: -3 }}
          color={props.focused ? "grey" : "lightgrey"}
        />
      );
      break;

    case "FontAwesome5":
      return (
        <FontAwesome5
          name={props.name}
          size={30}
          style={{ marginBottom: -3 }}
          color={props.focused ? "grey" : "lightgrey"}
        />
      );
  }
};
