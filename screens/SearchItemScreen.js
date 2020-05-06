import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
  FlatList,
  Modal,
} from "react-native";
import { SearchBar } from "react-native-elements";
import {
  searchItem,
  getItemsFoodCollection,
  getItems,
  addItem,
} from "../Helpers/ItemHelper";
import Dialog from "react-native-dialog";

export default class App extends React.Component {
  constructor({ navigation }) {
    super();
    this.state = {
      search: "",
      modalVisible: false,
      dataFromDB: [],

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
    this.nav(); //Display the top nar bar content.

    // getItemsFoodCollection().then((value) => {
    //   this.setState({ dataFromDB: value });
    // });
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
      <View style={styles.container}>
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
          title="Test Modal"
          onPress={() => this.setState({ modalVisible: true })}
        >
          {" "}
        </Button>

        <Button
          title="Add to storage"
          onPress={() => {
            var item = searchItem(search);
            item.then(function (v) {
              if (v !== null || v !== undefined) {
                var item = v;
                console.log("Add Item: " + v.name + v.category);
                //addItem(v);
              } else {
                console.log("This item does not exist, try making your own");
              }
            });
          }}
        ></Button>

        <Modal visible={this.state.modalVisible} animationType="slide">
          <View style={{ flex: 1, backgroundColor: "yellow" }}>
            <Text>Hello from modal</Text>
            <Button
              title="Quit Modal"
              onPress={() => this.setState({ modalVisible: false })}
            ></Button>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = new StyleSheet.create({
  container: { flex: 1 },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    borderRadius: 20,
  },
  itemTitleText: {
    fontSize: 20,
  },
  modalContent: { backgroundColor: "yellow" },
  itemCategoryText: {
    fontSize: 20,
  },
});

{
  /* <Modal transparent={true} visible={false}>
          <View>
            <TouchableOpacity onPress={this.showDialog}>
              <Text>Show Dialog</Text>
            </TouchableOpacity>
            <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Title>Account delete</Dialog.Title>
              <Dialog.Description>
                Enter Quantity and Expirary Date.
              </Dialog.Description>
              <Dialog.Button label="Cancel" onPress={this.handleCancel} />
              <Dialog.Button label="Delete" onPress={this.handleDelete} />
            </Dialog.Container>
          </View>
        </Modal> */
}
