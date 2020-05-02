import React from "react";
import {
  StyleSheet,
  View,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Firebase from "../config/Firebase";
import { searchItem, getItemsFoodCollection } from "../Helpers/ItemHelper";

export default class App extends React.Component {
  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
    searchItem(search); //Automatically Query the database each time user inputs.
  };

  constructor({ navigation }) {
    super();
    console.log("Food Collection Items For Nick");
    this.updateData();
    this.navigation = navigation;
    this.nav();

    this.foodData = [];
    // let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    // this.state = {
    //   itemDataSouce: ds,
    // };
    // this.itemsRef = this.getRef().child("Foodcollection");
    // this.renderRow = this.renderRow.bind(this);
    // this.pressRow = this.pressRow.bind(this);
  }

  updateData() {
    getItemsFoodCollection();
  }

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

        {/* <ListView
          dataSource={this.state.itemDataSouce}
          renderRow={this.renderRow}
        ></ListView> */}
      </View>
    );
  }
}

const styles = new StyleSheet.create({
  liText: {
    fontSize: 16,
  },
});
