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

  constructor({ navigation }) {
    super();

    this.navigation = navigation;
    console.log("**Navigation**");
    console.log(navigation);
    // this.nav();

    // let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    // this.state = {
    //   itemDataSouce: ds,
    // };
    // this.itemsRef = this.getRef().child("Foodcollection");
    // this.renderRow = this.renderRow.bind(this);
    // this.pressRow = this.pressRow.bind(this);
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

  // getRef() {
  //   return Firebase.database().ref();
  // }

  // componentWillMount() {
  //   this.getItems(this.itemsRef);
  // }
  // componentDidMount() {
  //   this.getItems(this.itemsRef);
  // }
  // getItems() {
  //   //let items = [{ title: "Item One" }, { title: "Item Two" }];
  //   this.itemsRef.on("value", () => (snap) => {
  //     let items = [];
  //     snap.array.forEach((child) => {
  //       items.push({
  //         title: child.value.name,
  //         _key: child.key,
  //       });
  //     });
  //     this.setState({
  //       itemDataSouce: this.state.itemDataSouce.cloneWithRows(items),
  //     });
  //   });
  // }

  // pressRow(item) {
  //   console.log(item);
  // }

  // renderRow(item) {
  //   return (
  //     <TouchableHighlight
  //       onPress={() => {
  //         this.pressRow(item);
  //       }}
  //     >
  //       <View style={styles.li}>
  //         <Text style={styles.liText}>{item.name}</Text>
  //       </View>
  //     </TouchableHighlight>
  //   );
  // }

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
        <Button
          title="Add Custom Item"
          onPress={() => this.navigation.push("NewItem")}
        ></Button>
      </View>
    );
  }
}

const styles = new StyleSheet.create({
  liText: {
    fontSize: 16,
  },
});
