import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import DatePicker from "react-native-datepicker";
import Item from "../Helpers/Item";

let today = new Date();

const NewItem = () => {
  const [itemText, setItemText] = useState("");
  const [quantityText, setQuantityText] = useState("");
  const [categoryInputText, setCategoryInputText] = useState("");
  const [dateInputText, setDateInputText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.itemNameInput}
          placeholder="Item Name "
          maxLength={5}
          onChangeText={(itemText) => setItemText(itemText)}
          defaultValue={itemText}
        ></TextInput>

        <TextInput
          style={styles.amountInput}
          placeholder="Enter amount"
          maxLength={3}
          keyboardType={"number-pad"}
          onChangeText={(quantityText) => setQuantityText(quantityText)}
          defaultValue={quantityText}
        ></TextInput>

        <Dropdown
          style={styles.categoryInput}
          label="Category"
          data={categoryTestData}
        />

        <Dropdown
          style={styles.storageLocationInput}
          label="Storage Location"
          data={storageLocationTestData}
        />

        <DatePicker
          style={styles.datePickerInput}
          date={today}
          mode="date"
          placeholder="Expirary Date"
          format="YYYY-MM-DD"
        />
      </View>

      <View style={styles.buttonView}>
        <Button
          title="Add Item"
          onPress={() => {
            validateItem(itemText, quantityText);
          }}
        ></Button>
      </View>
    </View>
  );

  function parseData(name, quantity) {
    const item = new Item(name, quantity);
    item.addItemToItems(item);
  }

  function validateItem(itemName, itemQuantity) {
    if (itemName != "" && itemQuantity != "") {
      parseData(itemName, itemQuantity);
      customAlert("Item successfully added!");
      clearFields();
    } else {
      customAlert("Something went wrong try again!");
    }
  }

  function clearFields() {
    setItemText("");
    setQuantityText("");
  }

  function customAlert(string) {
    Alert.alert(string);
  }
};

// DUMMY TEST DATA.
let categoryTestData = [
  {
    value: "Fruit",
  },
  {
    value: "Meat",
  },
  {
    value: "Vegetable",
  },
];

let storageLocationTestData = [
  {
    value: "Fridge",
  },
  {
    value: "Freezer",
  },
  {
    value: "Pantry",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  formContainer: {
    backgroundColor: "white",
    margin: 40,
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
  buttonView: {
    backgroundColor: "white",
  },
  itemNameInput: {
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: 1,
    height: 50,
    fontSize: 20,
  },
  amountInput: {
    width: 20,
  },
  datePickerInput: {
    width: 200,
    padding: 20,
  },
  amountInput: {
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: 1,
    height: 50,
    fontSize: 20,
  },
  Button: {
    height: 40,
  },
});

export default NewItem;
