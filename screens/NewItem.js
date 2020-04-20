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

class NewItem extends React.Component {
  state = {
    itemName: "",
    itemQuantity: "",
    itemCategory: "meat",
    itemStorage: "fridge",
    itemExpiraryDate: "2020-05-15",
  };

  render() {
    return (
      <View style={styles.container}>
        <View styles={styles.formContainer}>
          {/* Item Name Input */}
          <TextInput
            style={styles.itemNameInput}
            placeholder="Enter Item Name "
            keyboardType="ascii-capable"
            maxLength={30}
            onChangeText={(itemNameValue) =>
              this.setState({ itemName: itemNameValue })
            }
          ></TextInput>

          {/* Item Quantity Input */}
          <TextInput
            style={styles.itemQuantityInput}
            placeholder="Enter Item Quantity"
            keyboardType="number-pad"
            maxLength={30}
            onChangeText={(itemQuantityValue) =>
              this.setState({ itemQuantity: itemQuantityValue })
            }
          ></TextInput>

          {/* Item Category Input */}
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
          <Picker
            style={styles.itemStorageLocation}
            selectedValue={this.state.itemStorage}
            onValueChange={(itemStorageLocationValue, itemIndex) =>
              this.setState({ itemStorage: itemStorageLocationValue })
            }
          >
            <Picker.Item label="Fridge" value="fridge" />
            <Picker.Item label="Freezer" value="freezer" />
            <Picker.Item label="Pantry" value="pantry" />
          </Picker>

          <DatePicker
            style={styles.datePickerInput}
            date={"2020-05-15"}
            mode="date"
            placeholder="Expirary Date"
            format="YYYY-MM-DD"
            onDateChange={(itemExpiraryDateValue) =>
              this.setState({ itemExpiraryDate: itemExpiraryDateValue })
            }
          ></DatePicker>
        </View>

        <Button
          title="Click me"
          onPress={() =>
            console.log(
              this.state.itemName +
                " | " +
                this.state.itemQuantity +
                " | " +
                this.state.itemCategory +
                " | " +
                this.state.itemStorage +
                " | " +
                this.state.itemExpiraryDate
            )
          }
        ></Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  formContainer: {},

  itemCategoryPicker: {},

  itemStorageLocation: {},

  itemNameInput: {
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: 1,
    height: 50,
    fontSize: 20,
  },
});

export default NewItem;
