import React from "react";
import {
  StyleSheet,
  View,
  ListView,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  Text,
  Button,
  NativeModules,
} from "react-native";
import { SearchBar } from "react-native-elements";
import {
  searchItem,
  getItemsFoodCollection,
  addItem,
} from "../Helpers/ItemHelper";
import Firebase from "../config/Firebase";
import { getAutoFocusEnabled } from "expo/build/AR";
import { storageScreen } from "../screens/StorageScreen";

import { parseData } from "../screens/NewItem";

export default class App extends React.Component {
  constructor({ navigation }) {
    super();

    this.state = {
      search: "",
      data: getItemsFoodCollection(),
    };
    this.navigation = navigation;
    this.nav();
  }

  updateSearch = (search) => {
    this.setState({ search });
    //Automatically Query the database each time User Inputs.
    //searchItem(search);
  };

  nav() {
    this.navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => this.navigation.push("NewItem")}
            style={{ padding: 10 }}
          >
            <Text style={{ color: "#0a84ff", fontSize: 18 }}>
              Add Custom Item
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }

  render() {
    const { search } = this.state;
    return (
      <View>
        <SearchBar
          lightTheme
          placeholder="Search Food Database"
          onChangeText={this.updateSearch}
          value={search}
        />
        <Button title="Test Search" onPress={searchItem(search)}></Button>

        <Button
          title="Add to storage"
          onPress={() => {
            var item = searchItem(search);
            item.then(function (v) {
              addItem(v);
              console.log(v);
            });
          }}
        ></Button>
      </View>
    );
  }
}

const styles = new StyleSheet.create({
  liText: {
    fontSize: 16,
  },
  flatlist: {
    backgroundColor: "yellow",
  },
});
