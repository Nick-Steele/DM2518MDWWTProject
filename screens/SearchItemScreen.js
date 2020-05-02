import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  ListView,
  TouchableHighlight,
} from "react-native";
import { SearchBar } from "react-native-elements";

export default function SearchItemScreen({ navigation }) {
  function SearhItem() {
    super();
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      itemDataSource: ds,
    };
  }

  function getItems() {
    let items = [{ title: "Item One" }, { title: "Item Two" }];
    this.setState({
      itemDataSource: this.state.itemDataSource.cloneWithRows(items),
    });
  }

  navigation.setOptions({
    headerRight: () => (
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.push("NewItem")}
          style={{ padding: 10 }}
        >
          <Text style={{ color: "#0a84ff", fontSize: 18 }}>
            Add Custom Item
          </Text>
        </TouchableOpacity>
      </View>
    ),
  });

  function pressRow(item) {
    console.log(item);
  }

  function renderRow() {
    return (
      <TouchableHighlight
        onPress={() => {
          this.pressRow(item);
        }}
      >
        <View style={styles.li}>
          <Text style={styles.liText}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Food Database"
        lightTheme
        //onChangeText={this.updateSearch}
      />

      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      ></ListView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
  },
});
