import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
  FlatList,
  Modal,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { SearchBar } from "react-native-elements";
import DatePicker from 'react-native-datepicker'
import { getItemsFoodCollection } from "../Helpers/ItemHelper";
import { TextInput } from "react-native-gesture-handler";
import renderIf from "../Helpers/renderIf";
import * as Item from "../Helpers/ItemHelper";

import * as NewItem from "./NewItem";
import RadioForm from "react-native-simple-radio-button";

const getTodaysDate = () => {
  return new Date().toISOString().slice(0,10).replace(/-/g,"");
}

export default class App extends React.Component {
  constructor({ navigation }) {
    super();
    this.state = {
      search: "",
      modalVisible: false,
      dataFromDB: [],
      listData: [],
      itemName: "",
      itemCategory: "",
      storageInput: "",
      quantityInput: "",
      dayInput: "",
      monthInput: "",
      yearInput: "",

      // TEST DATA : What is currently working and showing in the UI.
    };
    this.navigation = navigation;
    this.nav(); //Display the top nar bar content.

    // Pull in Data from database.
    getItemsFoodCollection().then((value) => {
      this.setState({ dataFromDB: value, listData: value }); // Assign the state to access dataFromDB from value.

      for (var i = 0; i < value.length; i++) {
        // Segregating the name and the category. Checking that it is working.
        // console.log(value[i].name);
        // console.log(value[i].category);
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



  render() {
    const { search } = this.state; // Search result from search bar goes here.
    
    const updateSearch = (search) => {
      this.setState({ search });
      if (search.length > 2){
        let listData = []
        this.state.dataFromDB.forEach(item => {
          if (item.name.match(search)){
            listData.push(item);
          }
        }); 
        console.log(listData);
        this.setState({listData: listData});
      } else {
        this.setState({listData: this.state.dataFromDB});
      }
    };

    var itemStorageProperties = [
      { label: "Fridge", value: "fridge" },
      { label: "Freezer", value: "freezer" },
      { label: "Pantry", value: "pantry" },
    ];

    return (
      <KeyboardAvoidingView 
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}>
        
      <View style={styles.container}>
        <SearchBar
          lightTheme
          placeholder="Search Food Database"
          onChangeText={updateSearch}
          value={search}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* List that holds the data from Foodcollection WOKING WITH TEST DATA */}
        <FlatList
          style={styles.listContainer}
          data={this.state.listData}
          renderItem={({ item }) => (
            <View style={styles.TouchableOpacityView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.setState({ modalVisible: true });
                  this.setState({ itemName: item.name });
                  this.setState({ itemCategory: item.category });
                }}
              >
                <Text style={styles.itemTitleText}>{item.name}</Text>
                <Text style={styles.itemCategoryText}>{item.category}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        </TouchableWithoutFeedback>
        {renderIf(this.state.modalVisible)(
          <View style={styles.modalContainer}>
        <View style={styles.modalCenterView}>
              {/*POP UP MODAL CONTENT : Currently works on phone, but looks like rubbish on the computer web browser. */}
              <Modal animationType="slide" transparent={true}>
                <View style={styles.modalCenterView}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalContentTitleText}>
                    Enter the following
                  </Text>
                  {/* Item Quantity Input */}
                  <TextInput
                    style={styles.enterQuantityText}
                    ref={this.state.quantityInput}
                    placeholder="Item Quantity"
                    keyboardType="number-pad"
                    maxLength={30}
                    onChangeText={(quantityValue) => {
                      this.setState({ quantityInput: quantityValue });
                    }}
                  ></TextInput>

                  {/* Items Storage Location */}
                  <Text style={styles.selectStorageLocationText}>
                    Storage Location:
                  </Text>
                  <RadioForm
                    radio_props={itemStorageProperties}
                    formHorizontal={true}
                    labelHorizontal={false}
                    onPress={(storageValue) => {
                      this.setState({ storageInput: storageValue });
                    }}
                    radioStyle={{paddingRight: 20, paddingTop: 20}}
                  />

                  <Text style={styles.enterDateText}>Enter Date:</Text>
                  
                    {Platform.OS == 'web' ? (
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
                    ></TextInput></View>
                    ) : (
                      <DatePicker
                      style={{width: 200}}
                      date={this.state.date}
                      mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      minDate={getTodaysDate()}
                      maxDate="2100-06-01"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                        },
                        dateInput: {
                          marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({yearInput: date.substring(0,4), monthInput: date.substring(5, 7), dayInput: date.substring(8, 10)})
                      }}
                    />
                    )}
                    
                  

                  <View style={styles.buttonContainer}>
                    <Button
                      title="Exit"
                      onPress={() => this.setState({ modalVisible: false })}
                    ></Button>

                    {/*Checking the data is correct, implement addItem function once working */}
                    <Button
                      title="Add"
                      onPress={() => {
                        NewItem.validateForm(
                          this.state.itemName,
                          this.state.quantityInput,
                          this.state.itemCategory,
                          this.state.storageInput,
                          this.state.dayInput,
                          this.state.monthInput,
                          this.state.yearInput
                        ).then(success => {
                          if(success) {
                            this.setState({ modalVisible: false });
                            this.navigation.goBack();
                          }else{
                            this.setState({ modalVisible: false });
                          }
                        });
                      }}
                    ></Button>
                  </View>
                </View>
                </View>
              </Modal>
            </View>
            </View>
        )}
      </View>
      
      </KeyboardAvoidingView>
    );
  }
}

const styles = new StyleSheet.create({
  container: { flex: 1 },
  button: {
    flex: 1,
    maxWidth: 600,
    borderRadius: 20,
    margin: 5,
    paddingVertical: 30,
    paddingHorizontal: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  itemTitleText: {
    fontSize: 20,
  },
  modalContent: {
    marginTop: 50,
    height: Platform.OS == 'web' ? '80vh' : '80%',
    width: Platform.OS == 'web' ? '80vw' : '80%',
    justifyContent: "flex-start",
    backgroundColor: "white",
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
    marginTop: 20,
    fontSize: 20,
  },
  enterQuantityInputText: {
    height: 50,
    width: 200,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 2,
  },
  selectStorageLocationText: {
    marginTop: 20,
    fontSize: 20,
  },
  enterDateText: {
    marginTop: 20,
    fontSize: 20,
  },
  nestedDateInputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  dayInput: {
    height: 50,
    width: 50,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 2,
  },
  yearInput: {
    height: 50,
    width: 50,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 2,
  },
  monthInput: {
    height: 50,
    width: 50,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 2,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  addToStorageButton: {
    color: "green",
  },

  listContainer: {
    flex: 1,
  },
  TouchableOpacityView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  modalContainer: {
    position: "absolute",
    top: 50,
    left: '50%',
    right: '50%',
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCenterView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
