import React from "react";
import {
  StyleSheet,
  View,
  ListView,
  TouchableHighlight,
  Text,
} from "react-native";
import { SearchBar } from "react-native-elements";

export default class App extends React.Component {
  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  constructor() {
    super();
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      itemDataSouce: ds,
    };

    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  componentWillMount() {
    this.getItems();
  }
  componentDidMount() {
    this.getItems();
  }
  getItems() {
    let items = [{ title: "Item One" }, { title: "Item Two" }];

    this.setState({
      itemDataSouce: this.state.itemDataSouce.cloneWithRows(items),
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
          <Text style={styles.liText}>{item.title}</Text>
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
