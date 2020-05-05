import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
  FlatList,
} from "react-native";
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
      data: [
        {
          category: "Fruit",
          title: "Banana",
        },
        {
          category: "Fruit",
          title: "Orange",
        },
        {
          category: "Meat",
          title: "Beef",
        },
      ],
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
            <Text style={{ color: "#0a84ff", fontSize: 18 }}>New Item</Text>
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
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <View style={styles.TouchableOpacityView}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.itemTitleText}>{item.title}</Text>
                <Text style={styles.itemCategoryText}>{item.category}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
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

const styles = new StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTitleText: {
    fontSize: 20,
  },
  itemCategoryText: {
    fontSize: 20,
  },
});
