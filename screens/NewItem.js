import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Picker,
} from "react-native";
import DatePicker from "react-native-datepicker";
import Item from "../Helpers/Item";

class NewItem extends React.Component {
  state = {
    itemName: "",
    itemQuantity: "",
    itemCategory: "Select Item Category",
    itemStorage: "fridge",
    day: "",
    month: "",
    year: "",
    //itemExpiraryDate: "2020-05-15",
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formWrapper}>
          {/* Item Name Input */}
          <TextInput
            style={styles.itemNameInput}
            placeholder="Enter Item Name "
            /*keyboardType="ascii-capable"*/
            maxLength={30}
            onChangeText={(itemNameValue) =>
              this.setState({ itemName: itemNameValue })
            }
          ></TextInput>

          {/* Item Quantity Input */}
          <TextInput
            style={styles.itemQuantityInput}
            ref={this.state.quantity}
            placeholder="Enter Item Quantity"
            /*keyboardType="number-pad"*/
            maxLength={30}
            onChangeText={(itemQuantityValue) =>
              this.setState({ itemQuantity: itemQuantityValue })
            }
          ></TextInput>

          {/* Item Category Input */}
          <Text style={styles.selectItemCategoryText}>
            Select Item Category
          </Text>
          <Picker
            style={styles.itemCategoryPicker}
            selectedValue={this.state.itemCategory}
            onValueChange={(itemCategoryValue, itemIndex) =>
              this.setState({ itemCategory: itemCategoryValue })
            }
          >
            <Picker.Item label="Meat" value="meat" />
            <Picker.Item label="Fruit" value="fruit" />
            <Picker.Item label="Vegetable" value="vegetable" />
          </Picker>

          {/* Items Storage Location */}
          <Text style={styles.selectStorageLocationText}>
            Select Item Storage Location
          </Text>
          <Picker
            style={styles.itemStorageLocationPicker}
            selectedValue={this.state.itemStorage}
            onValueChange={(itemStorageLocationValue, itemIndex) =>
              this.setState({ itemStorage: itemStorageLocationValue })
            }
          >
            <Picker.Item label="Fridge" value="fridge" />
            <Picker.Item label="Freezer" value="freezer" />
            <Picker.Item label="Pantry" value="pantry" />
          </Picker>

          <Text style={styles.expiraryDateText}>Enter Expirary date</Text>
          <View style={styles.nestedDateInputContainer}>
            <TextInput
              placeholder="dd"
              style={styles.dayInput}
              onChangeText={(dayValue) => this.setState({ day: dayValue })}
            />

            <TextInput
              placeholder="mm"
              style={styles.monthInput}
              onChangeText={(monthValue) =>
                this.setState({ month: monthValue })
              }
            ></TextInput>
            <TextInput
              placeholder="yyyy"
              style={styles.yearInput}
              onChangeText={(yearValue) => this.setState({ year: yearValue })}
            ></TextInput>
          </View>

          {/* Item Date Picker */}
          {/* <DatePicker
            style={styles.datePickerInput}
            date={"2020-05-15"}
            mode="date"
            placeholder="Expirary Date"
            format="YYYY-MM-DD"
            onDateChange={(itemExpiraryDateValue) =>
              this.setState({ itemExpiraryDate: itemExpiraryDateValue })
            }
          ></DatePicker> */}
        </View>

        <Button
          title="Add Item"
          onPress={() =>
            // console.log(
            //   this.state.itemName +
            //     this.state.itemQuantity +
            //     this.state.itemCategory +
            //     this.state.itemStorage +
            //     this.state.day +
            //     this.state.month +
            //     this.state.year
            // )
            validateForm(
              this.state.itemName,
              this.state.itemQuantity,
              this.state.itemCategory,
              this.state.itemStorage,
              this.state.day,
              this.state.month,
              this.state.year
            )
          }
        ></Button>
      </View>
    );
  }
}
// Function creates the Item object itself and adds it to the item class where it is managed.
function parseData(name, quantity, category, storage, day, month, year) {
  const itemObject = new Item(
    name,
    quantity,
    category,
    storage,
    day,
    month,
    year
  ); // Create new item object based on form details.
  itemObject.addItemToItems(itemObject);
  customAlert("Added item" + " " + name + " successfully");
}

// Function checks if form elements are not empty,
// parses the data to Item class and clears the form for re-use.
function validateForm(name, quantity, category, storage, day, month, year) {
  if (
    name != "" &&
    quantity != "" &&
    category != "" &&
    storage != "" &&
    day != "" &&
    month != "" &&
    year != ""
  ) {
    parseData(name, quantity, category, storage, day, month, year);
    clearFields();
  } else {
    customAlert("Something went wrong, try again!");
  }
}

function clearFields() {
  // (this.state.itemName = ""),
  // this.state.itemQuantity = "";
  //  (this.state.itemCategory = "Select Item Category");
}

function customAlert(string) {
  alert(string);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  formWrapper: {
    backgroundColor: "white",
    marginBottom: 30,
    padding: 50,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 5,
  },
  nestedDateInputContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  dayInput: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  monthInput: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  yearInput: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  itemNameInput: {
    height: 50,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  itemQuantityInput: {
    height: 50,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  selectItemCategoryText: {
    marginTop: 20,
    height: 50,
    fontSize: 20,
  },
  itemCategoryPicker: {},
  selectStorageLocationText: {
    marginTop: 20,
    height: 50,
    fontSize: 20,
  },
  itemStorageLocationPicker: {},
  datePickerInput: {
    marginTop: 10,
  },
  expiraryDateText: {
    marginTop: 30,
    height: 50,
    fontSize: 20,
  },
});

export default NewItem;
