import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Button } from "react-native";
import { SearchBar } from "react-native-elements";
import {
  searchItem,
  getItemsFoodCollection,
  getItems,
  addItem,
} from "../Helpers/ItemHelper";

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

  renderFoundItem() {
    return (
      <View>
        <Text>Hi!</Text>
      </View>
    );
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

        <Button
          title="Add to storage"
          onPress={() => {
            var item = searchItem(search);
            item.then(function (v) {
              addItem(v);
            });
          }}
        ></Button>
      </View>
    );
  }
}

const styles = new StyleSheet.create({});
