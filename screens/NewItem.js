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

  // DUMMY TEST DATA.
  let categoryTestData = [
    { value: "Fruit" },
    { value: "Meat" },
    { value: "Vegetable" },
  ];

  let storageLocationTestData = [
    { value: "Fridge" },
    { value: "Freezer" },
    { value: "Pantry" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* NAME INPUT */}
        <TextInput
          style={styles.itemNameInput}
          placeholder="Item Name "
          maxLength={30}
          onChangeText={(itemText) => setItemText(itemText)}
          defaultValue={itemText}
        ></TextInput>

        {/* QUANTITY INPUT */}
        <TextInput
          style={styles.quantityInput}
          placeholder="Enter amount"
          maxLength={3}
          keyboardType={"number-pad"}
          onChangeText={(quantityText) => setQuantityText(quantityText)}
          defaultValue={quantityText}
        ></TextInput>

        {/* CATEGORY INPUT */}
        <Dropdown
          style={styles.categoryInput}
          placeholder="Category"
          labelFontSize={20}
          data={categoryTestData}
          onFocus={true}
        />

        {/* STORAGE LOCATION */}
        <Dropdown
          style={styles.storageLocationInput}
          placeholder="Storage Location"
          labelFontSize={20}
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
      customAlert("Item " + itemName + " successfully added!");
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
  datePickerInput: {
    width: 200,
    padding: 20,
  },
  quantityInput: {
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
