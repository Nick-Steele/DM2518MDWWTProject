import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import DatePicker from "react-native-datepicker";

let today = new Date();

const alert = () => {
  console.log("heheh");
};
const NewItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.itemNameInput}
          placeholder="Item Name "
          maxLength={30}
        ></TextInput>

        <TextInput
          style={styles.amountInput}
          placeholder="Enter amount"
          maxLength={30}
          keyboardType={"number-pad"}
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
          style={styles.addButton}
          onPress={alert}
        ></Button>
      </View>
    </View>
  );
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
  },
  formContainer: {
    backgroundColor: "#CCCCCC",
    padding: 50,
    margin: 50,
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
  categoryInput: {},
});

export default NewItem;
