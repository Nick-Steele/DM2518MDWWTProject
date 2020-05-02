import React from "react";
import {
  StyleSheet,
  View,
  ListView,
  TouchableHighlight,
  Text,
  Button,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Firebase from "../config/Firebase";
import { searchItem } from "../Helpers/ItemHelper";

export default class App extends React.Component {
  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
    searchItem(search); //Automatically Query the database each time user inputs.
  };

  constructor() {
    super();
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      itemDataSouce: ds,
    };
    this.itemsRef = this.getRef().child("Foodcollection");
    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  getRef() {
    return Firebase.database().ref();
  }

  componentWillMount() {
    this.getItems(this.itemsRef);
  }
  componentDidMount() {
    this.getItems(this.itemsRef);
  }
  getItems() {
    //let items = [{ title: "Item One" }, { title: "Item Two" }];
    this.itemsRef.on("value", () => (snap) => {
      let items = [];
      snap.array.forEach((child) => {
        items.push({
          title: child.value.name,
          _key: child.key,
        });
      });
      this.setState({
        itemDataSouce: this.state.itemDataSouce.cloneWithRows(items),
      });
    });
  }

  pressRow(item) {
    console.log(item);
  }

  renderRow(item) {
    return (
      <TouchableHighlight
        onPress={() => {
          this.pressRow(item);
        }}
      >
        <View style={styles.li}>
          <Text style={styles.liText}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
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

        <ListView
          dataSource={this.state.itemDataSouce}
          renderRow={this.renderRow}
        ></ListView>
      </View>
    );
  }
}

const styles = new StyleSheet.create({
  liText: {
    fontSize: 16,
  },
});
