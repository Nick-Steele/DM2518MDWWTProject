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
import { TextInput } from "react-native-gesture-handler";

export default class App extends React.Component {
  constructor({ navigation }) {
    super();
    this.state = {
      search: "",
      modalVisible: false,
      dataFromDB: [],
      itemName: "",
      itemCategory: "",
      quantityInput: "",
      dayInput: "",
      monthInput: "",
      yearInput: "",

      // TEST DATA : What is currently working and showing in the UI.
      data: [
        {
          category: "Fruit",
          title: "123",
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

    // Pull in Data from database.
    getItemsFoodCollection().then((value) => {
      this.setState({ dataFromDB: value }); // Assign the state to access dataFromDB from value.

      for (var i = 0; i < value.length; i++) {
        // Segregating the name and the category. Checking that it is working.
        console.log(value[i].name);
        console.log(value[i].category);
      }
    });
  }

  // Draw this content in the top navigation bar.
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

  updateSearch = (search) => {
    this.setState({ search });
    //Automatically Query the database each time User Inputs.
    //searchItem(search);
  };

  render() {
    const { search } = this.state; // Search result from search bar goes here.

    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          placeholder="Search Food Database"
          onChangeText={this.updateSearch}
          value={search}
        />

        {/* List that holds the data from Foodcollection WOKING WITH TEST DATA */}
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <View style={styles.TouchableOpacityView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.setState({ modalVisible: true });
                  this.setState({ itemName: item.title });
                  this.setState({ itemCategory: item.category });
                }}
              >
                <Text style={styles.itemTitleText}>{item.title}</Text>
                <Text style={styles.itemCategoryText}>{item.category}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        {/*POP UP MODAL CONTENT : Currently works on phone, but looks like rubbish on the computer web browser. */}
        <Modal
          visible={this.state.modalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalContentTitleText}>
              Enter the following
            </Text>
            <Text style={styles.enterQuantityText}>Enter Quantity:</Text>
            <TextInput
              style={styles.enterQuantityInputText}
              placeholder="Quantity"
              onChangeText={(quantityValue) => {
                this.setState({ quantityInput: quantityValue });
              }}
            />

            <Text style={styles.enterDateText}>Enter Date:</Text>
            <View style={styles.nestedDateInputContainer}>
              <TextInput
                placeholder="dd"
                style={styles.dayInput}
                onChangeText={(dayValue) =>
                  this.setState({ dayInput: dayValue })
                }
              />

              <TextInput
                placeholder="mm"
                style={styles.monthInput}
                onChangeText={(monthValue) =>
                  this.setState({ monthInput: monthValue })
                }
              ></TextInput>
              <TextInput
                placeholder="yyyy"
                style={styles.yearInput}
                onChangeText={(yearValue) =>
                  this.setState({ yearInput: yearValue })
                }
              ></TextInput>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Exit"
                onPress={() => this.setState({ modalVisible: false })}
              ></Button>

              {/*Checking the data is correct, implement addItem function once working */}
              <Button
                title="Add"
                onPress={() => {
                  console.log(
                    this.state.itemName +
                      " | " +
                      this.state.itemCategory +
                      " | " +
                      this.state.quantityInput +
                      " | " +
                      this.state.dayInput +
                      " | " +
                      this.state.monthInput +
                      " | " +
                      this.state.yearInput +
                      buildDate(
                        this.state.dayInput +
                          this.state.monthInput +
                          this.state.yearInput
                      )
                  );
                }}
              ></Button>

              {/* <Button
                title="Add to storage"
                style={styles.addToStorageButton}
                onPress={() => {
                  var item = searchItem(search);
                  item.then(function (v) {
                    if (v !== null || v !== undefined) {
                      var item = v;
                      console.log("Add Item: " + v.name + v.category);
                      //addItem(v);
                    } else {
                      console.log(
                        "This item does not exist, try making your own"
                      );
                    }
                  });
                }}
              ></Button> */}
            </View>
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
  modalContent: {
    height: "50%",
    justifyContent: "flex-start",
    backgroundColor: "white",
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemCategoryText: {
    fontSize: 20,
  },
  modalContentTitleText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  enterQuantityText: {
    marginTop: 10,
    fontSize: 20,
  },
  enterQuantityInputText: {
    height: 50,
    width: 200,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 2,
  },
  enterDateText: {
    marginTop: 10,
    fontSize: 20,
  },
  nestedDateInputContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  dayInput: {
    height: 50,
    width: 50,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 2,
  },
  yearInput: {
    height: 50,
    width: 50,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 2,
  },
  monthInput: {
    height: 50,
    width: 50,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 2,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  addToStorageButton: {
    color: "green",
  },
});
